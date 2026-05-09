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
import { Frameworks } from './components/Frameworks';
import { Header } from './components/Header';
import { Languages } from './components/Languages';
import { Projects } from './components/Projects';
import { Stack } from './components/Stack';
import { Summary } from './components/Summary';
import { Work } from './components/Work';

export default function TechnicalTemplate() {
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
      case 'projects':
        return <Projects html={data.activities?.involvements} p={resumePalette} />;
      default:
        return null;
    }
  };

  const renderSidebar = (sectionId: string) => {
    switch (sectionId) {
      case 'languages':
        return <Languages items={data.skills.languages} p={resumePalette} />;
      case 'frameworks_libs':
        return (
          <Frameworks
            items={data.skills.frameworks.concat(data.skills.libraries)}
            p={resumePalette}
          />
        );
      case 'stack':
        return <Stack items={data.skills.tools.concat(data.skills.databases)} p={resumePalette} />;
      case 'education':
        return <Education education={data.education} p={resumePalette} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette), padding: '34px 40px' }}>
      <Header basics={basics} p={resumePalette} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 38%', gap: 22, marginTop: 16 }}>
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
