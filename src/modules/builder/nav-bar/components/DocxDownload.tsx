import { useEffect } from 'react';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';
import { StyledButton } from '../atoms';

export const DocxDownload = () => {
  const downloadResumeAsDocx = async () => {
    const resumeContent = document.getElementById('content');
    const content = resumeContent?.innerHTML || '';
    const data = await asBlob(content);
    let converted;
    if (data instanceof Buffer) {
      converted = new Blob([data?.buffer], { type: 'application/octet-stream' });
    } else {
      converted = data;
    }
    saveAs(converted, `Resume_Builder_${Date.now()}`);
  };

  return (
    <StyledButton onClick={downloadResumeAsDocx} variant="outlined">
      Download as Docx
    </StyledButton>
  );
};
