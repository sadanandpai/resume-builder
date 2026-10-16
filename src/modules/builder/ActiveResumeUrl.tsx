'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCloudResumeStore } from '@/stores/useCloudResumeStore';

// Restore the active resume's URL without fetching saved data over local edits.
export function ActiveResumeUrl() {
  const id = useCloudResumeStore((state) => state.id);
  const code = useCloudResumeStore((state) => state.code);
  const pathname = usePathname();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!/^\/builder(?:\/[^/]+)?\/?$/.test(url.pathname)) return;
    const nextPath = id ? `/builder/${encodeURIComponent(id)}` : '/builder';
    const previous = url.pathname + url.search + url.hash;
    const sameResume = url.pathname === nextPath;
    url.pathname = nextPath;
    if (code) url.searchParams.set('code', code);
    else if (!id || !sameResume) url.searchParams.delete('code');
    const next = url.pathname + url.search + url.hash;
    if (previous !== next) window.history.replaceState(null, '', next);
  }, [id, code, pathname]);

  return null;
}
