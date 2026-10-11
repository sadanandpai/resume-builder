import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import { resume, seed } from './fixture.mjs';

const base = process.env.BROWSER_BASE_URL || 'http://localhost:3001';
const artifacts = process.env.BROWSER_ARTIFACTS || '/tmp/resume-builder-browser';
const results = [];
const errors = [];
const server = process.env.BROWSER_BASE_URL
  ? null
  : spawn('npm', ['run', 'start', '--', '--port', '3001'], { stdio: 'pipe', detached: true });
let browser;
async function check(name, run) {
  if (process.env.BROWSER_CHECK_FILTER && !name.includes(process.env.BROWSER_CHECK_FILTER)) return;
  await run();
  results.push(name);
  console.log('Passed:', name);
}
async function pageWithSeed(width = 1440, extra = {}) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    locale: 'en-US',
    timezoneId: 'Asia/Kolkata',
  });
  await context.addInitScript(
    (entries) => {
      // Seed once per new context, leaving reload/navigation free to restore edits.
      if (!sessionStorage.getItem('browserFixture')) {
        for (const [key, value] of Object.entries(entries))
          localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
        sessionStorage.setItem('browserFixture', '1');
      }
    },
    { ...seed, ...extra }
  );
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (
      message.type() === 'error' &&
      /hydration|serialized|server component|router.*mounted/i.test(message.text())
    )
      errors.push(message.text());
  });
  return { page, context };
}
async function settled(page) {
  await page.locator('.resume-page-content').getByText('Morgan Example').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000); // Resume zoom transition and home animation duration.
}
try {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
      : {}),
  });
  await mkdir(artifacts, { recursive: true });
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      if ((await fetch(base)).ok) break;
    } catch {
      /* Server starting. */
    }
    if (attempt === 99) throw new Error('Production server did not start');
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await check('HTTP routes, 404, permanent redirect and forwarded query', async () => {
    for (const [path, status, location] of [
      ['/', 200],
      ['/builder', 200],
      ['/missing-route', 404],
      ['/editor', 308, '/builder'],
      [
        '/editor?importUrl=https%3A%2F%2Fexample.com',
        308,
        '/builder?importUrl=https%3A%2F%2Fexample.com',
      ],
    ]) {
      const response = await fetch(base + path, { redirect: 'manual' });
      assert.equal(response.status, status);
      if (location) assert.equal(response.headers.get('location'), location);
    }
  });
  await check(
    'metadata, client navigation, history, reload and retained in-memory state',
    async () => {
      const { page, context } = await pageWithSeed();
      await page.goto(base + '/builder');
      await settled(page);
      const head = await page.evaluate(() => ({
        title: document.title,
        viewport: [...document.querySelectorAll('meta[name=viewport]')].map((el) => el.content),
        description: document.querySelector('meta[name=description]').content,
        icon: document.querySelector('link[rel=icon]').getAttribute('href'),
        html: [
          document.documentElement.lang,
          document.documentElement.className,
          document.documentElement.dataset.scrollBehavior,
        ],
        fonts: document.querySelectorAll('link[rel=stylesheet][href*="fonts.googleapis.com"]')
          .length,
      }));
      assert.equal(head.title, 'E-Resume: Builder');
      assert.deepEqual(head.viewport, ['width=device-width, initial-scale=1, viewport-fit=cover']);
      assert.equal(head.description, 'Single Page Resume Builder');
      assert.equal(head.icon, '/icons/resume-icon.png');
      assert.deepEqual(head.html, ['en', 'scroll-smooth', 'smooth']);
      assert.equal(head.fonts, 2);
      await page.evaluate(() => {
        window.browserNavigationMarker = 'same-document';
      });
      await page.locator('nav a[href="/"]').click();
      await page.waitForURL(base + '/');
      await page.waitForFunction(() => document.title === 'E-Resume: Home');
      await page.locator('a[href="/builder"]').first().click();
      await page.waitForURL(base + '/builder');
      await settled(page);
      assert.equal(await page.evaluate(() => window.browserNavigationMarker), 'same-document');
      // If hydration reruns on re-entry, this unrelated storage change would replace live data.
      await page.evaluate(() => {
        const basic = JSON.parse(localStorage.getItem('basic'));
        basic.state.values.name = 'Stored change';
        localStorage.setItem('basic', JSON.stringify(basic));
      });
      await page.locator('nav a[href="/"]').click();
      await page.waitForURL(base + '/');
      await page.goBack();
      await settled(page);
      assert.equal(
        await page.locator('.resume-page-content').getByText('Morgan Example').count(),
        1
      );
      await page.reload();
      await page.locator('.resume-page-content').getByText('Stored change').waitFor();
      await context.close();
    }
  );
  await check(
    'URL import after restore, query cleanup, repeated parameters, hash and history',
    async () => {
      const { page, context } = await pageWithSeed();
      let requests = 0;
      await page.route('https://example.com/resume.json', async (route) => {
        requests++;
        await route.fulfill({
          json: { ...resume, basics: { ...resume.basics, name: 'Imported Example' } },
          headers: { 'access-control-allow-origin': '*' },
        });
      });
      await page.goto(
        base +
          '/builder?tag=a&importUrl=https%3A%2F%2Fexample.com%2Fresume.json&tag=b&importUrl=https%3A%2F%2Fexample.com%2Fignored#preview'
      );
      await page.locator('.resume-page-content').getByText('Imported Example').waitFor();
      await page.waitForURL(base + '/builder?tag=a&tag=b#preview');
      assert.equal(requests, 1);
      await page.reload();
      await page.locator('.resume-page-content').getByText('Imported Example').waitFor();
      await context.close();
    }
  );
  await check(
    'file import cancels pending URL import, same-file reimport and export roundtrip',
    async () => {
      const { page, context } = await pageWithSeed();
      let finish;
      const pending = new Promise((resolve) => {
        finish = resolve;
      });
      await page.route('https://example.com/slow.json', async (route) => {
        await pending;
        await route.fulfill({ json: { basics: { name: 'Stale URL' } } }).catch(() => {});
      });
      await page.goto(base + '/builder?importUrl=https%3A%2F%2Fexample.com%2Fslow.json');
      await settled(page);
      const file = {
        name: 'resume.json',
        mimeType: 'application/json',
        buffer: Buffer.from(
          JSON.stringify({ ...resume, basics: { ...resume.basics, name: 'File Example' } })
        ),
      };
      await page.locator('input[type=file]').first().setInputFiles(file);
      await page.locator('.resume-page-content').getByText('File Example').waitFor();
      finish();
      await page.waitForTimeout(200);
      assert.equal(await page.locator('.resume-page-content').getByText('Stale URL').count(), 0);
      await page.locator('input[type=file]').first().setInputFiles(file);
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Export', exact: true }).click();
      const download = await downloadPromise;
      const stream = await download.createReadStream();
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      const exported = JSON.parse(Buffer.concat(chunks).toString());
      assert.equal(exported.basics.name, 'File Example');
      assert.deepEqual(exported.skills, resume.skills);
      await context.close();
    }
  );
  await check('all responsive breakpoints, mobile tabs and template persistence', async () => {
    for (const width of [390, 768, 1023, 1024, 1440]) {
      const { page, context } = await pageWithSeed(width);
      await page.goto(base);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `${artifacts}/home-${width}.png`,
        fullPage: true,
        animations: 'disabled',
      });
      await page.goto(base + '/builder');
      await settled(page);
      await page.screenshot({
        path: `${artifacts}/builder-${width}.png`,
        fullPage: true,
        animations: 'disabled',
      });
      if (width < 1024) {
        await page.getByRole('tab', { name: 'Edit', exact: true }).click();
        assert.equal(
          await page.getByRole('tab', { name: 'Edit', exact: true }).getAttribute('aria-selected'),
          'true'
        );
        await page.getByRole('tab', { name: 'Preview', exact: true }).click();
      }
      await context.close();
    }
    for (const id of ['modern', 'classic', 'spotlight', 'professional']) {
      const { page, context } = await pageWithSeed(1440, { selectedTemplateId: id });
      await page.goto(base + '/builder');
      await settled(page);
      assert.equal(await page.evaluate(() => localStorage.getItem('selectedTemplateId')), id);
      await page.screenshot({
        path: `${artifacts}/template-${id}.png`,
        fullPage: true,
        animations: 'disabled',
      });
      await page.pdf({
        path: `${artifacts}/template-${id}.pdf`,
        format: 'A4',
        preferCSSPageSize: true,
        printBackground: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
      });
      assert.equal(await page.title(), 'Single Page Resume Builder');
      await context.close();
    }
  });
  await check(
    'editing, richtext lifecycle, titles, theme/style history, template picker and reorder',
    async () => {
      const { page, context } = await pageWithSeed(1440, {
        basic: {
          state: { values: { ...resume.basics, objective: 'Deliver reliable systems.' } },
          version: 0,
        },
        activities: {
          state: {
            activities: {
              involvements: '<p>Example project.</p>',
              achievements: '<p>Example certificate.</p>',
            },
          },
          version: 0,
        },
      });
      await page.goto(base + '/builder');
      await settled(page);
      await page.locator('aside').getByText('Basic details', { exact: true }).click();
      await page.getByLabel('Name', { exact: true }).fill('Edited Example');
      await page.locator('.resume-page-content').getByText('Edited Example').waitFor();
      await page.getByRole('tab', { name: 'About', exact: true }).click();
      await page.locator('.jodit-wysiwyg').first().click();
      await page.keyboard.press('ControlOrMeta+A');
      await page.keyboard.type('Edited rich text', { delay: 20 });
      await page.waitForFunction(() =>
        JSON.parse(localStorage.getItem('basic')).state.values.summary.includes('Edited rich text')
      );
      await page.getByRole('tab', { name: 'Contacts', exact: true }).click();
      assert.ok(
        await page.evaluate(() =>
          JSON.parse(localStorage.getItem('basic')).state.values.summary.includes(
            'Edited rich text'
          )
        )
      );
      await page.getByRole('button', { name: /^Titles/ }).click();
      await page.getByLabel('Summary', { exact: true }).fill('Profile overview');
      await page.keyboard.press('Escape');
      await page
        .locator('.resume-page-content')
        .getByText('Profile overview', { exact: true })
        .waitFor();
      await page.getByRole('button', { name: /^Colours/ }).click();
      await page.getByRole('button', { name: 'Custom colours', exact: true }).click();
      await page.getByLabel('Headings colour').fill('#123456');
      await page.keyboard.press('Escape');
      assert.equal(
        await page.evaluate(
          () => JSON.parse(localStorage.getItem('themes')).state.selectedTheme.titleColor
        ),
        '#123456'
      );
      await page.getByRole('button', { name: /^Layout/ }).click();
      await page.getByLabel('Body size value', { exact: true }).fill('12');
      await page.getByLabel('Body size value', { exact: true }).press('Tab');
      assert.equal(
        await page.evaluate(
          () => JSON.parse(localStorage.getItem('resumeStyles')).settings.typography.body
        ),
        12
      );
      await page.getByRole('button', { name: 'Undo', exact: true }).click();
      await page.getByRole('button', { name: 'Redo', exact: true }).click();
      await page.getByRole('button', { name: 'Reset styling', exact: true }).click();
      assert.deepEqual(
        await page.evaluate(() => JSON.parse(localStorage.getItem('resumeStyles')).settings),
        {}
      );
      await page.keyboard.press('Escape');
      await page.getByRole('button', { name: /^Templates \(4\)/ }).click();
      await page.locator('.splide').waitFor();
      await page.locator('.splide').getByAltText('Classic', { exact: true }).click();
      await page.keyboard.press('Escape');
      assert.equal(
        await page.evaluate(() => localStorage.getItem('selectedTemplateId')),
        'classic'
      );
      await page.getByRole('button', { name: 'Enable section reorder', exact: true }).click();
      const handles = page.getByRole('button', { name: /^Drag to reorder/ });
      await handles.first().focus();
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await page.getByRole('button', { name: 'Reset section layout', exact: true }).click();
      await page.locator('nav a[href="/"]').click();
      await page.waitForURL(base + '/');
      assert.equal(await page.locator('.jodit-wysiwyg').count(), 0);
      await page.locator('a[href="/builder"]').first().click();
      await page.waitForURL(base + '/builder');
      await page.locator('.resume-page-content').getByText('Edited Example').waitFor();
      assert.equal(
        await page.evaluate(() => localStorage.getItem('selectedTemplateId')),
        'classic'
      );
      await context.close();
    }
  );
  await check('malformed and blocked storage retain an editable shell', async () => {
    for (const mode of ['malformed', 'blocked']) {
      const { page, context } = await pageWithSeed(1440, {
        basic: '{broken',
        selectedTemplateId: '__proto__',
      });
      if (mode === 'blocked')
        await context.addInitScript(() => {
          Storage.prototype.getItem = () => {
            throw new Error('blocked');
          };
          Storage.prototype.setItem = () => {
            throw new Error('blocked');
          };
        });
      await page.goto(base + '/builder');
      await page.locator('.resume-page-content h1').waitFor();
      await page
        .locator('input[type=file]')
        .first()
        .setInputFiles({
          name: 'resume.json',
          mimeType: 'application/json',
          buffer: Buffer.from(JSON.stringify(resume)),
        });
      await page.locator('.resume-page-content').getByText('Morgan Example').waitFor();
      await context.close();
    }
  });
  assert.deepEqual(errors, [], 'Browser runtime/hydration errors');
  await writeFile(
    `${artifacts}/results.json`,
    JSON.stringify({ browser: browser.version(), results, errors }, null, 2)
  );
} finally {
  await browser?.close();
  if (server?.pid) {
    try {
      process.kill(-server.pid, 'SIGTERM');
    } catch {
      /* Already stopped. */
    }
  }
}
