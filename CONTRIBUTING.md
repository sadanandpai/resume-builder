# Contributing

Review the [Code of Conduct](CODE_OF_CONDUCT.md).

## Where to start

View [issues tagged with the _Good First Issues_ label](https://github.com/sadanandpai/resume-builder/labels/good%20first%20issue) to find good first feature requests and bugs to fix.

Visit https://github.com/sadanandpai/resume-builder/issues to view all issues.

---

## Development

### Running the environment locally or in Docker

Run the environment locally or in Docker by following the instructions at [Running the environment](RUN_ENVIRONMENT.MD).

---

### Quality checks

Before submitting a change, run the same core checks used by the project:

```sh
npm run lint
npm test
npm run build
```

Add or update tests when changing resume data, import/export, templates, persistence, or local analysis behavior.

---

### Creating a template

Create `src/templates/<slug>/<Name>Template.tsx` as a thin page composition. Select named designs from the shared families in `src/templates/components/`, pass typed section data, and keep data selection local to the template:

```tsx
import { StandardExperience } from '@/templates/components/experience';
import { CompactEducation } from '@/templates/components/education';

<StandardExperience items={data.work} />
<CompactEducation items={data.education} />
```

Use `ResumePresentation` once for semantic heading/frame treatment (`standard`, `underlined`, `boxed`, `editorial`, `technical`, or `stacked`). Use `TemplateRegion` from `src/templates/designs/integration/` for each sortable region with one section renderer reused by all regions. Its `surface` declares the actual destination background (`page`, `sidebar`, `tinted`, or `accentTint`); colored profile bands/cards establish their own internal surface.

Add metadata, lazy loading, section rules, and persisted default regions to `src/templates/designs/registry/templates.ts`. Predicates must match the data passed to each design. Add a thumbnail under `public/templates/` as needed. Preserve existing section IDs and use the registry constants when adding a new one.

To add a reusable design, place it in its family (`profile`, `contact`, `text`, `experience`, `education`, `skills`, `projects`, `awards`, or `volunteer`) and export it from that family's `index.ts`. Reuse collection primitives and `useSurfacePalette()`; keep spacing, headings, borders, empty handling, and width adaptation inside the design. Use existing structural data types or narrow compatible props, with no runtime store or builder context dependencies. Store subscriptions belong in integration adapters. Avoid template-local component/atom folders and universal component barrels.

Check populated and empty data, long content and narrow columns, theme/surface changes, sections moved between regions, and browser print output. Run type checking with `npx tsc --noEmit` in addition to the core checks above. See [the refactor plan and actual design inventory](RESUME_TEMPLATE_REFACTOR_PLAN.md) for the current template mappings and verification limits.

---

### Submit a change

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repo.
1. [Clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the forked repo.
   ```
   $ git clone FORKED_REPO
   ```
1. Install the dependencies
   ```
   $ npm install
   ```
1. Check out a new branch based and name it to what you intend to do:
   ```
   $ git switch -c BRANCH_NAME
   ```
1. Run the project
   ```
   $ npm run dev
   ```
1. Commit your changes

   1. [Commit](https://github.com/git-guides/git-commit) to the forked repository

      ```
      $ git commit -am 'Add some proper message'
      ```

      Please provide a git message that explains what you've done.

   1. [Push](https://github.com/git-guides/git-push) to the branch
      ```
      $ git push origin BRANCH_NAME
      ```
   1. Make a [pull request](https://github.com/git-guides/git-pull) (PR). Ensure you send the PR to the `main` branch

   Once done, our developer will review the changes and merge to `main` branch.
