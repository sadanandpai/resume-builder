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
  SocialIconsRow,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, Label, pageStyle } from './layoutPrimitives';
import { mergeResumePalette, useResumePalette, withAlpha } from './resumePalette';

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
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <div>
              <SectionHeading title="Skills" p={side} variant="line" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillBar key={i} name={s.name} level={s.level} p={skillBarP} />
              ))}
            </div>
          </SectionValidator>
        );
      case 'education':
        return (
          <SectionValidator value={data.education}>
            <div>
              <SectionHeading title="Education" p={side} variant="line" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ marginBottom: 8, fontSize: 10.5 }}>
                  <div style={{ fontWeight: 600 }}>{e.studyType}</div>
                  <div style={{ opacity: 0.85 }}>{e.area}</div>
                  <div style={{ opacity: 0.7 }}>{e.institution}</div>
                  <div style={{ opacity: 0.6 }}>
                    {e.startDate} – {e.endDate}
                  </div>
                </div>
              ))}
            </div>
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
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Profile" p={resumePalette} variant="bar" />
              <RichText html={basics.summary} p={resumePalette} />
            </section>
          </SectionValidator>
        );
      case 'work':
        return (
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 14 }}>
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
      case 'awards':
        return (
          <SectionValidator value={data.activities?.achievements}>
            <section>
              <SectionHeading title="Awards" p={resumePalette} variant="bar" />
              <RichText html={data.activities.achievements} p={resumePalette} />
            </section>
          </SectionValidator>
        );
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
        <ProfileAvatar src={basics.image} size={96} border={`3px solid ${resumePalette.accent}`} />
        <div>
          <SectionHeading title="Contact" p={side} variant="line" />
          <ContactBlock
            email={basics.email}
            phone={basics.phone}
            city={basics.location?.city}
            url={basics.url}
            color={resumePalette.sidebarText}
          />
          <div style={{ marginTop: 10 }}>
            <SocialIconsRow profiles={basics.profiles} color={resumePalette.sidebarText} />
          </div>
        </div>
        <SortableRegion regionId="sidebar" items={regions.sidebar}>
          {(id) => (
            <SortableTemplateSection key={id} id={id}>
              {renderSidebar(id) ?? renderMain(id)}
            </SortableTemplateSection>
          )}
        </SortableRegion>
      </aside>
      <main style={{ padding: '32px 28px' }}>
        <H1 p={resumePalette} size={28}>
          {basics.name}
        </H1>
        <Label p={resumePalette}>{basics.label}</Label>
        <div style={{ height: 2, width: 48, background: resumePalette.accent, margin: '12px 0' }} />
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
