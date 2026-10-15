'use client';

import { useCloudResumeStore } from '@/stores/useCloudResumeStore';
import { useEffect, type RefObject } from 'react';
import { usePathname } from 'next/navigation';
import { useBuilderStateReady } from '../BuilderStateHydration';
import { applyImportedResumeJson } from './applyImportedResume';

export function ImportSavedResume({
  controllerRef,
  onResult,
}: {
  controllerRef: RefObject<AbortController | null>;
  onResult: (message: string) => void;
}) {
  const pathname = usePathname();
  const ready = useBuilderStateReady();
  useEffect(() => {
    const id = pathname?.match(/^\/builder\/([^/]+)\/?$/)?.[1];
    if (!ready || !id) return;
    const controller = new AbortController();
    controllerRef.current?.abort();
    controllerRef.current = controller;
    let active = true;
    const current = () =>
      active && !controller.signal.aborted && window.location.pathname === pathname;
    void (async () => {
      try {
        const response = await fetch(`/api/resumes/${encodeURIComponent(id)}`, {
          signal: controller.signal,
          cache: 'no-store',
        });
        const data = await response.json();
        if (!current()) return;
        if (!response.ok) throw new Error(data.error || 'Could not load resume.');
        applyImportedResumeJson(data);
        useCloudResumeStore.getState().setId(id);
        onResult('Saved resume loaded successfully.');
      } catch (error) {
        if (current()) onResult(error instanceof Error ? error.message : 'Could not load resume.');
      }
    })();
    return () => {
      active = false;
      controller.abort();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [ready, pathname, controllerRef, onResult]);
  return null;
}
