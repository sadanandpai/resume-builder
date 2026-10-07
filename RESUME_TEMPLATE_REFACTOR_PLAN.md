# Resume template component collection: refactor plan and agent handoff

Date: 2026-10-07

Current status: implementation and automated verification completed; browser visual/print acceptance remains unverified. See the implementation record at the end for the actual 29-design inventory, mappings, corrections, and evidence. The original planning/handoff status below is historical.

## Status and authorization

This document records the discussion with Sadanand Pai and the proposed implementation plan. Sadanand is mainly a frontend developer with conceptual backend knowledge; communicate implementation choices in clear frontend terms.

- The user requested a plan before code changes, answered the architecture questions below, and then requested this Markdown handoff.
- No application code has been changed for this refactor. This document is the only deliverable of the handoff request.
- The next agent should use this document when the user asks to implement or continue the refactor. Saving this document alone is not an instruction to start implementation.
- The decisions below are settled; do not repeat the same clarification questions. Raise a new question only if a material conflict or missing requirement is discovered.
- Recheck the checkout and applicable repository instructions before editing; the repository may have changed since this inventory.

## Objective

Refactor the resume templates so section components belong to a shared, reusable collection rather than to individual templates. Any template can import a chosen design and place it in any of its supported regions. Remove equivalent implementations while retaining materially distinct designs.

The collection includes resume sections, headers, profile introductions, contact blocks, and supporting visual primitives. Templates become thin compositions that select designs, supply data, and arrange regions.

## User-confirmed decisions

| Topic               | Agreed direction                                                                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visual preservation | Standardize minor differences; exact pixel parity is not required. Retain substantially different designs and all currently displayed resume information.                                    |
| Reusable designs    | Offer multiple reusable designs per family. Templates pick what they want through imports.                                                                                                   |
| Shared scope        | Include headers, profile introductions, contact blocks, and visual primitives as well as resume sections.                                                                                    |
| Data                | Pass section data through typed props. Shared visual components must not read resume stores or the builder's StateContext.                                                                   |
| Styling ownership   | Except for critical styles, styling is internal to the chosen component. Templates should not manage every heading, border, margin, or font size.                                            |
| Critical styling    | Colors and base fonts follow the resume theme. Components own spacing, font sizes, borders, decoration, and layout details. Limited semantic options such as compact density are acceptable. |
| Placement           | Sections automatically adopt destination-region colors and fit its width when moved between the main area and a colored sidebar.                                                             |
| Consolidation       | Merge designs that differ only in labels, heading treatments, or small spacing differences. Preserve distinct layouts such as timelines and technical arrangements.                          |
| Selection mechanism | Code imports. No builder UI for choosing individual section designs is requested.                                                                                                            |
| Section coverage    | Keep every template's current section coverage. Making components reusable does not mean enabling all sections in every template.                                                            |
| Collection location | Use src/templates/components/ with folders by component family.                                                                                                                              |

## Counts and proposed public inventory

Create **one shared component collection with nine families and 28 proposed public components/designs**. Internal primitives, providers, hooks, types, and utilities are additional implementation support, not included in the 28 count.

The user agreed to the nine-family structure. The 28 names are the concrete proposal from the plan, not existing exports. Treat them as the implementation starting point. If further source review shows two proposed designs should merge or an important existing design is missing, document the evidence and update this inventory rather than adding redundant wrappers solely to satisfy the number.

