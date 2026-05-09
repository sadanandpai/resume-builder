import { useContext } from 'react';

import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/common/palette-ui';
import { useResumePalette } from '@/templates/common/resumePalette';

import { Education } from './components/Education';
import { Header } from './components/Header';
import { Skills } from './components/Skills';
import { Work } from './components/Work';

export default function AccessibleTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'work':
        return <Work work={data.work} p={resumePalette} />;
      case 'education':
        return <Education education={data.education} p={resumePalette} />;
      case 'skills':
        return (
          <Skills items={data.skills.languages.concat(data.skills.frameworks)} p={resumePalette} />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette), padding: '36px 40px' }}>
      <Header basics={basics} p={resumePalette} />
      <SortableRegion regionId="main" items={regions.main}>
        {(id) => (
          <SortableTemplateSection key={id} id={id}>
            {renderSection(id)}
          </SortableTemplateSection>
        )}
      </SortableRegion>
    </div>
  );
}
