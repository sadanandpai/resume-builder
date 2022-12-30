import { useRef, useEffect, memo, useState } from 'react';
import 'jodit/build/jodit.min.css';

import { LinkPlugin } from './plugins/link';

import styles from './jodit.module.css';

interface IRichtext {
  label: string;
  onChange: (htmlOutput: string) => void;
  value: string;
  name: string;
}

export const RichtextEditor = memo(({ label, onChange, value }: IRichtext) => {
  const editorContainerRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<any>(null);
  const [editorInstanceCreated, setEditorInstanceCreated] = useState(false);

  useEffect(() => {
    if (editorContainerRef.current) {
      const initEditor = async () => {
        const { Jodit } = await import('jodit');
        const editor = Jodit.make(editorContainerRef.current as HTMLTextAreaElement, {
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
        editorRef.current = editor;
        setEditorInstanceCreated(true);
      };
      initEditor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editorRef.current && editorInstanceCreated) {
      editorRef.current.value = value;
    }
  }, [value, editorInstanceCreated]);

  useEffect(() => {
    if (editorRef.current && editorInstanceCreated) {
      editorRef.current.events.on('change', onChange);
    }
  }, [onChange, editorInstanceCreated]);

  return (
    <div className={`${styles.editor_wrapper} mb-4`}>
      <div
        style={{
          padding: '8px 16px 0px',
        }}
        className="text-resume-800 text-xs mb-1"
      >
        <span>{label}</span>
      </div>
      <textarea
        ref={editorContainerRef}
        className={`min-h-[200px] min-w-full bg-[rgba(0,0,0,0.06)]`}
      ></textarea>
    </div>
  );
});

RichtextEditor.displayName = 'RichtextEditor';
