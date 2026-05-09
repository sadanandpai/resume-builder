import { useContext } from 'react';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import {
  ChipList,
  ContactBlock,
  ProfileAvatar,
  RichText,
  SectionHeading,
  SkillBar,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function HeaderBandTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;

  const renderMain = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <SectionValidator value={basics.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="About" p={resumePalette} variant="bar" />
              <RichText html={basics.summary} p={resumePalette} />
            </section>
          </SectionValidator>
        );
      case 'work':
        return (
          <SectionValidator value={data.work}>
            <section>
              <SectionHeading title="Experience" p={resumePalette} variant="bar" />
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
      default:
        return null;
    }
  };

  const renderSidebar = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        return (
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Skills" p={resumePalette} variant="bar" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillBar key={i} name={s.name} level={s.level} p={resumePalette} />
              ))}
            </section>
          </SectionValidator>
        );
      case 'tools':
        return (
          <SectionValidator value={data.skills.tools}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Tools" p={resumePalette} variant="bar" />
              <ChipList items={data.skills.tools} p={resumePalette} variant="soft" />
            </section>
          </SectionValidator>
        );
      case 'education':
        return (
          <SectionValidator value={data.education}>
            <section>
              <SectionHeading title="Education" p={resumePalette} variant="bar" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ marginBottom: 6, fontSize: 10.5 }}>
                  <div style={{ fontWeight: 600 }}>
                    {e.studyType} · {e.area}
                  </div>
                  <div style={{ color: resumePalette.muted }}>
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
    <div style={{ ...pageStyle(resumePalette) }}>
      <header
        style={{
          background: resumePalette.primary,
          color: '#fff',
          padding: '28px 36px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <ProfileAvatar src={basics.image} size={84} border={`3px solid ${resumePalette.accent}`} />
        <div style={{ flex: 1 }}>
          <H1 p={resumePalette} size={28} color="#fff">
            {basics.name}
          </H1>
          <div
            style={{
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: 0.9,
              marginTop: 4,
            }}
          >
            {basics.label}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <ContactBlock
            email={basics.email}
            phone={basics.phone}
            city={basics.location?.city}
            url={basics.url}
            color="#fff"
          />
        </div>
      </header>
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
