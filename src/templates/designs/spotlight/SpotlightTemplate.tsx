import { EditableResumeSection } from '@/helpers/common/components/EditableResumeSection';
import { columns, padding, spacing } from '@/helpers/resume-style/styles';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { SpotlightEducation } from '@/templates/components/education';
import { SpotlightExperience } from '@/templates/components/experience';
import { SpotlightSkills } from '@/templates/components/skills';
import { SpotlightAwards } from '@/templates/components/awards';
import { SpotlightProfile } from '@/templates/components/profile';

export default function SpotlightTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const secondaryPercent = useResumeStyleStore((state) => state.settings.secondaryColumnPercent);
  const palette = useResumePalette();
  const basics = data.basics;
  const renderSection = (id: string) => {
    switch (id) {
      case 'work':
        return <SpotlightExperience items={data.work} />;
      case 'awards':
        return <SpotlightAwards items={data.awards} />;
      case 'methodology':
        return <SpotlightSkills items={data.skills.practices} title="Practices" />;
      case 'tools':
        return <SpotlightSkills items={data.skills.tools} title="Tools" />;
      case 'education':
        return <SpotlightEducation items={data.education} />;
      case 'skills':
        return <SpotlightSkills items={data.skills.languages.concat(data.skills.frameworks)} />;
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="standard">
      <div style={pageStyle(palette)}>
        <EditableResumeSection id="basics">
          <SpotlightProfile basics={basics} />
        </EditableResumeSection>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: columns('minmax(0, 1fr) 42%', false, secondaryPercent),
            padding: padding('22px 25px 32px'),
            gap: spacing('column', 36),
          }}
        >
          <main style={{ minWidth: 0 }}>
            <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
          </main>
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
