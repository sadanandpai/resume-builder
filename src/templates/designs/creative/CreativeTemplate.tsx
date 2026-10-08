import { EditableResumeSection } from '@/helpers/common/components/EditableResumeSection';
import { columns, padding, spacing } from '@/helpers/resume-style/styles';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { ContactCard } from '@/templates/components/contact';
import { CompactEducation } from '@/templates/components/education';
import { StandardExperience } from '@/templates/components/experience';
import { DecorativeProfile } from '@/templates/components/profile';
import { BarSkills } from '@/templates/components/skills';
import { TextSection } from '@/templates/components/text';

export default function CreativeTemplate() {
  const secondaryPercent = useResumeStyleStore((state) => state.settings.secondaryColumnPercent);
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const renderSection = (id: string) => {
    switch (id) {
      case 'summary':
        return <TextSection html={basics.summary} title="About Me" />;
      case 'work':
        return <StandardExperience items={data.work} />;
      case 'education':
        return <CompactEducation items={data.education} />;
      case 'skills':
        return <BarSkills items={data.skills.languages.concat(data.skills.frameworks)} />;
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="standard">
      <div style={{ ...pageStyle(resumePalette) }}>
        <EditableResumeSection id="basics">
          <DecorativeProfile basics={basics} />
        </EditableResumeSection>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: columns('38% minmax(0, 1fr)', true, secondaryPercent),
            padding: padding('0 36px 30px'),
            gap: spacing('column', 24),
          }}
        >
          <aside style={{ minWidth: 0 }}>
            <EditableResumeSection id="basics">
              <ContactCard basics={basics} />
            </EditableResumeSection>
            <TemplateRegion
              regionId="sidebar"
              items={regions.sidebar}
              renderSection={renderSection}
            />
          </aside>
          <main style={{ minWidth: 0 }}>
            <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
          </main>
        </div>
      </div>
    </ResumePresentation>
  );
}