| Family / folder                     | Proposed public components                                                                                                      |  Count |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -----: |
| Profile / profile                   | InlineProfile, CenteredProfile, SidebarProfile, BandProfile, DecorativeProfile, CardProfile, TechnicalProfile, EditorialProfile |      8 |
| Contact / contact                   | InlineContacts, ContactList, ContactCard                                                                                        |      3 |
| Text / text                         | TextSection, ProfileSummarySection                                                                                              |      2 |
| Experience / experience             | StandardExperience, StackedExperience, TimelineExperience, TechnicalExperience                                                  |      4 |
| Education / education               | StandardEducation, CompactEducation, TechnicalEducation                                                                         |      3 |
| Skills / skills                     | ListSkills, ChipSkills, BarSkills, DotSkills                                                                                    |      4 |
| Projects and involvement / projects | ProjectsSection                                                                                                                 |      1 |
| Awards and achievements / awards    | AwardsSection, AchievementsSection                                                                                              |      2 |
| Volunteer / volunteer               | VolunteerSection                                                                                                                |      1 |
| **Total**                           |                                                                                                                                 | **28** |

Reuse TextSection for summary and objective with semantic default titles or an optional title prop. Use skill designs for languages, frameworks, libraries, tools, technologies, methodologies, and merged skill groups by passing the appropriate data and title. Do not create a component for every category when its visual design is the same.

AwardsSection consumes structured award entries. AchievementsSection consumes the existing rich-text achievements. ProjectsSection consumes existing project/involvement rich text. Preserve these different data shapes; do not force a store/schema migration.

Profile designs may compose public contact components. Internal composition does not require templates to supply nested visual markup. Preserve profile photos, social links, URLs, and relevant/total experience fields where currently displayed.

## Proposed folder structure

```text
src/templates/
  components/
    profile/
      ...named designs
      index.ts
    contact/
      ...named designs
      index.ts
    text/
      ...named designs
      index.ts
    experience/
      ...named designs
      index.ts
    education/
      ...named designs
      index.ts
    skills/
      ...named designs
      index.ts
    projects/
      ProjectsSection.tsx
      index.ts
    awards/
      AwardsSection.tsx
      AchievementsSection.tsx
      index.ts
    volunteer/
      VolunteerSection.tsx
      index.ts
    primitives/
      ...shared headings, frames, rich text, avatars, entry primitives
    theme/
      ...palette mapping, surface provider, tokens, presentation defaults
    types/
      ...shared prop contracts and presentation types
  integration/
    ...editor subscription/scrolling adapters, if needed
  classic/
    ClassicTemplate.tsx
  modern/
    ModernTemplate.tsx
  professional/
    ProfessionalTemplate.tsx
  ...other template folders
  registry/
    ...existing registry
```

Use named exports and per-family index.ts entry points, for example @/templates/components/experience. Avoid a universal barrel that unnecessarily connects every design to every template's lazy-loaded module.

Template folders retain page composition and layout styling. Remove their old components/ and atoms/ folders after migration. Integration adapters are outside the visual collection so store subscriptions cannot leak into reusable designs.

## Repository evidence and navigation

The checkout contains 11 templates:

| Template ID     | Existing entry file                                               |
| --------------- | ----------------------------------------------------------------- |
| modern          | src/templates/designs/modern/MordernTemplate.tsx                  |
| professional    | src/templates/designs/professional/ProfessionalTemplate.tsx       |
| classic         | src/templates/designs/classic/ClassicTemplate.tsx                 |
| sidebar-left    | src/templates/designs/sidebar-left/SidebarLeftTemplate.tsx        |
| sidebar-right   | src/templates/designs/sidebar-right/SidebarRightTemplate.tsx      |
| header-band     | src/templates/designs/header-band/HeaderBandTemplate.tsx          |
| creative        | src/templates/designs/creative/CreativeTemplate.tsx               |
| technical       | src/templates/designs/technical/TechnicalTemplate.tsx             |
| inspired        | src/templates/designs/inspired/InspiredTemplate.tsx               |
| plain           | src/templates/designs/plain/PlainTemplate.tsx                     |
| straightforward | src/templates/designs/straightforward/StraightforwardTemplate.tsx |

Modern's current entry filename is misspelled MordernTemplate.tsx. Renaming it is optional cleanup within migration; update its dynamic import and references if renamed. The template ID must remain modern.

