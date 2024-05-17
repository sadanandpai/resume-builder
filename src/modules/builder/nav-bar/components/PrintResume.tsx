import { FC, useEffect } from 'react';
import { StyledButton } from '../atoms';
import { asBlob } from 'html-docx-js-typescript';

type P = {
  format: 'doc' | 'pdf';
};

export const PrintResume: FC<P> = ({ format }) => {
  useEffect(() => {
    globalThis?.addEventListener('beforeprint', () => {
      globalThis.document.title = `Resume_Builder_${Date.now()}`;
    });

    globalThis?.addEventListener('afterprint', () => {
      globalThis.document.title = 'Single Page Resume Builder';
    });
  }, []);

  const downloadDocs = () => {
    const data = globalThis.document.getElementById('resume')?.innerHTML || '';
    asBlob(data).then((inBlob) => {
      let blob;
      if (inBlob instanceof Buffer) {
        blob = new Blob([inBlob.buffer], { type: 'application/octet-stream' });
      } else {
        blob = inBlob;
      }
      const fileName = `Resume_${Date.now()}.docx`;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  };

  const downloadFunction = format === 'pdf' ? globalThis?.print : downloadDocs;
  const buttonText = format === 'pdf' ? 'Download as PDF' : 'Download as DOCX';
  return (
    <StyledButton onClick={downloadFunction} variant="outlined">
      {buttonText}
    </StyledButton>
  );
};
