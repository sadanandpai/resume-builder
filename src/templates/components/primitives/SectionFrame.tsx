import type { ReactNode } from 'react';
import { SectionHeading } from './SectionHeading';
import { usePresentation, useSurfacePalette, MONO_FONT, EDITORIAL_FONT } from '../theme';
import type { SectionProps } from '../types';

export function SectionFrame({
  title,
  density = 'comfortable',
  heading = 'section',
  children,
  headerActions,
}: SectionProps & {
  title: string;
  children: ReactNode;
  heading?: 'section' | 'profile';
  headerActions?: ReactNode;
}) {
  const p = useSurfacePalette();
  const presentation = usePresentation();
  const boxed = presentation === 'boxed';
  const Heading = heading === 'profile' ? 'h1' : 'h3';
  const editorial = presentation === 'editorial';
  return (
    <section
      style={{
        minWidth: 0,
        maxWidth: '100%',
        overflowWrap: 'anywhere',
        color: p.text,
        fontFamily: p.bodyFont,
        fontSize: 11,
        lineHeight: 1.5,
        marginBottom: density === 'compact' ? 10 : 16,
        ...(boxed
          ? {
              border: `1px solid ${p.divider}`,
              borderRadius: 5,
              padding: heading === 'profile' ? '18px 12px 12px' : '12px 10px',
              marginTop: heading === 'profile' ? 16 : 8,
            }
          : {}),
      }}
    >
      {boxed ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            flexWrap: 'wrap',
            margin: heading === 'profile' ? '-32px 0 12px' : '-22px 0 8px',
          }}
        >
          <Heading
            style={{
              margin: 0,
              minWidth: 0,
              flex: '1 1 0',
              fontSize: heading === 'profile' ? 20 : 12,
              lineHeight: heading === 'profile' ? 1.2 : undefined,
              fontWeight: heading === 'profile' ? 600 : undefined,
              color: p.primary,
              fontFamily: p.headingFont,
            }}
          >
            <span style={{ background: p.bg, padding: '0 5px', boxDecorationBreak: 'clone' }}>
              {title}
            </span>
          </Heading>
          {headerActions && (
            <div style={{ background: p.bg, padding: '0 5px', maxWidth: '100%' }}>
              {headerActions}
            </div>
          )}
        </div>
      ) : editorial ? (
        <h3
          style={{
            margin: '0 0 10px',
            fontFamily: EDITORIAL_FONT,
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            borderBottom: `1px solid ${p.divider}`,
            paddingBottom: 4,
            color: p.primary,
          }}
        >
          {title}
        </h3>
      ) : presentation === 'technical' ? (
        <h3
          style={{
            margin: '0 0 8px',
            fontSize: 12,
            color: p.primary,
            fontFamily: MONO_FONT,
          }}
        >
          {title.startsWith('//') ? title : `// ${title.toLowerCase()}`}
        </h3>
      ) : (
        <SectionHeading
          title={title}
          p={p}
          variant={
            presentation === 'underlined' || presentation === 'stacked' ? 'underline' : 'bar'
          }
        />
      )}
      {!boxed && headerActions}
      {children}
    </section>
  );
}
