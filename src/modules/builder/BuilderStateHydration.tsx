'use client';

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

const ReadyContext = createContext(false);
let hydration: Promise<void> | undefined;

// Shared across mounts and Strict Mode replay. Re-entering the builder must not
// restore old storage over live edits. None of this runs during server rendering.
export function hydrateBuilderState(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
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
    });
  }
  return hydration;
}

export function useBuilderStateReady() {
  return useContext(ReadyContext);
}

export function BuilderStateHydration({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    void hydrateBuilderState().then(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);
  return <ReadyContext.Provider value={ready}>{children}</ReadyContext.Provider>;
}
