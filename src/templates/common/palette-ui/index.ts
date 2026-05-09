/**
 * Shared UI primitives for palette-driven resume templates (Classic, Creative, Technical, …).
 * Pair with `@/templates/common/resumePalette` for theme tokens.
 *
 * Template-specific layouts live next to each `*Template.tsx` under `components/` using
 * short filenames (`Work.tsx`, `Strip.tsx`, …), not `TemplateNameWorkSection` — see `modern/`.
 */
export { formatDateRange } from './formatDateRange';
export { SectionHeading } from './SectionHeading';
export { RichText } from './RichText';
export { ContactLine, ContactBlock, SocialIconsRow } from './Contact';
export { ProfileAvatar } from './ProfileAvatar';
export {
  SkillBar,
  SkillDots,
  ChipList,
  SkillBarThick,
  SkillStars,
  SkillDotGrid,
} from './SkillWidgets';
export { SectionRule } from './SectionRule';
export { pageStyle, H1, Label, JobHeader } from './layoutPrimitives';
