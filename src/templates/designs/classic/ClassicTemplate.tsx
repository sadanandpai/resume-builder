import { useTemplateTitles } from '@/stores/useSectionTitleStore';
import { EditableResumeSection } from '@/helpers/common/components/EditableResumeSection';
import { padding, spacing } from '@/helpers/resume-style/styles';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { SectionFrame } from '@/templates/components/primitives/SectionFrame';
import { RichText } from '@/templates/components/primitives/RichText';
import { formatDate } from '@/templates/components/primitives/formatDateRange';
import { ResumePresentation, useResumePalette } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { StandardEducation } from '@/templates/components/education';
import { StandardExperience } from '@/templates/components/experience';
import { CenteredProfile } from '@/templates/components/profile';
import type { AwardItem, SkillItem } from '@/templates/components/types';
import { TextSection } from '@/templates/components/text';

const Paper = styled.div`
  --resume-profile-padding-bottom: 0px;
  --resume-profile-border-bottom: none;
  --resume-heading-border-width: 1px;
  --resume-heading-margin-bottom: 5px;
  --resume-section-margin-bottom: ${spacing('section', 14)};
  --resume-section-line-height: var(--resume-line-height, 1.3);
  & p {
    margin: 0 0 3px;
  }
  & ul,
  & ol {
    margin: 3px 0;
    padding-left: 17px;
  }
  & li {
    padding-left: 1px;
  }
`;

export default function ClassicTemplate() {
  const titles = useTemplateTitles('classic');
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const paper = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, height: undefined as number | undefined });
  // Measure the untransformed content; preview zoom must not affect print fitting.
  useLayoutEffect(() => {
    const content = paper.current;
    const page = content?.closest('.resume-page-content');
    if (!content || !page) return;
    const measure = () => {
      // Compensate the width before measuring each candidate scale so shrinking
      // to one page keeps the content spanning the full page width.
      const available = page.clientHeight - 1;
      if (available <= 0) return;
      content.style.width = '100%';
      if (!content.offsetHeight) return;
      let scale = 1;
      if (content.offsetHeight > available) {
        let low = 0.01;
        let high = 1;
        for (let i = 0; i < 16; i++) {
          const candidate = (low + high) / 2;
          content.style.width = `${100 / candidate}%`;
          if (content.offsetHeight * candidate <= available) low = candidate;
          else high = candidate;
        }
        scale = low;
      }
      content.style.width = `${100 / scale}%`;
      const height = content.offsetHeight * scale;
      setFit((previous) =>
        previous.scale === scale && previous.height === height ? previous : { scale, height }
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    observer.observe(page);
    document.fonts?.ready.then(measure);
    window.addEventListener('beforeprint', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('beforeprint', measure);
    };
  }, []);
  const renderSection = (id: string) => {
    switch (id) {
      case 'summary':
        return <TextSection density="compact" html={basics.summary} title={titles.summary} />;
      case 'objective':
        return <TextSection density="compact" html={basics.objective} title={titles.objective} />;
      case 'work':
        return (
          <StandardExperience
            density="compact"
            entrySpacing={7}
            items={data.work}
            title={titles.work}
          />
        );
      case 'education':
        return (
          <StandardEducation title={titles.education} density="compact" items={data.education} />
        );
      case 'involvement':
        return (
          <TextSection
            density="compact"
            html={data.activities.involvements}
            title={titles.involvement}
          />
        );
      case 'achievements':
        return (
          <TextSection
            density="compact"
            html={data.activities.achievements}
            title={titles.achievements}
          />
        );
      case 'awards':
        return (
          <SectionFrame density="compact" title={titles.awards}>
            {data.awards.map((award: AwardItem) => (
              <div key={award.id}>
                <strong>{award.title}</strong>{' '}
                {[award.awarder, formatDate(award.date)].filter(Boolean).join(' · ')}
                <RichText html={award.summary} p={resumePalette} />
              </div>
            ))}
          </SectionFrame>
        );
      case 'skills': {
        const groups = [
          ['Languages', data.skills.languages],
          ['Frameworks', data.skills.frameworks],
          ['Technologies', data.skills.technologies],
          ['Libraries', data.skills.libraries],
          ['Databases', data.skills.databases],
          ['Tools', data.skills.tools],
          ['Practices', data.skills.practices],
        ] as const;
        return (
          <SectionFrame density="compact" title={titles.skills}>
            {groups.map(
              ([label, items]) =>
                items.length > 0 && (
                  <div key={label}>
                    <strong>{label}: </strong>
                    {items.map((item: SkillItem) => item.name).join(', ')}
                  </div>
                )
            )}
          </SectionFrame>
        );
      }
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="underlined">
      <div style={{ height: fit.height, width: '100%' }}>
        <Paper
          ref={paper}
          style={{
            ...pageStyle(resumePalette),
            height: 'auto',
            display: 'flow-root',
            padding: padding('28px 28px'),
            width: `${100 / fit.scale}%`,
            transform: `scale(${fit.scale})`,
            transformOrigin: 'top left',
          }}
        >
          <EditableResumeSection id="basics">
            <CenteredProfile basics={basics} />
          </EditableResumeSection>
          <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
        </Paper>
      </div>
    </ResumePresentation>
  );
}
