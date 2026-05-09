import { useContext, CSSProperties } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ChipList, RichText, SectionHeading, SkillBar, formatDateRange } from './atoms';
import { H1, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function TechnicalTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', 'Menlo', monospace" };

  const renderMain = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <SectionValidator value={basics.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="// about" p={resumePalette} variant="bar" />
              <RichText html={basics.summary} p={resumePalette} />
            </section>
          </SectionValidator>
        );
      case 'work':
        return (
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="// experience" p={resumePalette} variant="bar" />
              {data.work.map((w: any) => (
                <div key={w.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>
                        {w.position} <span style={{ color: resumePalette.accent }}>@</span> {w.name}
                      </div>
                    </div>
                    <div style={{ ...mono, color: resumePalette.muted, fontSize: 10 }}>
                      {formatDateRange(w.startDate, w.endDate, w.isWorkingHere)}
                    </div>
                  </div>
                  <RichText html={w.summary} p={resumePalette} />
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      case 'projects':
        return (
          <SectionValidator value={data.activities?.involvements}>
            <section>
              <SectionHeading title="// projects" p={resumePalette} variant="bar" />
              <RichText html={data.activities.involvements} p={resumePalette} />
            </section>
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  const renderSidebar = (sectionId: string) => {
    switch (sectionId) {
      case 'languages':
        return (
          <SectionValidator value={data.skills.languages}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="// languages" p={resumePalette} variant="bar" />
              {data.skills.languages.map((s: any, i: number) => (
                <SkillBar key={i} name={s.name} level={s.level} p={resumePalette} />
              ))}
            </section>
          </SectionValidator>
        );
      case 'frameworks_libs':
        return (
          <SectionValidator value={data.skills.frameworks.concat(data.skills.libraries)}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="// frameworks" p={resumePalette} variant="bar" />
              <ChipList
                items={data.skills.frameworks.concat(data.skills.libraries)}
                p={resumePalette}
                variant="soft"
              />
            </section>
          </SectionValidator>
        );
      case 'stack':
        return (
          <SectionValidator value={data.skills.tools.concat(data.skills.databases)}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="// stack" p={resumePalette} variant="bar" />
              <ChipList
                items={data.skills.tools.concat(data.skills.databases)}
                p={resumePalette}
                variant="outline"
              />
            </section>
          </SectionValidator>
        );
      case 'education':
        return (
          <SectionValidator value={data.education}>
            <section>
              <SectionHeading title="// education" p={resumePalette} variant="bar" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ marginBottom: 6, fontSize: 10.5 }}>
                  <div style={{ fontWeight: 600 }}>
                    {e.studyType} · {e.area}
                  </div>
                  <div style={{ color: resumePalette.muted, ...mono }}>
                    {e.institution} · {e.startDate}–{e.endDate}
                  </div>
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette), padding: '34px 40px' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px dashed ${resumePalette.divider}`,
          paddingBottom: 14,
        }}
      >
        <div>
          <div style={{ ...mono, color: resumePalette.accent, fontSize: 11 }}>&lt;hello /&gt;</div>
          <H1 p={resumePalette} size={26}>
            {basics.name}
          </H1>
          <div style={{ ...mono, fontSize: 11, color: resumePalette.muted }}>
            {'// '}
            {basics.label}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 10.5, ...mono }}>
          {basics.email && <div>{basics.email}</div>}
          {basics.phone && <div>{basics.phone}</div>}
          {basics.location?.city && <div>{basics.location.city}</div>}
          {basics.url && <div>{basics.url}</div>}
        </div>
      </header>
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
