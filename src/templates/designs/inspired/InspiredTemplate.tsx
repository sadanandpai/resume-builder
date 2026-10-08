import { EditableResumeSection } from '@/helpers/common/components/EditableResumeSection';
import { columns, padding, spacing } from '@/helpers/resume-style/styles';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette, withAlpha } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { CompactEducation } from '@/templates/components/education';
import { StandardExperience } from '@/templates/components/experience';
import { CardProfile } from '@/templates/components/profile';
import { BarSkills } from '@/templates/components/skills';
import { TextSection } from '@/templates/components/text';

export default function InspiredTemplate() {
  const secondaryPercent = useResumeStyleStore((state) => state.settings.secondaryColumnPercent);
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const renderSection = (id: string) => {
    switch (id) {
      case 'summary':
        return <TextSection html={basics.summary} />;
      case 'work':
        return <StandardExperience items={data.work} />;
      case 'education':
        return <CompactEducation items={data.education} />;
      case 'skills':
        return (
          <BarSkills
            items={data.skills.languages.concat(data.skills.frameworks)}
            title="Key Skills"
          />
        );
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="standard">
      <div style={{ ...pageStyle(resumePalette), position: 'relative', overflow: 'hidden' }}>
        <EditableResumeSection id="basics">
          <CardProfile basics={basics} />
        </EditableResumeSection>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: columns('minmax(0, 1fr) 36%', false, secondaryPercent),
            gap: spacing('column', 20),
            padding: padding('8px 32px 28px'),
            position: 'relative',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
          </div>
          <aside
            style={{
              background: withAlpha(resumePalette.primary, 0.08),
              padding: 16,
              borderRadius: 10,
            }}
          >
            <TemplateRegion
              surface="tinted"
              regionId="sidebar"
              items={regions.sidebar}
              renderSection={renderSection}
            />
          </aside>
        </div>
      </div>
    </ResumePresentation>
  );
}
