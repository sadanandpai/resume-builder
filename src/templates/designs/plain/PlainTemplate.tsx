import { padding } from '@/helpers/resume-style/styles';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { AwardsSection } from '@/templates/components/awards';
import { StandardEducation } from '@/templates/components/education';
import { StandardExperience } from '@/templates/components/experience';
import { EditorialProfile } from '@/templates/components/profile';

export default function PlainTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const renderSection = (id: string) => {
    switch (id) {
      case 'work':
        return <StandardExperience items={data.work} title="Professional Experience" />;
      case 'education':
        return <StandardEducation items={data.education} />;
      case 'awards':
        return <AwardsSection items={data.awards} title="Certifications" />;
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="editorial">
      <div style={{ ...pageStyle(resumePalette), padding: padding('40px 48px') }}>
        <EditorialProfile basics={basics} />
        <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
      </div>
    </ResumePresentation>
  );
}
