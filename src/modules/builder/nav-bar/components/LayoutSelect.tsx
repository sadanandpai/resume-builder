import { useEffect, useState } from 'react';
import {
  Button,
  Slider,
  TextField,
  MenuItem,
  Stack,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  bounds,
  normalize,
  type StyleSettings,
  type Sides,
  type StyleGroup,
} from '@/helpers/resume-style/styles';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useTemplates } from '@/stores/useTemplate';
import { TEMPLATE_REGISTRY } from '@/templates/designs/registry/templates';

type NumericProps = {
  label: string;
  value: number;
  kind: keyof typeof bounds;
  unit?: string;
  onPreview: (value: number) => void;
  onCommit: (value: number) => void;
};
function Numeric({ label, value, kind, unit = 'px', onPreview, onCommit }: NumericProps) {
  const formatted = String(Number(value.toFixed(2)));
  const [draft, setDraft] = useState({ value, text: formatted });
  if (draft.value !== value) setDraft({ value, text: formatted });
  const text = draft.value === value ? draft.text : formatted;
  const setText = (text: string) => setDraft({ value, text });
  const [min, max, step] = bounds[kind];
  const commit = () => {
    if (text === formatted) return;
    const parsed = text.trim() === '' ? undefined : normalize(Number(text), kind);
    if (parsed === undefined) {
      setText(String(value));
      return;
    }
    setText(String(parsed));
    onCommit(parsed);
  };
  return (
    <Stack direction="row" spacing={2} sx={{ my: 1.5, alignItems: 'center' }}>
      <Slider
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(_, n) => onPreview(n as number)}
        onChangeCommitted={(_, n) => onCommit(n as number)}
        sx={{ flex: 1 }}
      />
      <TextField
        label={`${label}${unit ? ` (${unit})` : ''}`}
        size="small"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            commit();
            e.currentTarget.querySelector('input')?.blur();
          }
          if (e.key === 'Escape') setText(String(value));
        }}
        slotProps={{ htmlInput: { inputMode: 'decimal', 'aria-label': `${label} value` } }}
        sx={{ width: 155 }}
      />
    </Stack>
  );
}
export function LayoutSelect() {
  const store = useResumeStyleStore();
  const templateId = useTemplates((s) => s.activeTemplate.id);
  const defaults = TEMPLATE_REGISTRY[templateId]?.style ?? TEMPLATE_REGISTRY.modern.style;
  const settings = store.settings;
  const [linked, setLinked] = useState({ pageMargins: true, contentPadding: true });
  useEffect(() => {
    useResumeStyleStore.getState().hydrate();
    return () => useResumeStyleStore.getState().commit();
  }, []);
  const update = (next: StyleSettings, preview = false) =>
    preview ? store.preview(next) : store.commit(next);
  const numeric = (
    label: string,
    kind: keyof typeof bounds,
    value: number,
    build: (n: number) => StyleSettings,
    unit?: string
  ) => (
    <Numeric
      key={label}
      label={label}
      kind={kind}
      value={value}
      unit={unit}
      onPreview={(n) => update(build(n), true)}
      onCommit={(n) => update(build(n))}
    />
  );
  const group = (title: string, key: StyleGroup, content: React.ReactNode) => (
    <fieldset
      style={{ border: 0, borderTop: '1px solid #ddd', margin: '12px 0', padding: '12px 0 0' }}
    >
      <legend style={{ fontWeight: 600, paddingRight: 8 }}>{title}</legend>
      {content}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
        <Button size="small" onClick={() => store.resetGroup(key)}>
          Reset {title.toLowerCase()}
        </Button>
      </div>
    </fieldset>
  );
  const sides = (key: 'pageMargins' | 'contentPadding') => {
    const isMargin = key === 'pageMargins';
    const original = isMargin ? [0, 0, 0, 0] : defaults.padding;
    const values: Sides = settings[key] ?? {
      top: original[0],
      right: original[1],
      bottom: original[2],
      left: original[3],
    };
    const build = (side: keyof Sides, n: number) => ({
      ...useResumeStyleStore.getState().settings,
      [key]: linked[key] ? { top: n, right: n, bottom: n, left: n } : { ...values, [side]: n },
    });
    return (
      <>
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={linked[key]}
              onChange={(_, checked) => {
                if (checked)
                  store.commit({
                    ...settings,
                    [key]: {
                      top: values.top,
                      right: values.top,
                      bottom: values.top,
                      left: values.top,
                    },
                  });
                setLinked((s) => ({ ...s, [key]: checked }));
              }}
            />
          }
          label="Link sides"
        />
        {(linked[key] ? ['top'] : ['top', 'right', 'bottom', 'left']).map((side) =>
          numeric(
            linked[key] ? 'All sides' : side[0].toUpperCase() + side.slice(1),
            isMargin ? 'margin' : 'padding',
            values[side as keyof Sides],
            (n) => build(side as keyof Sides, n),
            isMargin ? 'mm' : 'px'
          )
        )}
      </>
    );
  };
  const density = settings.density === 'compact' ? 0.8 : settings.density === 'spacious' ? 1.2 : 1;
  const custom = !!settings.spacing || settings.typography?.lineHeight !== undefined;
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
      <h2 className="text-resume-800 font-bold text-lg">Customize resume layout</h2>
      <Stack direction="row" spacing={1} sx={{ my: 1 }}>
        <Button disabled={!store.past.length && !store.baseline} onClick={store.undo}>
          Undo
        </Button>
        <Button disabled={!store.future.length} onClick={store.redo}>
          Redo
        </Button>
        <Button onClick={store.reset}>Reset styling</Button>
      </Stack>
      <TextField
        select
        fullWidth
        size="small"
        label="Spacing preset"
        value={custom ? 'custom' : (settings.density ?? 'balanced')}
        onChange={(e) => store.preset(e.target.value as 'compact' | 'balanced' | 'spacious')}
      >
        <MenuItem value="compact">Compact</MenuItem>
        <MenuItem value="balanced">Balanced (template defaults)</MenuItem>
        <MenuItem value="spacious">Spacious</MenuItem>
        <MenuItem value="custom" disabled>
          Custom
        </MenuItem>
      </TextField>
      <p className="text-xs text-gray-600 mt-3">
        Page margins leave blank paper outside the template background. Internal padding adds space
        inside the template around its content. Unchanged controls use template defaults. Where
        defaults vary by content area, displayed values represent the primary content; editing
        applies globally.
      </p>
      {group('Page margins', 'pageMargins', sides('pageMargins'))}
      {group('Internal padding', 'contentPadding', sides('contentPadding'))}
      {group(
        'Spacing',
        'spacing',
        <>
          {(['section', 'entry', 'column'] as const)
            .filter((key) => key !== 'column' || defaults.secondaryColumnPercent !== undefined)
            .map((key) =>
              numeric(
                key === 'section'
                  ? 'Between sections'
                  : key === 'entry'
                    ? 'Between entries'
                    : 'Between columns',
                key,
                settings.spacing?.[key] ?? Math.min(40, defaults[key] * density),
                (n) => ({
                  ...useResumeStyleStore.getState().settings,
                  spacing: { ...useResumeStyleStore.getState().settings.spacing, [key]: n },
                })
              )
            )}
        </>
      )}
      {group(
        'Typography',
        'typography',
        <>
          <TextField
            select
            size="small"
            fullWidth
            label="Font family"
            value={settings.typography?.family ?? 'default'}
            onChange={(e) => {
              const typography = { ...settings.typography };
              if (e.target.value === 'default') delete typography.family;
              else typography.family = e.target.value as 'sans' | 'serif' | 'mono';
              store.commit({ ...settings, typography });
            }}
          >
            <MenuItem value="default">Template default</MenuItem>
            <MenuItem value="sans">Sans serif</MenuItem>
            <MenuItem value="serif">Serif</MenuItem>
            <MenuItem value="mono">Monospace</MenuItem>
          </TextField>
          {(['body', 'heading', 'name', 'lineHeight'] as const).map((key) =>
            numeric(
              key === 'body'
                ? 'Body size'
                : key === 'heading'
                  ? 'Section heading size'
                  : key === 'name'
                    ? 'Name size'
                    : 'Line height',
              key,
              settings.typography?.[key] ??
                (key === 'lineHeight'
                  ? defaults[key] *
                    (settings.density === 'compact'
                      ? 0.95
                      : settings.density === 'spacious'
                        ? 1.05
                        : 1)
                  : defaults[key]),
              (n) => ({
                ...useResumeStyleStore.getState().settings,
                typography: { ...useResumeStyleStore.getState().settings.typography, [key]: n },
              }),
              key === 'lineHeight' ? '' : 'px'
            )
          )}
        </>
      )}
      {defaults.secondaryColumnPercent !== undefined &&
        group(
          'Columns',
          'secondaryColumnPercent',
          numeric(
            'Secondary column',
            'secondaryColumnPercent',
            settings.secondaryColumnPercent ?? defaults.secondaryColumnPercent,
            (n) => ({ ...useResumeStyleStore.getState().settings, secondaryColumnPercent: n }),
            '%'
          )
        )}
    </div>
  );
}
