import { useContext } from 'react';
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from 'react-icons/bs';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { ChipList, ContactLine, RichText, SectionHeading, formatDateRange } from './atoms';
import { H1, JobHeader, Label, pageStyle } from './layoutPrimitives';
import { useResumePalette } from './resumePalette';

export default function ClassicTemplate() {
  const data = useContext(StateContext);
  const p = useResumePalette();
  const b = data.basics;

  return (
    <div style={{ ...pageStyle(p), padding: '40px 48px' }}>
      <div
        style={{
          textAlign: 'center',
          borderBottom: `2px solid ${p.primary}`,
          paddingBottom: 14,
          marginBottom: 18,
        }}
      >
        <H1 p={p} size={30}>
          {b.name}
        </H1>
        <Label p={p}>{b.label}</Label>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 18,
            marginTop: 10,
            color: p.muted,
            fontSize: 10.5,
            flexWrap: 'wrap',
          }}
        >
          {b.phone && <ContactLine icon={<BsTelephone />} text={b.phone} />}
          {b.email && <ContactLine icon={<BsEnvelope />} text={b.email} />}
          {b.location?.city && <ContactLine icon={<BsGeoAlt />} text={b.location.city} />}
          {b.url && <ContactLine icon={<BsGlobe />} text={b.url} href={b.url} />}
        </div>
      </div>
      <SectionValidator value={b.summary}>
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="Profile" p={p} variant="underline" />
          <RichText html={b.summary} p={p} />
        </section>
      </SectionValidator>
      <SectionValidator value={data.work}>
        <section style={{ marginBottom: 14 }}>
          <SectionHeading title="Experience" p={p} variant="underline" />
          {data.work.map((w: any) => (
            <div key={w.id} style={{ marginBottom: 10 }}>
              <JobHeader
                position={w.position}
                company={w.name}
                date={formatDateRange(w.startDate, w.endDate, w.isWorkingHere)}
                p={p}
              />
              <RichText html={w.summary} p={p} />
            </div>
          ))}
        </section>
      </SectionValidator>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <SectionValidator value={data.education}>
          <section>
            <SectionHeading title="Education" p={p} variant="underline" />
            {data.education.map((e: any) => (
              <div key={e.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>
                  {e.studyType} — {e.area}
                </div>
                <div style={{ color: p.muted, fontSize: 10.5 }}>
                  {e.institution} · {e.startDate} – {e.endDate}
                </div>
              </div>
            ))}
          </section>
        </SectionValidator>
        <SectionValidator value={data.skills.languages.concat(data.skills.frameworks)}>
          <section>
            <SectionHeading title="Skills" p={p} variant="underline" />
            <ChipList
              items={data.skills.languages.concat(data.skills.frameworks, data.skills.tools)}
              p={p}
              variant="outline"
            />
          </section>
        </SectionValidator>
      </div>
    </div>
  );
}
