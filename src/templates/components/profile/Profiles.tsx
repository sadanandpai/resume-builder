import { spacing } from '@/helpers/resume-style/styles';
import { InlineContacts } from '../contact';
import { H1, Label } from '../primitives/layoutPrimitives';
import { useSurfacePalette } from '../theme';
import type { ProfileBasics } from '../types';

type Props = { basics: ProfileBasics };
function Identity({ basics }: Props) {
  const p = useSurfacePalette();
  return (
    <div style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
      <H1 p={p}>{basics.name}</H1>
      <Label p={p}>{basics.label}</Label>
    </div>
  );
}
export function CenteredProfile({ basics }: Props) {
  const p = useSurfacePalette();
  return (
    <header
      style={{
        textAlign: 'center',
        borderBottom: `var(--resume-profile-border-bottom, 2px solid ${p.primary})`,
        paddingBottom: 'var(--resume-profile-padding-bottom, 14px)',
        marginBottom: spacing('section', 18),
      }}
    >
      <Identity basics={basics} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <InlineContacts basics={basics} align="center" />
      </div>
    </header>
  );
}
