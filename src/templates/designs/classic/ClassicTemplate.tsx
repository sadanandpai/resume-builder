import { padding } from '@/helpers/resume-style/styles';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { StandardEducation } from '@/templates/components/education';
import { StandardExperience } from '@/templates/components/experience';
import { CenteredProfile } from '@/templates/components/profile';
import { ChipSkills } from '@/templates/components/skills';
import { TextSection } from '@/templates/components/text';

export default function ClassicTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const renderSection = (id: string) => {
    switch (id) {
      case 'summary':
        return <TextSection html={basics.summary} title="Profile" />;
      case 'work':
        return <StandardExperience items={data.work} />;
      case 'education':
        return <StandardEducation items={data.education} />;
      case 'skills':
        return (
          <ChipSkills
            items={data.skills.languages.concat(data.skills.frameworks, data.skills.tools)}
          />
        );
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="underlined">
      <div style={{ ...pageStyle(resumePalette), padding: padding('40px 48px') }}>
        <CenteredProfile basics={basics} />
        <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
      </div>
    </ResumePresentation>
  );
}