Important files and responsibilities:

- src/templates/designs/registry/templates.ts: template metadata, thumbnails, dynamic imports, default regions/order, section predicates, and contribution instructions. Its current instructions explicitly recommend template-local components; update these after migration.
- src/templates/designs/registry/types.ts: registry entry and layout contracts.
- src/templates/designs/registry/sectionIds.ts: persisted section and region IDs.
- src/templates/designs/registry/predicates.ts: shared has-content rules.
- src/templates/common/resumePalette.ts: ResumePalette, useResumePalette, mergeResumePalette, withAlpha; maps the existing MUI/Emotion theme into resume colors and fonts.
- src/templates/common/palette-ui/: shared SectionHeading, RichText, Contact, ProfileAvatar, SkillWidgets, layoutPrimitives, formatDateRange, and a SectionHeading test.
- src/templates/designs/modern/atoms/: existing modern-specific typography/contact primitives that need consolidation.
- src/templates/designs/professional/components/Section.tsx: boxed section frame, heading, and social links; currently depends on the Emotion theme directly.
- src/templates/designs/professional/components/AboutMe.tsx and about.module.css: summary with a floated profile image; preserve the useful behavior in ProfileSummarySection.
- src/modules/builder/resume/ResumeLayout.tsx: resume data StateContext, selected template, MUI ThemeProvider, section-layout shell, zoom, and pagination integration.
- src/modules/builder/resume/PagedResume.tsx: pagination integration; inspect when checking print/pagination effects.
- src/helpers/section-layout/: existing drag-and-drop, allowed sections, layout normalization, runtime context, and persisted defaults.
- src/helpers/common/components/ValidSectionRenderer.tsx: SectionValidator; currently checks string/array length.
- src/helpers/common/components/HTMLRenderer.tsx and ProfileImage.tsx: existing generic rendering helpers; reuse where appropriate without broad unrelated restructuring.
- src/stores/index.interface.ts and section-specific *.interface.ts files: existing data types. Inspect actual store types before defining visual prop contracts.

Observed duplication: Classic, Sidebar Left, Sidebar Right, Creative, Inspired, and Header Band Work components share substantially the same JobHeader + date range + RichText structure. Differences are mostly heading/title and spacing. Professional has a distinct MUI timeline; Technical has a distinct inline position/company layout; Modern has a company-first stacked layout.

Observed coupling: Modern Work, Education, Awards, Volunteer, and Skills components subscribe directly to editor stores to scroll their DOM references into view. Skills subscribes to several skill stores. Preserve this behavior through integration adapters with cleanup, not inside shared visual components.

## Current section coverage and persisted behavior

These are current default placements. They are not permanent rendering restrictions: a supported section must still render after moving to another permitted region. The registry remains the source of truth; recheck it before implementation.

| Template        | Current default regions and sections                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| modern          | left: summary, work, awards; right: objective, languages, technologies, frameworks_libs, tools, education, volunteer             |
| professional    | left: work, involvement, achievements; right: summary, objective, tech_expertise, skills_exposure, methodology, tools, education |
| classic         | main: summary, work, education, skills                                                                                           |
| sidebar-left    | sidebar: skills, education; main: summary, work, awards                                                                          |
| sidebar-right   | main: summary, work, projects; sidebar: skills, education                                                                        |
| header-band     | main: summary, work; sidebar: skills, tools, education                                                                           |
| creative        | sidebar: skills, education; main: summary, work                                                                                  |
| technical       | main: summary, work, projects; sidebar: languages, frameworks_libs, stack, education                                             |
| inspired        | main: work, education; sidebar: summary, skills                                                                                  |
| plain           | main: work, education, awards                                                                                                    |
| straightforward | sidebar: education, skills_merged, awards; main: summary, work, involvements                                                     |

Important data distinctions:

