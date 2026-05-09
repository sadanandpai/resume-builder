import { useContext } from 'react';

import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/common/palette-ui';
import { useResumePalette, withAlpha } from '@/templates/common/resumePalette';
import { SECTION_IDS } from '@/templates/registry/sectionIds';

import { Awards } from './components/Awards';
import { Education } from './components/Education';
import { Header } from './components/Header';
import { Involvements } from './components/Involvements';
import { Skills } from './components/Skills';
import { Summary } from './components/Summary';
import { Work } from './components/Work';

export default function StraightforwardTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const skills = data.skills.languages.concat(data.skills.frameworks, data.skills.tools);

  const renderSidebar = (sectionId: string) => {
    switch (sectionId) {
      case SECTION_IDS.education:
        return <Education education={data.education} p={resumePalette} />;
      case SECTION_IDS.skillsMerged:
        return <Skills items={skills} p={resumePalette} />;
      case SECTION_IDS.awards:
        return <Awards awards={data.awards} p={resumePalette} />;
      default:
        return null;
    }
  };

  const renderMain = (sectionId: string) => {
    switch (sectionId) {
      case SECTION_IDS.summary:
        return <Summary summary={basics.summary} p={resumePalette} />;
      case SECTION_IDS.work:
        return <Work work={data.work} p={resumePalette} />;
      case SECTION_IDS.involvements:
        return <Involvements html={data.activities?.involvements} p={resumePalette} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette), display: 'grid', gridTemplateColumns: '32% 1fr' }}>
      <aside
        style={{
          background: withAlpha(resumePalette.accent, 0.12),
          padding: '28px 20px',
          borderRight: `1px solid ${resumePalette.divider}`,
        }}
      >
        <SortableRegion regionId="sidebar" items={regions.sidebar}>
          {(id) => (
            <SortableTemplateSection key={id} id={id}>
              {renderSidebar(id) ?? renderMain(id)}
            </SortableTemplateSection>
          )}
        </SortableRegion>
      </aside>
      <main style={{ padding: '28px 32px' }}>
        <Header basics={basics} p={resumePalette} />
        <SortableRegion regionId="main" items={regions.main}>
          {(id) => (
            <SortableTemplateSection key={id} id={id}>
              {renderMain(id) ?? renderSidebar(id)}
            </SortableTemplateSection>
          )}
        </SortableRegion>
      </main>
    </div>
  );
}
