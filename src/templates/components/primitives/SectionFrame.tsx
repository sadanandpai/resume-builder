import { font, bodySize, roleSize, lineHeight, spacing } from '@/helpers/resume-style/styles';
import type { ReactNode } from 'react';
import { SectionHeading } from './SectionHeading';
import { usePresentation, useSurfacePalette, withAlpha } from '../theme';
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
  const ruled = presentation === 'ruled';
  const Heading = heading === 'profile' ? 'h1' : 'h3';
  return (
    <section
      style={{
        minWidth: 0,
        maxWidth: '100%',
        overflowWrap: 'anywhere',
        color: p.text,
        fontFamily: font(p.bodyFont),
        fontSize: bodySize(11),
        lineHeight: `var(--resume-section-line-height, ${lineHeight(1.5)})`,
        marginBottom: `var(--resume-section-margin-bottom, ${spacing('section', density === 'compact' ? 10 : 16)})`,
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
      {ruled ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            flexWrap: 'wrap',
            margin: heading === 'profile' ? '0 0 12px' : '0 0 10px',
            paddingBottom: heading === 'profile' ? 8 : 5,
            borderBottom: `1px solid ${withAlpha(p.accent, heading === 'profile' ? 0.4 : 0.24)}`,
          }}
        >
          <Heading
            style={{
              margin: 0,
              minWidth: 0,
              flex: '1 1 0',
              fontSize: roleSize(
                heading === 'profile' ? 'name' : 'heading',
                heading === 'profile' ? 24 : 12
              ),
              lineHeight: heading === 'profile' ? lineHeight(1.2) : undefined,
              fontWeight: 500,
              letterSpacing: heading === 'profile' ? '-0.02em' : '0.04em',
              color: p.primary,
              fontFamily: font(p.headingFont),
            }}
          >
            {title}
          </Heading>
          {headerActions && <div style={{ maxWidth: '100%' }}>{headerActions}</div>}
        </div>
      ) : boxed ? (
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
              fontSize: roleSize(
                heading === 'profile' ? 'name' : 'heading',
                heading === 'profile' ? 20 : 12
              ),
              lineHeight: heading === 'profile' ? lineHeight(1.2) : undefined,
              fontWeight: heading === 'profile' ? 600 : undefined,
              color: p.primary,
              fontFamily: font(p.headingFont),
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
      ) : (
        <SectionHeading
          title={title}
          p={p}
          variant={presentation === 'underlined' ? 'underline' : 'bar'}
        />
      )}
      {!boxed && !ruled && headerActions}
      {children}
    </section>
  );
}
