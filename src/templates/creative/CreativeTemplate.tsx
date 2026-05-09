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
import { useResumePalette, withAlpha } from './resumePalette';

export default function CreativeTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;

  const renderSidebar = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        return (
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section style={{ marginBottom: 12 }}>
              <SectionHeading title="Skills" p={resumePalette} variant="bar" />
              {data.skills.languages.concat(data.skills.frameworks).map((s: any, i: number) => (
                <SkillBar key={i} name={s.name} level={s.level} p={resumePalette} />
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

  const renderMain = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <SectionValidator value={basics.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="About Me" p={resumePalette} variant="bar" />
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
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette) }}>
      <header style={{ position: 'relative', padding: '36px 36px 22px', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: withAlpha(resumePalette.accent, 0.2),
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 30,
            right: 120,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: withAlpha(resumePalette.primary, 0.15),
          }}
        />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 18 }}>
          <ProfileAvatar
            src={basics.image}
            size={90}
            radius="16px"
            border={`3px solid ${resumePalette.accent}`}
          />
          <div>
            <H1 p={resumePalette} size={30}>
              {basics.name}
            </H1>
            <Label p={resumePalette} color={resumePalette.accent}>
              {basics.label}
            </Label>
          </div>
        </div>
      </header>
      <div
        style={{ display: 'grid', gridTemplateColumns: '38% 1fr', padding: '0 36px 30px', gap: 24 }}
      >
        <aside>
          <section
            style={{
              background: withAlpha(resumePalette.primary, 0.08),
              padding: 14,
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
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
          </section>
          <SortableRegion regionId="sidebar" items={regions.sidebar}>
            {(id) => (
              <SortableTemplateSection key={id} id={id}>
                {renderSidebar(id) ?? renderMain(id)}
              </SortableTemplateSection>
            )}
          </SortableRegion>
        </aside>
        <main>
          <SortableRegion regionId="main" items={regions.main}>
            {(id) => (
              <SortableTemplateSection key={id} id={id}>
                {renderMain(id) ?? renderSidebar(id)}
              </SortableTemplateSection>
            )}
          </SortableRegion>
        </main>
      </div>
    </div>
  );
}
