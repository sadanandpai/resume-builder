import { useContext } from 'react';

import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/common/palette-ui';
import { useResumePalette } from '@/templates/common/resumePalette';

import { ContactCard } from './components/ContactCard';
import { Education } from './components/Education';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Summary } from './components/Summary';
import { Work } from './components/Work';

export default function CreativeTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;

  const renderSidebar = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        return (
          <Skills items={data.skills.languages.concat(data.skills.frameworks)} p={resumePalette} />
        );
      case 'education':
        return <Education education={data.education} p={resumePalette} />;
      default:
        return null;
    }
  };

  const renderMain = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return <Summary summary={basics.summary} p={resumePalette} />;
      case 'work':
        return <Work work={data.work} p={resumePalette} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette) }}>
      <Hero basics={basics} p={resumePalette} />
      <div
        style={{ display: 'grid', gridTemplateColumns: '38% 1fr', padding: '0 36px 30px', gap: 24 }}
      >
        <aside>
          <ContactCard basics={basics} p={resumePalette} />
          <SortableRegion regionId="sidebar" items={regions.sidebar}>
            {(id) => (
              <SortableTemplateSection key={id} id={id}>
                {renderSidebar(id) ?? renderMain(id)}
              </SortableTemplateSection>
            )}
          </SortableRegion>
        </aside>
        <main>
          <SortableRegion regionId="main" items={regions.main}>
            {(id) => (
              <SortableTemplateSection key={id} id={id}>
                {renderMain(id) ?? renderSidebar(id)}
              </SortableTemplateSection>
            )}
          </SortableRegion>
        </main>
      </div>
    </div>
  );
}
