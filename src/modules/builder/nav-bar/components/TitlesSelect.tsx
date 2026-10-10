import { Button, Stack, TextField } from '@mui/material';
import { getAllowedSectionIdsForTemplate } from '@/helpers/section-layout/allowedSections';
import { TEMPLATE_SECTION_TITLES } from '@/helpers/section-layout/sectionTitles';
import { useResumeStore } from '@/stores/useResumeStore';
import { useSectionTitleStore, useTemplateTitles } from '@/stores/useSectionTitleStore';
import { useTemplates } from '@/stores/useTemplate';

export function TitlesSelect() {
  const template = useTemplates((state) => state.activeTemplate);
  const resumeData = useResumeStore();
  const titles = useTemplateTitles(template.id);
  const setTitle = useSectionTitleStore((state) => state.setTitle);
  const resetTemplate = useSectionTitleStore((state) => state.resetTemplate);
  const allowed = getAllowedSectionIdsForTemplate(template.id, resumeData);
  const defaults = TEMPLATE_SECTION_TITLES[template.id] ?? {};

  return (
    <div
      className="bg-white shadow-2xl"
      style={{
        width: 475,
        maxWidth: '100vw',
        maxHeight: 'calc(100dvh - 90px)',
        overflowY: 'auto',
        padding: '24px 36px',
      }}
    >
      <h2 className="text-resume-800 font-bold text-lg">Customize resume titles</h2>
      <p className="text-xs text-gray-600 mt-3 mb-5">
        Edit the section headings for your {template.name} template. Changes are saved
        automatically.
      </p>
      <Stack spacing={2}>
        {Object.entries(defaults)
          .filter(([id]) => allowed.has(id))
          .map(([id, label]) => (
            <TextField
              key={`${template.id}-${id}`}
              label={label}
              size="small"
              fullWidth
              value={titles[id]}
              onChange={(event) => setTitle(template.id, id, event.target.value)}
            />
          ))}
        {!allowed.size && <p>Add resume content to customize its section titles.</p>}
        <Button onClick={() => resetTemplate(template.id)}>Reset titles</Button>
      </Stack>
    </div>
  );
}