- Sidebar Left's awards section currently displays activities.achievements, not the structured awards array.
- Professional's involvement, Sidebar Right/Technical projects, and Straightforward involvements all use activities.involvements.
- frameworks_libs combines frameworks and libraries where currently implemented.
- skills_exposure combines technologies, libraries, and databases.
- methodology uses skills.practices.
- technical stack combines tools and databases.
- skills_merged combines languages, frameworks, and tools.
- Other skill combinations must follow the existing template and predicate implementations.

Do not rename IDs or alter storage schemas to make the new folder names look uniform. Preserve active-template restoration, thumbnails, lazy loading, saved ordering, and section-layout normalization.

## Architecture and dependency boundaries

### Data and component APIs

- Use typed props for section-specific data, such as items, html, basics, and an optional title.
- Avoid any[] in new public contracts. Reuse existing structural types or define narrow compatible interfaces without changing stores.
- Account for current date shapes: some interfaces contain Dayjs values; others contain strings or null. Shared formatters must support the actual data received, including current-position flags.
- Components should render usefully with collection defaults, without requiring a template-specific provider.
- Styling context is permitted; resume-data/store context is not.
- Keep density and similar options semantic and limited. Avoid arbitrary CSSProperties, many styling flags, or template IDs in section props.
- A design owns its complete section presentation, including a suitable frame/heading and empty-content behavior. Templates should not wrap every design in template-specific presentation markup.
- Shared prop/type imports from existing interfaces are acceptable; runtime dependencies on editor stores are not.

Illustrative consumption (API names beyond the inventory remain design details):

```tsx
import { StandardExperience } from '@/templates/components/experience';
import { CompactEducation } from '@/templates/components/education';

<StandardExperience items={resumeData.work} />
<CompactEducation items={resumeData.education} />
```

### Theme and destination surfaces

1. Reuse the existing resume theme as the source of colors and base fonts.
2. Move palette derivation and presentation utilities into components/theme; do not duplicate mappings per template.
3. Introduce a collection-owned surface provider around each region, with semantic surfaces such as page and sidebar. Region names alone do not determine their background: a sidebar can be uncolored.
4. Resolve text, heading, muted, divider, and accent tokens for the actual surface. Maintain contrast; do not reuse a page accent blindly on an identical sidebar background.
5. Shared designs read the nearest surface tokens. Derivation and token merging stay internal; templates declare their region surface once.
6. Preserve intentional design emphasis such as technical monospace accents through collection-owned design styles/presets. Standardize minor font/heading differences where appropriate.
7. For colored bands/cards created inside a design, establish a nested surface internally so descendants use the correct colors.

Projected and persisted section placement already flow through the existing section-layout runtime. A section's surface must come from where it is rendered now, not from its default region or a palette captured when the section map was created.

The inspected SortableTemplateSection currently shows reorder labels and hides normal content during reorder mode, while retaining content for print. Verify destination styling after drop and through the existing projected layout behavior without introducing an unrelated redesign of drag previews. Preserve pointer and keyboard dragging.

### Width adaptation

- Design internals should use wrapping, flexible widths, min-width: 0 where needed, and sensible stacking in narrow containers.
- Prefer container-based adaptation where a design needs to switch layout; a resume sidebar is narrow even on a wide browser viewport.
- Handle long titles, names, URLs, dates, and rich text without overflowing a column.
- Keep the selected design stable when moved; adapt its layout and colors rather than switching to a different design.
- Pagination and print must still work with the resulting DOM and CSS.

### Section availability and empty handling

Keep registry predicates and visual empty-content checks consistent. The registry determines which section IDs enter the layout; component guards prevent empty visual shells. Share checks where sensible without making the visual collection import the template registry or builder.

Audit existing mismatches before changing them. For example, Modern's frameworks_libs visual guard currently checks frameworks while its registry predicate checks frameworks plus libraries. Correct equivalent-content inconsistencies where required for reliable rendering, preserving intended coverage and documenting any behavior correction. Broad validation policy changes are outside scope.

