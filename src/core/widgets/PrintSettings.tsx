import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useIntro } from 'src/stores/data.store';
import { getIcon } from 'src/styles/icons';

const IconWrapper = styled.div`
  outline-color: transparent;
  margin-bottom: 1rem;
`;

const IconButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 40px;
  background: transparent;
  border: 0;
  border-radius: 2px;
  padding: 0;
  color: rgb(230, 230, 230);
`;

export function PrintSettings() {
  const intro = useIntro((state: any) => state.intro);

  useEffect(() => {
    globalThis?.addEventListener('beforeprint', () => {
      globalThis.document.title = `Resume_${intro.name}_${intro.label}_${intro.totalExp}`
        .split(' ')
        .join('_');
    });

    globalThis?.addEventListener('afterprint', () => {
      globalThis.document.title = 'Single Page Resume Builder';
    });
  }, [intro]);

  return (
    <IconWrapper>
      <IconButton onClick={globalThis?.print}>{getIcon('print')}</IconButton>
    </IconWrapper>
  );
}
