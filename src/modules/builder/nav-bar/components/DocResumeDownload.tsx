import { useEffect } from 'react';
import { StyledButton } from '../atoms';
import htmlDocx from 'html-docx-js/dist/html-docx';

export const DocResumeDownload = () => {
  const handleDownloadDoc = () => {
    const resumeContent = document.getElementById('resume-content'); // Adjust the ID according to your actual content
    const fileName = `Resume_Builder_${Date.now()}.doc`;

    const content = resumeContent.innerHTML;

    const converted = htmlDocx.asBlob(content, { orientation: 'portrait' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(converted);
    link.download = fileName;
    link.click();
  };

  return (
    <StyledButton onClick={handleDownloadDoc} variant="outlined">
      Download as DOC
    </StyledButton>
  );
};
