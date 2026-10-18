# E-Resume MCP server

An MCP (Model Context Protocol) server that lets AI chat clients -- ChatGPT (Apps SDK) and
Claude (custom connectors) -- create, read, update, and tailor resumes conversationally. It
validates AI-supplied resume data and saves/loads it through the main app's existing
`/api/resumes` REST API, then returns a link that opens the result in the builder.

This package is independent from the main Next.js app: its own `package.json`,
`node_modules`, and deploy target, but it shares a few pure-logic modules with the main app
by importing them directly from `../src/helpers` (see "Shared code with the main app" below).
It never talks to Firestore directly and holds no Firestore/Google Cloud credentials --
every read/write goes through the main app's own API, which already enforces payload size
limits, edit-code authorization, and ID validation.

## Tools

| Tool             | Read/write | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `create_resume`  | write      | Validates and saves a brand-new resume. Returns `{ id, code, url, editUrl }`. `code` is a one-time 4-character edit code -- tell the user to save it.                                                                                                                                  |
| `get_resume`     | read       | Reads a saved resume by id. Rich text fields come back as Markdown. No edit code required (resumes are publicly readable by id, same as the main app).                                                                                                                                 |
| `update_resume`  | write      | Overwrites one or more sections of an existing resume. Requires `id` + the edit code from `create_resume`. Sections you include fully replace the current ones; sections you omit are left untouched.                                                                                  |
| `tailor_resume`  | read       | Reads a resume and returns it plus a job description and rewrite instructions. Does **not** write anything and does **not** call an LLM itself -- the calling model rewrites the content and then calls `create_resume` to save a brand-new resume. The original is never overwritten. |
| `list_templates` | read       | Lists the 4 available templates (`modern`/`classic`/`spotlight`/`professional`) and the 2 colour options (1 fixed preset + 1 customizable swatch).                                                                                                                                     |

Rich text fields (`basics.summary`, `basics.objective`, `work[].summary`, `volunteer[].summary`,
`awards[].summary`, `activities.involvements`, `activities.achievements`) accept/return
**Markdown**. `work[].highlights`, `volunteer[].highlights`, and `education[].courses` are
plain text, not Markdown -- same as the main app's editor.

## URL pattern

A saved resume opens at `${RESUME_APP_BASE_URL}/builder/<id>` (a path segment, not a query
param). Adding `?code=<code>` to that URL grants edit rights in the browser UI as well.

## Env vars

Copy `.env.example` to `.env` and set:

```dotenv
RESUME_APP_BASE_URL=https://e-resume.vercel.app
```

That's the only variable. No Firestore/Google Cloud credentials are needed -- this server
only calls the main app's existing HTTP API.

## Local development

```bash
npm install
npm test        # unit tests
npm run typecheck
```

