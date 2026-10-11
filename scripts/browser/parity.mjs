import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { resume, seed } from './fixture.mjs';

// Run against each production router with identical browser/fixtures. Compare
// the retained images/PDFs, rather than treating a passing capture as parity.
const base = process.env.BROWSER_BASE_URL || 'http://localhost:3001';
const artifacts = process.env.BROWSER_ARTIFACTS || '/tmp/resume-builder-parity';
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH
    ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
    : {}),
});
const populated = {
  ...seed,
  basic: {
    state: {
      values: {
        ...resume.basics,
        summary: '<p>Builds <strong>accessible</strong> products with Java and React.</p>',
        objective: '<p>Deliver reliable systems.</p>',
        profiles: [{ network: 'GitHub', username: 'example', url: 'https://example.com' }],
      },
    },
    version: 0,
  },
  experience: {
    state: {
      experiences: [
        {
          id: 'work-1',
          name: 'Example Systems',
          position: 'Engineer',
          url: '',
          startDate: '2021-01-01',
          endDate: null,
          isWorkingHere: true,
          years: '4',
          summary:
            '<ul><li>Built APIs and accessible interfaces.</li><li>Improved testing and delivery.</li></ul>',
          highlights: [],
        },
      ],
    },
    version: 0,
  },
  education: {
    state: {
      academics: [
        {
          id: 'edu-1',
          institution: 'Example University',
          url: '',
          studyType: 'Bachelor',
          area: 'Computer Science',
          startDate: '2017-01-01',
          endDate: '2021-01-01',
          score: '8.5',
          courses: [],
          isStudyingHere: false,
        },
      ],
    },
    version: 0,
  },
  volunteering: {
    state: {
      volunteeredExps: [
        {
          id: 'vol-1',
          organization: 'Example Community',
          position: 'Mentor',
          url: '',
          startDate: '2021-01-01',
          endDate: null,
          summary: '<p>Mentored new developers.</p>',
          highlights: [],
          isVolunteeringNow: true,
        },
      ],
    },
    version: 0,
  },
  awards: {
    state: {
      awards: [
        {
          id: 'award-1',
          title: 'Engineering Award',
          awarder: 'Example',
          date: '2023-01-01',
          summary: '<p>Recognized for quality.</p>',
        },
      ],
    },
    version: 0,
  },
  activities: {
    state: {
      activities: {
        involvements: '<ul><li>Built community tools.</li></ul>',
        achievements: '<p>Completed Java certification.</p>',
      },
    },
    version: 0,
  },
  ...Object.fromEntries(
    Object.keys(resume.skills).map((key) => [
      key,
      {
        state: { values: [{ name: `Example ${key}`, level: 75 }], isEnabled: key !== 'tools' },
        version: 0,
      },
    ])
  ),
};
const settings = {
  version: 1,
  settings: {
    typography: { body: 11, name: 26, heading: 14, family: 'serif' },
    density: 'compact',
    pageMargins: { top: 3, right: 4, bottom: 3, left: 4 },
    secondaryColumnPercent: 35,
    spacing: { section: 12, column: 10 },
  },
};
const results = { browser: browser.version(), captures: [], errors: [] };
try {
  await mkdir(artifacts, { recursive: true });
  for (const id of ['modern', 'classic', 'spotlight', 'professional']) {
    for (const variant of ['populated', 'custom', 'long', 'empty']) {
      const entries = structuredClone(variant === 'empty' ? seed : populated);
      if (variant === 'empty') entries.basic.state.values = { ...resume.basics, summary: '' };
      if (variant === 'long')
        entries.basic.state.values.summary =
          '<p>' + 'Long content deliberately clips inside the fixed page. '.repeat(150) + '</p>';
      if (variant === 'custom') {
        entries.resumeStyles = settings;
        entries.resumeSectionTitles = { version: 1, titles: { [id]: { work: 'Employment' } } };
        entries.resumeSectionLayouts = { state: { layouts: {}, isReorderMode: true }, version: 0 };
      }
      entries.selectedTemplateId = id;
      const width = variant === 'custom' ? 390 : 1440;
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        deviceScaleFactor: 1,
        locale: 'en-US',
        timezoneId: 'Asia/Kolkata',
      });
      await context.addInitScript((entries) => {
        for (const [key, value] of Object.entries(entries))
          localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      }, entries);
      const page = await context.newPage();
      page.on('pageerror', (e) => results.errors.push(e.message));
      await page.goto(base + '/builder');
      await page.locator('.resume-page-content').getByText('Morgan Example').waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1000);
      const name = `${id}-${variant}`;
      await page.screenshot({
        path: `${artifacts}/${name}.png`,
        fullPage: true,
        animations: 'disabled',
      });
      const styles = await page.locator('.resume-a4-page').evaluate((el) => {
        const s = getComputedStyle(el);
        return { width: s.width, height: s.height, overflow: s.overflow, padding: s.padding };
      });
      await page.pdf({
        path: `${artifacts}/${name}.pdf`,
        format: 'A4',
        preferCSSPageSize: true,
        printBackground: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
      });
      results.captures.push({ name, width, styles, postPrintTitle: await page.title() });
      await context.close();
    }
  }
  await writeFile(`${artifacts}/results.json`, JSON.stringify(results, null, 2));
  if (results.errors.length) throw new Error(JSON.stringify(results.errors));
  console.log('Captured', results.captures.length, 'template variants');
} finally {
  await browser.close();
}
