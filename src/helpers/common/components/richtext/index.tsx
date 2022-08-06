import { useRef, useEffect } from 'react';
import 'jodit/build/jodit.min.css';

import { LinkPlugin } from './plugins/link';

import styles from './jodit.module.css';

interface IRichtext {
  label: string;
  onChange: (htmlOutput: string) => void;
  value: string;
  name: string;
}

export const RichtextEditor = ({ label, onChange, value }: IRichtext) => {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const initEditor = async () => {
        const { Jodit } = await import('jodit');
        const editor = Jodit.make(editorRef.current as HTMLTextAreaElement, {
          showCharsCounter: false,
          showWordsCounter: false,
          showXPathInStatusbar: false,
          buttons: ['bold', 'italic', 'link', 'ul', 'ol', 'undo', 'redo'],
          disablePlugins:
            'add-new-line,print,preview,table,table-keyboard-navigation,select-cells,resize-cells,file,video,media,image,image-processor,image-properties,xpath,tab,stat,search,powered-by-jodit,mobile,justify,inline-popup,indent,iframe,fullsize',
          useSearch: false,
          askBeforePasteHTML: false,
          askBeforePasteFromWord: false,
          defaultActionOnPaste: 'insert_only_text',
          maxHeight: 200,
          link: LinkPlugin,
        });
        editor.value = value;
        editor.events.on('change', (htmlOutput) => {
          onChange(htmlOutput);
        });
      };
      initEditor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.editor_wrapper}`}>
      <div
        style={{
          padding: '8px 16px 0px',
        }}
        className="text-resume-800 text-xs mb-1"
      >
        <span>{label}</span>
      </div>
      <textarea ref={editorRef}></textarea>
    </div>
  );
};