To run the server itself locally, use the [Vercel CLI](https://vercel.com/docs/cli) (this
package has no other local dev server, since it's a single Vercel Function):

```bash
npx vercel dev
```

With the main app also running locally (`npm run dev` in the repo root) and
`RESUME_APP_BASE_URL=http://localhost:3000` in `.env`, this serves the MCP endpoint at
`http://localhost:3000/api/mcp` relative to wherever `vercel dev` binds it (check its
startup output for the exact port).

To exercise the tools interactively, point the
[MCP Inspector](https://github.com/modelcontextprotocol/inspector) at that URL:

```bash
npx @modelcontextprotocol/inspector
```

## Deploying to Vercel

This server is meant to be deployed as its **own, separate Vercel project** from the main
app (the main app has no `vercel.json` and uses Vercel's zero-config Next.js detection; this
package is a plain Vercel Function, detected the same zero-config way via its `api/`
directory).

1. Create a new Vercel project from this same Git repository.
2. Set its **Root Directory** to `mcp-server`.
3. Under that project's settings, enable **"Include source files outside of the Root
   Directory in the Build Step."** This is required: the function imports a few files from
   `../src/helpers` (see below), and without this setting Vercel's build won't see them.
4. Set the `RESUME_APP_BASE_URL` environment variable to the main app's deployed URL.
5. Deploy. The MCP endpoint is `https://<this-project>.vercel.app/api/mcp`.

## Connecting a client

**Claude (custom connector):** add the deployed `/api/mcp` URL as a custom connector. It's
authless streamable HTTP, so no OAuth setup is needed.

**ChatGPT (developer mode / Apps SDK):** add the deployed `/api/mcp` URL as an MCP server in
developer mode.

**Local testing with mcp-remote** (for stdio-only clients):

```json
{
  "e-resume": {
    "command": "npx",
    "args": ["-y", "mcp-remote", "https://<this-project>.vercel.app/api/mcp"]
  }
}
```

## Rate limiting

In-memory only: 20 writes (`create_resume`/`update_resume`) and 100 reads
(`get_resume`/`tailor_resume`/`list_templates`) per IP per hour. This is a soft,
per-instance guard -- it resets on a cold start and isn't shared across concurrent Vercel
instances. There's no Upstash/Vercel KV involved; a future iteration could add one if this
proves insufficient (not needed for v1).

## Resume expiry

AI-created resumes have no `expiresAt` field and nothing purges them -- the main app has
no TTL/cleanup mechanism for _any_ saved resume today, human- or AI-created. If a purge
mechanism is added later, the natural home for an expiry marker is
`__metadata.mcpExpiresAt`, since `__metadata` is already the place the main app stores
save-time, non-content bookkeeping it already knows how to validate and ignore gracefully.

## Firestore security rules

There is nothing to configure here. The main app has no `firestore.rules` file and needs
none: Firestore is accessed exclusively through the `@google-cloud/firestore` Admin SDK with
a service account (see `../src/helpers/firestore.ts`), which bypasses Firestore Security
Rules entirely -- those rules only govern direct client-SDK access, which the main app never
performs. This MCP server doesn't change that: it has no Firestore credentials and never
talks to Firestore directly, only to the main app's own HTTP API, which enforces its own
authorization (edit codes, payload size limits, ID format) in application code. No Firebase
anonymous auth or App Check is needed either, since no new client-side Firestore access path
is introduced.

## Shared code with the main app

Three pure-logic modules are shared with the main app via plain relative imports, re-exported
through `lib/shared/`:

- `lib/shared/resumeSchema.ts` -> `../../../src/helpers/resumeSchema.ts` (Zod validation/defaulting)
- `lib/shared/richTextMarkdown.ts` -> `../../../src/helpers/richTextMarkdown.ts` (Markdown <-> HTML)
- `lib/shared/sanitizeConfig.ts` -> `../../../src/helpers/common/components/richtext/sanitizeConfig.ts` (HTML allow-list)

This package does **not** use npm workspaces -- that would change the main app's own `npm
ci`/CI behavior for a 3-file shared surface that doesn't need it. The tradeoff: both
`package.json` files declare `zod`/`marked`/`turndown` independently (duplicate version
_declarations_, not duplicate _logic_ -- each lives in exactly one file, in the main app).

Templates (`src/templates/designs/registry/templates.ts`) are deliberately **not** imported
here, even though they're pure data at the surface -- that module's dynamic `import()`s of
the real `.tsx` template components only type-check inside the main app's full Next.js
environment (JSX, CSS modules, MUI/emotion theme augmentation). `list_templates.ts` instead
hand-mirrors the 4 template ids/names and 2 colour options, with a comment noting where to
update it if a template is ever added.

### Known type-check gap

`npm run typecheck` still reports 4 errors (`TS6142`, "--jsx is not set") against the main
app's real `.tsx` template files. These are reached transitively:
`resumeSchema.ts` -> `resumeMetadata.ts` -> `TEMPLATE_REGISTRY` -> each template's dynamic
`import()`. `TEMPLATE_REGISTRY`'s `loadComponent()` function is never called anywhere in this
package (only `.id`/`.name` are read, for validating a resume's `__metadata.template.id`), so
this is a type-check-only gap, not a runtime risk -- confirmed by the passing
`resumeSchema.test.ts` `__metadata` tests. Fixing it fully would mean installing
`next`/`@types/react` as devDependencies here and duplicating the main app's ambient
declaration files, which isn't worth it for a path this package never executes.
