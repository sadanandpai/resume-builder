import { MenuItem } from '@mui/material';
import { useEffect } from 'react';

import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';

import { StyledButton } from '../atoms';

export const PrintResume: React.FC<{ isMenuButton?: boolean }> = ({ isMenuButton }) => {
  useEffect(() => {
    const beforePrint = () => {
      globalThis.document.title = `Resume_Builder_${Date.now()}`;
      const { isReorderMode, setReorderMode } = useSectionLayoutStore.getState();
      if (isReorderMode) setReorderMode(false);
    };

    const afterPrint = () => {
      globalThis.document.title = 'Single Page Resume Builder';
    };

    globalThis?.addEventListener('beforeprint', beforePrint);
    globalThis?.addEventListener('afterprint', afterPrint);

    return () => {
      globalThis?.removeEventListener('beforeprint', beforePrint);
      globalThis?.removeEventListener('afterprint', afterPrint);
    };
  }, []);

  const runPrint = () => {
    const { isReorderMode, setReorderMode } = useSectionLayoutStore.getState();
    if (isReorderMode) {
      setReorderMode(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => globalThis?.print?.());
      });
      return;
    }
    globalThis?.print?.();
  };

  if (isMenuButton) {
    return <MenuItem onClick={runPrint}>Download as PDF</MenuItem>;
  }

  return (
    <StyledButton onClick={runPrint} variant="outlined">
      Download as PDF
    </StyledButton>
  );
};
