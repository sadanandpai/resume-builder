'use client';

import CircularProgress from '@mui/material/CircularProgress';

export function ResumeLoading() {
  return (
    <div role="status" className="flex min-h-screen flex-col items-center justify-center gap-3">
      <CircularProgress size={32} color="inherit" aria-hidden="true" />
      <span>Loading resume…</span>
    </div>
  );
}
