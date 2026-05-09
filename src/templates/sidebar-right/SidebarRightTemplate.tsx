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
  SkillDots,
  SocialIconsRow,
  formatDateRange,
} from './atoms';
import { H1, JobHeader, Label, pageStyle } from './layoutPrimitives';
import { useResumePalette, withAlpha } from './resumePalette';

export default function SidebarRightTemplate() {
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
              <SectionHeading title="Summary" p={resumePalette} variant="bar" />
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
      case 'projects':
        return (
          <SectionValidator value={data.activities?.involvements}>
            <section>
              <SectionHeading title="Key Projects" p={resumePalette} variant="bar" />
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
      case 'skills':
        return (
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <div style={{ marginTop: 16 }}>
              <SectionHeading title="Skills" p={resumePalette} variant="bar" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillDots key={i} name={s.name} level={s.level} p={resumePalette} />
              ))}
            </div>
          </SectionValidator>
        );
      case 'education':
        return (
          <SectionValidator value={data.education}>
            <div style={{ marginTop: 16 }}>
              <SectionHeading title="Education" p={resumePalette} variant="bar" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ marginBottom: 8, fontSize: 10.5 }}>
                  <div style={{ fontWeight: 600 }}>
                    {e.studyType} · {e.area}
                  </div>
                  <div style={{ color: resumePalette.muted }}>{e.institution}</div>
                  <div style={{ color: resumePalette.muted }}>
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

  return (
    <div style={{ ...pageStyle(resumePalette), display: 'grid', gridTemplateColumns: '1fr 32%' }}>
      <main style={{ padding: '34px 28px' }}>
        <H1 p={resumePalette} size={28}>
          {basics.name}
        </H1>
        <Label p={resumePalette}>{basics.label}</Label>
        <div
          style={{
            height: 3,
            width: 56,
            background: resumePalette.accent,
            margin: '12px 0 18px 0',
          }}
        />
        <SortableRegion regionId="main" items={regions.main}>
          {(id) => (
            <SortableTemplateSection key={id} id={id}>
              {renderMain(id) ?? renderSidebar(id)}
            </SortableTemplateSection>
          )}
        </SortableRegion>
      </main>
      <aside
        style={{
          background: withAlpha(resumePalette.primary, 0.06),
          padding: '34px 22px',
          borderLeft: `4px solid ${resumePalette.accent}`,
        }}
      >
        <ProfileAvatar src={basics.image} size={88} />
        <div style={{ marginTop: 12 }}>
          <SectionHeading title="Contact" p={resumePalette} variant="bar" />
          <ContactBlock
            email={basics.email}
            phone={basics.phone}
            city={basics.location?.city}
            url={basics.url}
          />
          <div style={{ marginTop: 8 }}>
            <SocialIconsRow profiles={basics.profiles} color={resumePalette.primary} />
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
    </div>
  );
}
