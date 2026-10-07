import { columns, padding, spacing } from '@/helpers/resume-style/styles';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette, withAlpha } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { CompactEducation } from '@/templates/components/education';
import { StandardExperience } from '@/templates/components/experience';
import { InlineProfile, SidebarProfile } from '@/templates/components/profile';
import { ProjectsSection } from '@/templates/components/projects';
import { DotSkills } from '@/templates/components/skills';
import { TextSection } from '@/templates/components/text';

export default function SidebarRightTemplate() {
  const secondaryPercent = useResumeStyleStore((state) => state.settings.secondaryColumnPercent);
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const renderSection = (id: string) => {
    switch (id) {
      case 'summary':
        return <TextSection html={basics.summary} />;
      case 'work':
        return <StandardExperience items={data.work} />;
      case 'education':
        return <CompactEducation items={data.education} />;
      case 'skills':
        return <DotSkills items={data.skills.languages.concat(data.skills.frameworks)} />;
      case 'projects':
        return <ProjectsSection html={data.activities?.involvements} />;
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="standard">
      <div
        style={{
          ...pageStyle(resumePalette),
          display: 'grid',
          gridTemplateColumns: columns('minmax(0, 1fr) 32%', false, secondaryPercent),
          columnGap: spacing('column', 0),
        }}
      >
        <main style={{ minWidth: 0, padding: padding('34px 28px') }}>
          <InlineProfile basics={{ name: basics.name, label: basics.label }} />
          <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
        </main>
        <aside
          style={{
            background: withAlpha(resumePalette.primary, 0.08),
            padding: padding('34px 22px'),
            borderLeft: `4px solid ${resumePalette.accent}`,
          }}
        >
          <SidebarProfile basics={basics} />
          <TemplateRegion
            surface="tinted"
            regionId="sidebar"
            items={regions.sidebar}
            renderSection={renderSection}
          />
        </aside>
      </div>
    </ResumePresentation>
  );
}
