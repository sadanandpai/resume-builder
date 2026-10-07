import { font, bodySize, spacing } from '@/helpers/resume-style/styles';
import { JobHeader } from '../primitives/layoutPrimitives';
import { RichText } from '../primitives/RichText';
import { SectionFrame } from '../primitives/SectionFrame';
import { formatDateRange } from '../primitives/formatDateRange';
import { useSurfacePalette, MONO_FONT } from '../theme';
import type { ExperienceItem, ItemsProps } from '../types';

type Props = ItemsProps<ExperienceItem>;
function Experience({
  items,
  title = 'Experience',
  density,
  design,
}: Props & { design: 'standard' | 'stacked' | 'timeline' | 'technical' }) {
  const p = useSurfacePalette();
  if (!items.length) return null;
  return (
    <SectionFrame title={title} density={density}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          style={{
            marginBottom: design === 'timeline' ? 0 : spacing('entry', 12),
            minWidth: 0,
            ...(design === 'timeline'
              ? {
                  position: 'relative',
                  paddingLeft: 20,
                  paddingBottom: index === items.length - 1 ? 0 : spacing('entry', 12),
                  marginLeft: 5,
                }
              : {}),
          }}
        >
          {design === 'timeline' && index < items.length - 1 && (
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                top: 8.5,
                bottom: -8.5,
                width: 1,
                background: p.divider,
                transform: 'translateX(-50%)',
              }}
            />
          )}
          {design === 'timeline' && (
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: 4,
                left: 0,
                transform: 'translateX(-50%)',
                boxSizing: 'border-box',
                zIndex: 1,
                width: 9,
                height: 9,
                border: `2px solid ${p.accent}`,
                borderRadius: '50%',
                background: p.bg,
              }}
            />
          )}
          {design === 'standard' ? (
            <JobHeader
              position={item.position}
              company={item.name}
              date={formatDateRange(item.startDate, item.endDate, item.isWorkingHere)}
              p={p}
              compact={density === 'compact'}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 8,
                flexWrap: 'wrap',
                minWidth: 0,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{ fontWeight: 600, fontSize: bodySize(design === 'stacked' ? 15 : 12) }}
                >
                  {design === 'technical' ? (
                    <>
                      {item.position} <span style={{ color: p.accent }}>@</span> {item.name}
                    </>
                  ) : (
                    item.name
                  )}
                </div>
                {design !== 'technical' && <div style={{ color: p.primary }}>{item.position}</div>}
              </div>
              <div
                style={{
                  color: p.muted,
                  fontSize: bodySize(10),
                  ...(design === 'technical' ? { fontFamily: font(MONO_FONT) } : {}),
                }}
              >
                {formatDateRange(item.startDate, item.endDate, item.isWorkingHere)}
                {design === 'timeline' && item.years && (
                  <div style={{ textAlign: 'right' }}>{item.years}</div>
                )}
              </div>
            </div>
          )}
          <RichText html={item.summary} p={p} />
        </div>
      ))}
    </SectionFrame>
  );
}
export const StandardExperience = (props: Props) => <Experience {...props} design="standard" />;
export const StackedExperience = (props: Props) => <Experience {...props} design="stacked" />;
export const TimelineExperience = (props: Props) => <Experience {...props} design="timeline" />;
export const TechnicalExperience = (props: Props) => <Experience {...props} design="technical" />;
