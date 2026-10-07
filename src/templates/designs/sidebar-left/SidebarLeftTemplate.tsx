import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumeSurface, ResumePresentation, useResumePalette } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { AchievementsSection } from '@/templates/components/awards';
import { CompactEducation } from '@/templates/components/education';
import { StandardExperience } from '@/templates/components/experience';
import { InlineProfile, SidebarProfile } from '@/templates/components/profile';
import { BarSkills } from '@/templates/components/skills';
import { TextSection } from '@/templates/components/text';

export default function SidebarLeftTemplate() {
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
        return <BarSkills items={data.skills.languages.concat(data.skills.frameworks)} />;
      case 'awards':
        return (
          <AchievementsSection html={data.activities?.achievements} title="Awards & Highlights" />
        );
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
          gridTemplateColumns: '34% minmax(0, 1fr)',
        }}
      >
        <aside
          style={{
            background: resumePalette.sidebarBg,
            color: resumePalette.sidebarText,
            padding: '32px 22px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <ResumeSurface surface="sidebar">
            <SidebarProfile basics={basics} />
          </ResumeSurface>
          <TemplateRegion
            surface="sidebar"
            regionId="sidebar"
            items={regions.sidebar}
            renderSection={renderSection}
          />
        </aside>
        <main style={{ minWidth: 0, padding: '32px 28px' }}>
          <InlineProfile basics={{ name: basics.name, label: basics.label }} />
          <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
        </main>
      </div>
    </ResumePresentation>
  );
}