### Editor integration

Retain template-level access to StateContext and layout runtime for this refactor. Moving all templates to a new data context/API is unnecessary.

Extract Modern's store subscriptions/scrolling into a small adapter under src/templates/designs/integration or another clearly separate integration location. Wrap the corresponding sections there and retain unsubscribes on unmount. Shared visual components must not import that adapter. Preserve existing scroll behavior rather than enabling new behavior on every template.

Dependency direction:

```text
template composition -> shared family designs -> primitives/theme/types
template composition -> editor integration -> existing stores/helpers
template composition -> existing section-layout helpers
```

Shared designs never import an individual template, builder module, editor store, section-layout store, or template registry. Family reuse should not create import cycles. Collection primitives may reuse generic helpers where appropriate.

## Implementation sequence

### Phase 1: baseline and mapping

1. Read repository instructions, inspect git status, and preserve other work.
2. Review all existing section implementations and finalize the old-to-new design mapping.
3. Record the original supported section IDs, data combinations, displayed fields, and default layouts for all 11 templates.
4. Run the existing relevant checks before edits when practical, so pre-existing failures can be distinguished from regressions.
5. Capture representative preview/print output for comparison, including themes and long content. Exact pixel matching is not the acceptance criterion.

### Phase 2: shared foundation

1. Create the collection folders and family entry points.
2. Consolidate existing palette UI, modern atoms, boxed frames, rich text, contacts, avatars, skill widgets, and date formatting as appropriate.
3. Implement default theme tokens and destination surface propagation.
4. Define section prop contracts and shared content checks.
5. Keep public designs free of store subscriptions and template-specific imports.

### Phase 3: first reusable designs and migration

Migrate Classic and the two sidebar templates first. Their duplicated experience sections provide a useful first consolidation, and the sidebar templates exercise colored-region adaptation. Establish one per-template section renderer/map reused by all its regions, avoiding duplicated main/sidebar switch branches where practical.

Keep mappings explicit and local to template composition. Do not introduce a string-based universal component registry when the user chose imports.

### Phase 4: remaining templates

1. Header Band, Creative, Inspired, Technical.
2. Plain and Straightforward.
3. Modern and Professional, including extracted editor subscriptions and distinct timeline/profile-summary designs.

Preserve existing information and supported sections during each migration. Use collection-owned presentation defaults/presets to retain substantial design identity without recreating per-template copies. Templates select preset/designs once; they do not tune section CSS repeatedly.

### Phase 5: cleanup and documentation

1. Remove migrated template-local components/ and atoms/ folders and obsolete common utilities after checking all consumers.
2. Update registry imports, tests, and contribution instructions.
3. Update relevant repository documentation to explain how to add a design and compose a template.
4. Search for stale paths, duplicate implementations, dependency violations, and cycles.
5. Update this inventory/mapping to describe the actual final collection, noting justified deviations from the proposed 28.

## Verification

Current package scripts are npm run lint (oxlint src), npm test (vitest run), and npm run build (next build). There is no dedicated typecheck script in the inspected package.json; use the installed TypeScript CLI with --noEmit, following the repository's package manager/lockfile. Do not install or upgrade dependencies simply to perform this refactor.

Run checks appropriate to each migration, then the final relevant test suite, type checking, lint, and production build. Avoid repeated full checks without new changes or unresolved failures.

Add focused behavioral coverage where meaningful:

- One design renders from typed data without resume stores/StateContext.
- Destination surface changes update text/heading/skill colors.
- Empty data creates no blank headings/frames.
- Structured awards and rich-text achievements retain their different rendering.
- Date ranges and current flags handle existing input types consistently.
- Extracted editor subscriptions clean up and preserve scrolling behavior.
- Supported section mappings still render in every allowed region.

Do not add tests that merely mirror an import path or implementation detail.

Visually verify:

