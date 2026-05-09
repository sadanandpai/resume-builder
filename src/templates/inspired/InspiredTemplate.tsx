import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillBar,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette, withAlpha } from './resumePalette';

export default function InspiredTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;

  const renderMain = (sectionId: string) => {
    switch (sectionId) {
      case 'work':
        return (
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Professional Experience" p={resumePalette} variant="bar" />
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
      case 'education':
        return (
          <SectionValidator value={data.education}>
            <section>
              <SectionHeading title="Education" p={resumePalette} variant="bar" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
                  <strong>{e.studyType}</strong> — {e.area}
                  <div style={{ color: resumePalette.muted }}>{e.institution}</div>
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  const renderSidebar = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <SectionValidator value={basics.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Summary" p={resumePalette} variant="bar" />
              <RichText html={basics.summary} p={resumePalette} />
            </section>
          </SectionValidator>
        );
      case 'skills':
        return (
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section>
              <SectionHeading title="Key Skills" p={resumePalette} variant="bar" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillBar key={i} name={s.name} level={s.level} p={resumePalette} />
              ))}
            </section>
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette), position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 220,
          height: 200,
          background: withAlpha(resumePalette.primary, 0.18),
          borderBottomRightRadius: '100%',
        }}
      />
      <header
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '28px 32px 16px',
        }}
      >
        <ProfileAvatar src={basics.image} size={84} border={`4px solid ${resumePalette.primary}`} />
        <div
          style={{
            flex: 1,
            background: resumePalette.primary,
            color: '#fff',
            padding: '16px 20px',
            borderRadius: 8,
          }}
        >
          <H1 p={resumePalette} size={24} color="#fff">
            {basics.name}
          </H1>
          <div style={{ fontSize: 11, opacity: 0.95, marginTop: 4 }}>{basics.label}</div>
          <div style={{ marginTop: 10, fontSize: 10 }}>
            <ContactBlock
              email={basics.email}
              phone={basics.phone}
              city={basics.location?.city}
              url={basics.url}
              inline
              color="#fff"
            />
          </div>
        </div>
      </header>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 36%',
          gap: 20,
          padding: '8px 32px 28px',
          position: 'relative',
        }}
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
        <aside
          style={{
            background: withAlpha(resumePalette.primary, 0.08),
            padding: 16,
            borderRadius: 10,
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
      </div>
    </div>
  );
}
