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
import { Skills } from './components/Skills';
import { Strip } from './components/Strip';
import { Summary } from './components/Summary';
import { Tools } from './components/Tools';
import { Work } from './components/Work';

export default function HeaderBandTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;

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

  const renderSidebar = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        return (
          <Skills items={data.skills.languages.concat(data.skills.frameworks)} p={resumePalette} />
        );
      case 'tools':
        return <Tools items={data.skills.tools} p={resumePalette} />;
      case 'education':
        return <Education education={data.education} p={resumePalette} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette) }}>
      <Strip basics={basics} p={resumePalette} />
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 38%', padding: '26px 36px', gap: 26 }}
      >
        <div>
          <SortableRegion regionId="main" items={regions.main}>
            {(id) => (
              <SortableTemplateSection key={id} id={id}>
                {renderMain(id) ?? renderSidebar(id)}
              </SortableTemplateSection>
            )}
          </SortableRegion>
        </div>
        <aside>
          <SortableRegion regionId="sidebar" items={regions.sidebar}>
            {(id) => (
              <SortableTemplateSection key={id} id={id}>
                {renderSidebar(id) ?? renderMain(id)}
              </SortableTemplateSection>
            )}
          </SortableRegion>
        </aside>
      </div>
    </div>
  );
}
