import { bodySize, spacing } from '@/helpers/resume-style/styles';
import { JobHeader } from '../primitives/layoutPrimitives';
import { RichText } from '../primitives/RichText';
import { SectionFrame } from '../primitives/SectionFrame';
import { formatDateRange } from '../primitives/formatDateRange';
import { useSurfacePalette } from '../theme';
import type { ExperienceItem, ItemsProps } from '../types';
import styled from '@emotion/styled';

// Align first-level bullet centers with the company and position titles.
// Native outside markers use font-dependent spacing that varies when scaled.
const TimelineSummary = styled.div`
  & > div > div > ul {
    padding-inline-start: 12px !important;
    list-style: none !important;
  }
  & > div > div > ul > li {
    position: relative;
  }
  & > div > div > ul > li::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 0.5lh;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: currentColor;
    transform: translate(0, -50%);
  }
`;

type Props = ItemsProps<ExperienceItem> & {
  entrySpacing?: number;
  summarySpacing?: number;
  companyWeight?: number;
  markerColor?: 'primary' | 'accent';
};
function Experience({
  items,
  title = 'Experience',
  density,
  design,
  entrySpacing = 12,
  summarySpacing = 0,
  companyWeight = 600,
  markerColor = 'accent',
}: Props & { design: 'standard' | 'timeline' }) {
  const p = useSurfacePalette();
  if (!items.length) return null;
  return (
    <SectionFrame title={title} density={density}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          style={{
            marginBottom: design === 'timeline' ? 0 : spacing('entry', entrySpacing),
            minWidth: 0,
            ...(design === 'timeline'
              ? {
                  position: 'relative',
                  paddingLeft: 20,
                  paddingBottom: index === items.length - 1 ? 0 : spacing('entry', entrySpacing),
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
                border: `2px solid ${p[markerColor]}`,
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
                  style={{
                    fontWeight: companyWeight,
                    fontSize: bodySize(12),
                  }}
                >
                  {item.name}
                </div>
                <div style={{ color: p.primary }}>{item.position}</div>
              </div>
              <div
                style={{
                  color: p.muted,
                  fontSize: bodySize(10),
                }}
              >
                {formatDateRange(item.startDate, item.endDate, item.isWorkingHere)}
                {design === 'timeline' && item.years && (
                  <div style={{ textAlign: 'right' }}>{item.years}</div>
                )}
              </div>
            </div>
          )}
          {design === 'timeline' ? (
            <TimelineSummary style={{ paddingTop: summarySpacing }}>
              <RichText html={item.summary} p={p} />
            </TimelineSummary>
          ) : summarySpacing ? (
            <div style={{ paddingTop: summarySpacing }}>
              <RichText html={item.summary} p={p} />
            </div>
          ) : (
            <RichText html={item.summary} p={p} />
          )}
        </div>
      ))}
    </SectionFrame>
  );
}
export const StandardExperience = (props: Props) => <Experience {...props} design="standard" />;
export const TimelineExperience = (props: Props) => <Experience {...props} design="timeline" />;