- All 11 templates, with representative populated data.
- Current section coverage and default placement.
- Existing saved/customized section orders and moves between columns.
- Colored and uncolored sidebar destinations, including skill indicators and frame borders.
- Theme changes, missing photos/contacts, long content, narrow columns, and multiple pages.
- Professional timeline/boxed presentation, Technical emphasis, and profile-summary image flow.
- Print output, page breaks, links, image rendering, and hidden editor controls.
- Existing Modern edit-to-scroll behavior and pointer/keyboard reordering.

Minor standardization can change line wrapping and pagination. Treat visual/print review as required evidence; a successful build alone does not verify layout.

## Scope limits

- Refactor the resume-template presentation area; allow only the small adjacent integration changes needed to preserve behavior.
- Keep current template IDs, section IDs, data schema, storage, and section coverage.
- No new builder feature for selecting designs.
- No broad rewrite of stores, drag-and-drop, pagination, theme configuration, or unrelated modules.
- No duplicated collections per template and no template-ID conditionals inside shared designs.
- Do not create a new unrelated task/chat, publish, or perform Git actions unless authorized separately.

## Definition of done

- All 11 templates import their section/profile/contact designs from one shared collection.
- Nine family folders exist; the actual public design list is documented with any justified count adjustments.
- Template-local section and atom folders are removed after migration.
- Near-identical rendering logic is consolidated; substantially different useful designs remain reusable.
- Data arrives through typed props; section styling is internal with limited theme/surface inputs.
- Sections follow destination surface colors and fit destination widths without changing their chosen design.
- Existing supported sections, displayed information, persisted layouts, editor behavior, lazy loading, and printing are preserved.
- Relevant checks pass, or pre-existing/environmental blockers are explicitly recorded with evidence.
- Final user-facing handoff explains what changed, how it was verified, and any remaining material limitations.

## Implementation record (2026-10-07)

The refactor is implemented across all 11 templates. The old template-local `components/` and Modern `atoms/` directories and the obsolete `common/` directory have been removed. Modern's entry is now `src/templates/designs/modern/ModernTemplate.tsx`; its persisted ID remains `modern`.

### Actual public collection

The nine proposed family folders exist with **29 named public designs**. All 28 proposed names are implemented. One additional profile, `ExperienceProfile`, preserves Professional's distinct boxed identity, relevant/total experience fields, and contact introduction. `CardProfile` retains Inspired's colored identity card with avatar; combining these would require unrelated mode flags and would lose a useful design.

| Family     | Actual named designs                                                                                                                               |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| profile    | InlineProfile, CenteredProfile, SidebarProfile, BandProfile, DecorativeProfile, CardProfile, TechnicalProfile, EditorialProfile, ExperienceProfile |
| contact    | InlineContacts, ContactList, ContactCard                                                                                                           |
| text       | TextSection, ProfileSummarySection                                                                                                                 |
| experience | StandardExperience, StackedExperience, TimelineExperience, TechnicalExperience                                                                     |
| education  | StandardEducation, CompactEducation, TechnicalEducation                                                                                            |
| skills     | ListSkills, ChipSkills, BarSkills, DotSkills                                                                                                       |
| projects   | ProjectsSection                                                                                                                                    |
| awards     | AwardsSection, AchievementsSection                                                                                                                 |
| volunteer  | VolunteerSection                                                                                                                                   |

### Final composition mapping

