import { useContext } from 'react';
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from 'react-icons/bs';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ChipList, ContactLine, RichText, SectionHeading, formatDateRange } from './atoms';
import { H1, JobHeader, Label, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function ClassicTemplate() {
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <SectionValidator value={basics.summary}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Profile" p={resumePalette} variant="underline" />
              <RichText html={basics.summary} p={resumePalette} />
            </section>
          </SectionValidator>
        );
      case 'work':
        return (
          <SectionValidator value={data.work}>
            <section style={{ marginBottom: 14 }}>
              <SectionHeading title="Experience" p={resumePalette} variant="underline" />
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
              <SectionHeading title="Education" p={resumePalette} variant="underline" />
              {data.education.map((e: any) => (
                <div key={e.id} style={{ marginBottom: 6 }}>
                  <div style={{ fontWeight: 600 }}>
                    {e.studyType} — {e.area}
                  </div>
                  <div style={{ color: resumePalette.muted, fontSize: 10.5 }}>
                    {e.institution} · {e.startDate} – {e.endDate}
                  </div>
                </div>
              ))}
            </section>
          </SectionValidator>
        );
      case 'skills':
        return (
          <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
            <section>
              <SectionHeading title="Skills" p={resumePalette} variant="underline" />
              <ChipList
                items={data.skills.languages.concat(data.skills.frameworks, data.skills.tools)}
                p={resumePalette}
                variant="outline"
              />
            </section>
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ ...pageStyle(resumePalette), padding: '40px 48px' }}>
      <div
        style={{
          textAlign: 'center',
          borderBottom: `2px solid ${resumePalette.primary}`,
          paddingBottom: 14,
          marginBottom: 18,
        }}
      >
        <H1 p={resumePalette} size={30}>
          {basics.name}
        </H1>
        <Label p={resumePalette}>{basics.label}</Label>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 18,
            marginTop: 10,
            color: resumePalette.muted,
            fontSize: 10.5,
            flexWrap: 'wrap',
          }}
        >
          {basics.phone && <ContactLine icon={<BsTelephone />} text={basics.phone} />}
          {basics.email && <ContactLine icon={<BsEnvelope />} text={basics.email} />}
          {basics.location?.city && <ContactLine icon={<BsGeoAlt />} text={basics.location.city} />}
          {basics.url && <ContactLine icon={<BsGlobe />} text={basics.url} href={basics.url} />}
        </div>
      </div>
      <SortableRegion regionId="main" items={regions.main}>
        {(id) => (
          <SortableTemplateSection key={id} id={id}>
            {renderSection(id)}
          </SortableTemplateSection>
        )}
      </SortableRegion>
    </div>
  );
}
