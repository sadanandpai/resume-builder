import { useContext } from 'react';

import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/common/palette-ui';
import { mergeResumePalette, useResumePalette, withAlpha } from '@/templates/common/resumePalette';

import { AsideIntro } from './components/AsideIntro';
import { Awards } from './components/Awards';
import { Education } from './components/Education';
import { MainIntro } from './components/MainIntro';
import { Skills } from './components/Skills';
import { Summary } from './components/Summary';
import { Work } from './components/Work';

export default function SidebarLeftTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const side = mergeResumePalette(resumePalette, {
    primary: resumePalette.sidebarText,
    divider: withAlpha(resumePalette.sidebarText, 0.2),
    muted: withAlpha(resumePalette.sidebarText, 0.65),
    accent: resumePalette.accent,
  });
  const skillBarP = mergeResumePalette(resumePalette, {
    divider: withAlpha(resumePalette.sidebarText, 0.15),
    muted: withAlpha(resumePalette.sidebarText, 0.65),
    accent: resumePalette.accent,
  });

  const renderSidebar = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        return (
          <Skills
            items={data.skills.languages.concat(data.skills.frameworks)}
            titlePalette={side}
            skillPalette={skillBarP}
          />
        );
      case 'education':
        return <Education education={data.education} titlePalette={side} />;
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
      case 'awards':
        return <Awards html={data.activities?.achievements} p={resumePalette} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette), display: 'grid', gridTemplateColumns: '34% 1fr' }}>
      <aside
        style={{
          background: resumePalette.sidebarBg,
          color: resumePalette.sidebarText,
          padding: '32px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <AsideIntro basics={basics} resumePalette={resumePalette} sidePalette={side} />
        <SortableRegion regionId="sidebar" items={regions.sidebar}>
          {(id) => (
            <SortableTemplateSection key={id} id={id}>
              {renderSidebar(id) ?? renderMain(id)}
            </SortableTemplateSection>
          )}
        </SortableRegion>
      </aside>
      <main style={{ padding: '32px 28px' }}>
        <MainIntro basics={basics} p={resumePalette} />
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