| Template        | Profile/contact selection       | Experience          | Education          | Skills                           | Presentation |
| --------------- | ------------------------------- | ------------------- | ------------------ | -------------------------------- | ------------ |
| classic         | CenteredProfile                 | StandardExperience  | StandardEducation  | ChipSkills                       | underlined   |
| sidebar-left    | InlineProfile + SidebarProfile  | StandardExperience  | CompactEducation   | BarSkills                        | standard     |
| sidebar-right   | InlineProfile + SidebarProfile  | StandardExperience  | CompactEducation   | DotSkills                        | standard     |
| header-band     | BandProfile                     | StandardExperience  | CompactEducation   | BarSkills + ChipSkills for tools | standard     |
| creative        | DecorativeProfile + ContactCard | StandardExperience  | CompactEducation   | BarSkills                        | standard     |
| inspired        | CardProfile                     | StandardExperience  | CompactEducation   | BarSkills                        | standard     |
| technical       | TechnicalProfile                | TechnicalExperience | TechnicalEducation | BarSkills + ChipSkills           | technical    |
| plain           | EditorialProfile                | StandardExperience  | StandardEducation  | —                                | editorial    |
| straightforward | EditorialProfile                | StandardExperience  | CompactEducation   | ListSkills                       | editorial    |
| modern          | InlineProfile                   | StackedExperience   | StandardEducation  | ChipSkills                       | stacked      |
| professional    | ExperienceProfile               | TimelineExperience  | StandardEducation  | BarSkills + ChipSkills           | boxed        |

Summary/objective use TextSection, except Professional summary uses ProfileSummarySection with floated image flow. Projects/involvements use ProjectsSection. Rich achievements use AchievementsSection, including Sidebar Left's persisted `awards` ID. Structured awards use AwardsSection. Modern volunteering uses VolunteerSection. Every existing data combination listed above is retained.

Each template has one local section map shared by all its regions. `TemplateRegion` keeps drag/drop integration outside the collection and establishes destination surface tokens. Surfaces include page, solid sidebar, primary tint, and accent tint; nested bands/cards establish their own contrast-aware tokens. Collection designs consume typed props and styling context only. Semantic presentation presets own frame/heading treatment; templates select a preset once.

### Deliberate behavior corrections and standardization

- Modern's frameworks/libraries section now renders when only libraries exist; its guard matches the registry combination.
- Classic's registry skills predicate now includes tools, matching its existing languages/frameworks/tools rendering. This makes tools-only content visible.
- Date formatting handles strings, Dayjs, null/undefined, invalid input, and current flags consistently. Compact education now shows current study dates consistently as well.
- Minor spacing, labels, heading treatment, and typography were standardized. Experience, contacts, and dates wrap in narrow containers; rich text media/tables are constrained to the destination width.
- Professional retains timeline positions/company, duration, boxed framing, experience totals, links, and profile-summary image flow. Timeline decoration now uses collection surface colors.
- Social links remain available with profile images; unknown networks receive a text link fallback.
- `EditScrollSection` preserves Modern's section store subscriptions, including all seven skill subscriptions per skill section, and unsubscribes on unmount.

### Verification evidence and limits

Baseline: the original two heading tests passed before migration. Final automated checks: `npm test` (48 passing tests across four files), `npx tsc --noEmit`, `npm run lint`, and `npm run build` all passed.

The tests verify typed rendering without resume context; surface text/heading/bar/dot colors; contrast on light and dark sidebars; empty content; structured/rich awards; date shapes and current flags; profile photos, contact/social URLs and experience fields; timeline duration and floated image styling; subscription scrolling/cleanup; all 11 default coverage sets; reversed section ordering and every supported section in each allowed destination; and the two predicate corrections.

Browser automation could not connect: the in-app browser returned `Browser is not available: iab`, and the enabled app/browser inventory was empty. Thus actual browser geometry, long-content clipping, image loading, printed pages, and live pointer/keyboard dragging remain **unverified**, despite successful DOM tests/build. Browser review is still required for visual acceptance. The existing `PagedResume` intentionally clips to one A4 page; this refactor preserves that behavior and does not introduce multipage pagination.

Running Next dev/build generated the framework-managed AGENTS.md/CLAUDE.md instructions and refreshed next-env.d.ts. No dependencies, storage schemas, template/section IDs, drag/drop logic, or print/pagination modules were changed.
