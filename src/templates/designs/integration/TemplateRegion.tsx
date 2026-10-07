import type { ComponentProps } from 'react';
import { SortableRegion, SortableTemplateSection } from '@/helpers/section-layout';
import { ResumeSurface, useSurfacePalette, type Surface } from '../../components/theme';

/** Keep layout/editor dependencies outside the visual collection. */
export function TemplateRegion({
  surface = 'page',
  renderSection,
  ...props
}: Omit<ComponentProps<typeof SortableRegion>, 'children'> & {
  surface?: Surface;
  renderSection: (id: string) => React.ReactNode;
}) {
  return (
    <ResumeSurface surface={surface}>
      <RegionContents {...props} renderSection={renderSection} />
    </ResumeSurface>
  );
}

function RegionContents({
  renderSection,
  ...props
}: Omit<ComponentProps<typeof SortableRegion>, 'children'> & {
  renderSection: (id: string) => React.ReactNode;
}) {
  const palette = useSurfacePalette();
  return (
    <SortableRegion
      {...props}
      style={{ minWidth: 0, color: palette.text, background: palette.bg, ...props.style }}
    >
      {(id) => (
        <SortableTemplateSection key={id} id={id}>
          {renderSection(id)}
        </SortableTemplateSection>
      )}
    </SortableRegion>
  );
}
