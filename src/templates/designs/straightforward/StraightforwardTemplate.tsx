import { columns, padding, spacing } from '@/helpers/resume-style/styles';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette, withAlpha } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { AwardsSection } from '@/templates/components/awards';
import { CompactEducation } from '@/templates/components/education';
import { StandardExperience } from '@/templates/components/experience';
import { EditorialProfile } from '@/templates/components/profile';
import { ProjectsSection } from '@/templates/components/projects';
import { ListSkills } from '@/templates/components/skills';
import { TextSection } from '@/templates/components/text';

export default function StraightforwardTemplate() {
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
        return <StandardExperience items={data.work} title="Professional Experience" />;
      case 'education':
        return <CompactEducation items={data.education} />;
      case 'skills_merged':
        return (
          <ListSkills
            items={data.skills.languages.concat(data.skills.frameworks, data.skills.tools)}
            title="Key Skills"
          />
        );
      case 'awards':
        return <AwardsSection items={data.awards} title="Certifications" />;
      case 'involvements':
        return <ProjectsSection html={data.activities?.involvements} title="Academic Projects" />;
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="editorial">
      <div
        style={{
          ...pageStyle(resumePalette),
          display: 'grid',
          gridTemplateColumns: columns('32% minmax(0, 1fr)', true, secondaryPercent),
          columnGap: spacing('column', 0),
        }}
      >
        <aside
          style={{
            background: withAlpha(resumePalette.accent, 0.12),
            padding: padding('28px 20px'),
            borderRight: `1px solid ${resumePalette.divider}`,
          }}
        >
          <TemplateRegion
            surface="accentTint"
            regionId="sidebar"
            items={regions.sidebar}
            renderSection={renderSection}
          />
        </aside>
        <main style={{ minWidth: 0, padding: padding('28px 32px') }}>
          <EditorialProfile basics={basics} />
          <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
        </main>
      </div>
    </ResumePresentation>
  );
}
