import { useEffect } from 'react';
import { useTemplates } from 'src/stores/useTemplate';
import { StyledButton } from '../atoms';
import { saveAs } from 'file-saver';
import HTMLtoDOCX from 'html-to-docx';

export const PrintResume = () => {
  const templateIndex = useTemplates((state) => state.activeTemplate.id);

  useEffect(() => {
    globalThis?.addEventListener('beforeprint', () => {
      globalThis.document.title = `Resume_Builder_${Date.now()}`;
    });

    globalThis?.addEventListener('afterprint', () => {
      globalThis.document.title = 'Single Page Resume Builder';
    });
  }, []);

  const downloadAsPDF = () => {
    globalThis?.print();
  };

  const downloadAsDOCX = async () => {
    const resumeElement = document.querySelector(`#${templateIndex}_template`);

    if (!resumeElement) {
      console.error('resumeElement not found');
      return;
    }

    try {
      const docxBuffer = await HTMLtoDOCX(resumeElement.innerHTML);

      const blob = new Blob([docxBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(blob, `Resume_Builder_${Date.now()}.docx`);
    } catch (error) {
      console.error('Error converting to DOCX:', error);
    }
  };

  return (
    <>
      <StyledButton onClick={downloadAsPDF} variant="outlined">
        Download as PDF
      </StyledButton>
      <StyledButton onClick={downloadAsDOCX} variant="outlined">
        Download as DOC/DOCX
      </StyledButton>
    </>
  );
};
