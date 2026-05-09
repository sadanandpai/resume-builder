import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { RichText, SectionHeading, formatDateRange } from './atoms';
import { JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette, withAlpha } from './resumePalette';

const serif = "'Georgia', 'Times New Roman', serif";

export default function StraightforwardTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const skills = data.skills.languages.concat(data.skills.frameworks, data.skills.tools);

  const renderSidebar = (sectionId: string) => {
    switch (sectionId) {
      case 'education':
        return (
          <SectionValidator value={data.education}>
            <section style={{ marginBottom: 16 }}>
              <h3
                style={{
                  fontFamily: serif,
                  fontSize: 12,
                  color: resumePalette.primary,
                  margin: '0 0 8px 0',
                }}
              >
                Education
              </h3>
              {data.education.map((e: any) => (
                <div key={e.id} style={{ fontSize: 10.5, marginBottom: 8, lineHeight: 1.45 }}>
                  <strong>{e.studyType}</strong>
                  <div>{e.area}</div>
                  <div style={{ color: resumePalette.muted }}>{e.institution}</div>
                  <div style={{ color: resumePalette.muted }}>
                    {e.startDate}–{e.endDate}
                  </div>
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      case 'skills_merged':
        return (
          <SectionValidator value={skills}>
            <section style={{ marginBottom: 16 }}>
              <h3
                style={{
                  fontFamily: serif,
                  fontSize: 12,
                  color: resumePalette.primary,
                  margin: '0 0 8px 0',
                }}
              >
                Key Skills
              </h3>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 10.5 }}>
                {skills.map((s: any, i: number) => (
                  <li key={i} style={{ marginBottom: 4 }}>
                    {s.name}
                  </li>
                ))}
              </ul>
            </section>
          </SectionValidator>
        );
      case 'awards':
        return (
          <SectionValidator value={data.awards}>
            <section>
              <h3
                style={{
                  fontFamily: serif,
                  fontSize: 12,
                  color: resumePalette.primary,
                  margin: '0 0 8px 0',
                }}
              >
                Certifications
              </h3>
              {data.awards.map((a: any) => (
                <div key={a.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
                  {a.title}
                  <div style={{ color: resumePalette.muted }}>{a.awarder}</div>
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  const renderMain = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <SectionValidator value={basics.summary}>
            <section style={{ marginTop: 18, marginBottom: 14 }}>
              <SectionHeading title="Summary" p={resumePalette} variant="line" />
              <RichText html={basics.summary} p={resumePalette} />
            </section>
          </SectionValidator>
        );
      case 'work':
        return (
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Professional Experience" p={resumePalette} variant="line" />
              {data.work.map((w: any) => (
                <div key={w.id} style={{ marginBottom: 10 }}>
                  <JobHeader
                    position={w.position}
                    company={w.name}
                    date={formatDateRange(w.startDate, w.endDate, w.isWorkingHere)}
                    p={resumePalette}
                  />
                  <RichText html={w.summary} p={resumePalette} />
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      case 'involvements':
        return (
          <SectionValidator value={data.activities?.involvements}>
            <section>
              <SectionHeading title="Academic Projects" p={resumePalette} variant="line" />
              <RichText html={data.activities.involvements} p={resumePalette} />
            </section>
          </SectionValidator>
        );
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
        <h1 style={{ fontFamily: serif, fontSize: 28, margin: 0, color: resumePalette.primary }}>
          {basics.name}
        </h1>
        <div style={{ fontSize: 12, color: resumePalette.muted, marginTop: 4 }}>{basics.label}</div>
        <div style={{ fontSize: 10.5, marginTop: 8, color: resumePalette.text }}>
          {[basics.email, basics.phone, basics.location?.city].filter(Boolean).join(' · ')}
        </div>
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
