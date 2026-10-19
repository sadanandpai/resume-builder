import { draftStorage } from '@/stores/resumeDraftStorage';
import { describe, expect, it } from 'vitest';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import { useTemplates } from '@/stores/useTemplate';
import { useThemes } from '@/stores/themes';
import { useSectionTitleStore } from '@/stores/useSectionTitleStore';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useBasicDetails } from '@/stores/basic';
import { applyImportedResumeJson } from './applyImportedResume';
import { exportResumeMetadata } from './resumeMetadata';

describe('resume metadata', () => {
  it('round trips template, titles, colors, layout and styles through JSON', () => {
    useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES.modern);
    useSectionTitleStore.getState().setTitle('modern', 'education', 'My education');
    useSectionLayoutStore.getState().setLayout('modern', { main: ['education', 'work'] });
    useThemes.getState().updateCustomTheme({ titleColor: '#123456' });
    useResumeStyleStore
      .getState()
      .commit({ typography: { family: 'serif', body: 13 }, density: 'compact' });
    const metadata = JSON.parse(JSON.stringify(exportResumeMetadata()));
    useSectionTitleStore.getState().resetTemplate('modern');
    useSectionLayoutStore.getState().resetAll();
    useResumeStyleStore.getState().reset();
    useThemes.getState().updateCustomTheme({ titleColor: '#ffffff' });
    useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES.classic);
    applyImportedResumeJson({ basics: { name: 'Sam' }, __metadata: metadata });
    expect(exportResumeMetadata()).toEqual(metadata);
    expect(useBasicDetails.getState().values.name).toBe('Sam');
    expect(JSON.parse(draftStorage.getItem('resumeSectionTitles')!).titles.modern.education).toBe(
      'My education'
    );
    expect(draftStorage.getItem('selectedTemplateId')).toBe('modern');
  });

  it('keeps settings for legacy files and rejects unsupported metadata before changing content', () => {
    const before = exportResumeMetadata();
    applyImportedResumeJson({ basics: { name: 'Legacy' } });
    expect(exportResumeMetadata()).toEqual(before);
    expect(() =>
      applyImportedResumeJson({
        basics: { name: 'Invalid' },
        __metadata: { ...before, version: 2 },
      })
    ).toThrow();
    expect(useBasicDetails.getState().values.name).toBe('Legacy');
    expect(exportResumeMetadata()).toEqual(before);
  });
});
