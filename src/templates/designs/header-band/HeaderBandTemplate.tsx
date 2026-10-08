import { EditableResumeSection } from '@/helpers/common/components/EditableResumeSection';
import { columns, padding, spacing } from '@/helpers/resume-style/styles';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { CompactEducation } from '@/templates/components/education';
import { StandardExperience } from '@/templates/components/experience';
import { BandProfile } from '@/templates/components/profile';
import { BarSkills, ChipSkills } from '@/templates/components/skills';
import { TextSection } from '@/templates/components/text';

export default function HeaderBandTemplate() {
  const secondaryPercent = useResumeStyleStore((state) => state.settings.secondaryColumnPercent);
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const renderSection = (id: string) => {
    switch (id) {
      case 'summary':
        return <TextSection html={basics.summary} title="About" />;
      case 'work':
        return <StandardExperience items={data.work} />;
      case 'education':
        return <CompactEducation items={data.education} />;
      case 'skills':
        return <BarSkills items={data.skills.languages.concat(data.skills.frameworks)} />;
      case 'tools':
        return <ChipSkills items={data.skills.tools} title="Tools" />;
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="standard">
      <div style={{ ...pageStyle(resumePalette) }}>
        <EditableResumeSection id="basics">
          <BandProfile basics={basics} />
        </EditableResumeSection>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: columns('minmax(0, 1fr) 38%', false, secondaryPercent),
            padding: padding('26px 36px'),
            gap: spacing('column', 26),
          }}
        >
          <div style={{ minWidth: 0 }}>
            <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
          </div>
          <aside style={{ minWidth: 0 }}>
            <TemplateRegion
              regionId="sidebar"
              items={regions.sidebar}
              renderSection={renderSection}
            />
          </aside>
        </div>
      </div>
    </ResumePresentation>
  );
}
