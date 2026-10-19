'use client';

import {
  draftStorage,
  readDraft,
  readDraftBaseline,
  replaceDraftCurrent,
  saveDraftBaseline,
} from '@/stores/resumeDraftStorage';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useBasicDetails } from '@/stores/basic';
import { useExperiences } from '@/stores/experience';
import { useEducations } from '@/stores/education';
import { useAwards } from '@/stores/awards';
import { useVoluteeringStore } from '@/stores/volunteering';
import { useActivity } from '@/stores/activity';
import {
  useLanguages,
  useFrameworks,
  useTechnologies,
  useLibraries,
  useDatabases,
  usePractices,
  useTools,
} from '@/stores/skills';
import { useThemes } from '@/stores/themes';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useSectionTitleStore } from '@/stores/useSectionTitleStore';
import { restoreSavedTemplate } from '@/stores/useTemplate';
import { ResumeLoading } from './ResumeLoading';

import { applyImportedResumeJson } from './nav-bar/applyImportedResume';
import { useCloudResumeStore } from '@/stores/useCloudResumeStore';

export type SavedResume = { id: string; data?: unknown; error?: string; code?: string | null };

const ReadyContext = createContext(false);
let hydration: Promise<void> | undefined;

// Shared across mounts and Strict Mode replay. Re-entering the builder must not
// restore old storage over live edits. None of this runs during server rendering.
export function hydrateBuilderState(force = false): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (force) {
    hydration = undefined;
    useResumeStyleStore.setState({ hydrated: false, past: [], future: [], baseline: null });
    useSectionTitleStore.setState({ hydrated: false });
  }
  if (!hydration) {
    const stores = [
      useBasicDetails,
      useExperiences,
      useEducations,
      useAwards,
      useVoluteeringStore,
      useActivity,
      useLanguages,
      useFrameworks,
      useTechnologies,
      useLibraries,
      useDatabases,
      usePractices,
      useTools,
      useThemes,
      useSectionLayoutStore,
    ];
    hydration = Promise.allSettled(stores.map((store) => store.persist.rehydrate())).then(() => {
      useResumeStyleStore.getState().hydrate();
      useSectionTitleStore.getState().hydrate();
      restoreSavedTemplate();
      // Include unchanged defaults too, so the document is a complete draft.
      for (const store of stores) (store.setState as (partial: object) => unknown)({});
      draftStorage.setItem(
        'resumeStyles',
        JSON.stringify({ version: 1, settings: useResumeStyleStore.getState().settings })
      );
      draftStorage.setItem(
        'resumeSectionTitles',
        JSON.stringify({ version: 1, titles: useSectionTitleStore.getState().titles })
      );
    });
  }
  return hydration;
}

export function useBuilderStateReady() {
  return useContext(ReadyContext);
}

export function BuilderStateHydration({
  children,
  savedResume,
}: {
  children: ReactNode;
  savedResume?: SavedResume;
}) {
  const [loaded, setLoaded] = useState<{ source: SavedResume | undefined }>();
  const [failure, setFailure] = useState<{ source: SavedResume | undefined; message: string }>();
  const error = failure?.source === savedResume ? failure?.message : undefined;
  const ready = loaded !== undefined && loaded.source === savedResume;
  useEffect(() => {
    let active = true;
    void hydrateBuilderState().then(async () => {
      if (!active) return;
      try {
        if (savedResume?.error) throw new Error(savedResume.error);
        if (savedResume) {
          const draft = readDraft();
          const baseline = readDraftBaseline(savedResume.id);
          const hasLocalEdits =
            !!savedResume.code &&
            draft.resumeId === savedResume.id &&
            !!baseline &&
            JSON.stringify(draft.current) !== JSON.stringify(baseline);
          // Refresh the reset target even when an unsaved local draft is kept.
          applyImportedResumeJson(savedResume.data);
          saveDraftBaseline(savedResume.id);
          if (hasLocalEdits && replaceDraftCurrent(savedResume.id, draft.current)) {
            await hydrateBuilderState(true);
          }
          if (!active) return;
          useCloudResumeStore.getState().setId(savedResume.id, savedResume.code);
        }
        setLoaded({ source: savedResume });
      } catch (cause) {
        setFailure({
          source: savedResume,
          message: cause instanceof Error ? cause.message : 'Could not load resume.',
        });
      }
    });
    return () => {
      active = false;
    };
  }, [savedResume]);
  if (!ready) {
    if (!error) return <ResumeLoading />;
    return (
      <div role="alert" className="flex min-h-screen items-center justify-center">
        {error}
      </div>
    );
  }
  return <ReadyContext.Provider value={ready}>{children}</ReadyContext.Provider>;
}
