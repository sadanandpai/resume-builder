'use client';

import { useEffect, type RefObject } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useBuilderStateReady } from '../BuilderStateHydration';
import { fetchAndApplyResumeFromUrl, formatImportUrlError } from './fetchResumeFromUrl';

type Props = {
  controllerRef: RefObject<AbortController | null>;
  onResult: (message: string) => void;
};

export function ImportResumeFromQuery({ controllerRef, onResult }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const importUrl = searchParams?.get('importUrl');
  const ready = useBuilderStateReady();

  useEffect(() => {
    if (!ready || !importUrl) return;
    let active = true;
    const controller = new AbortController();
    controllerRef.current?.abort();
    controllerRef.current = controller;
    const isCurrent = () => {
      const live = new URL(window.location.href);
      return (
        active &&
        !controller.signal.aborted &&
        live.pathname === pathname &&
        live.searchParams.get('importUrl') === importUrl
      );
    };

    void (async () => {
      try {
        await fetchAndApplyResumeFromUrl(importUrl, controller.signal, isCurrent);
        if (!isCurrent()) return;
        onResult('Resume data was successfully imported.');
      } catch (error) {
        if (!isCurrent()) return;
        onResult(formatImportUrlError(error));
      }
      if (!isCurrent()) return;
      const live = new URL(window.location.href);
      live.searchParams.delete('importUrl');
      window.history.replaceState(null, '', live.pathname + live.search + live.hash);
    })();

    return () => {
      active = false;
      controller.abort();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [ready, importUrl, pathname, controllerRef, onResult]);

  return null;
}
