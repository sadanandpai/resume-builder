import { useRef, useEffect, memo, useState } from 'react';
import 'jodit/es2015/jodit.min.css';

import type { Jodit as JoditInstance } from 'jodit';
import { LinkPlugin } from './plugins/link';
import { sanitizeRichText } from './sanitize';

import styles from './jodit.module.css';

interface IRichtext {
  label: string;
  onChange: (htmlOutput: string) => void;
  value: string;
  name: string;
}

export const RichtextEditor = memo(({ label, onChange, value }: IRichtext) => {
  const editorContainerRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<JoditInstance | null>(null);
  const [editorInstanceCreated, setEditorInstanceCreated] = useState(false);

  useEffect(() => {
    const container = editorContainerRef.current;
    let cancelled = false;
    let instance: JoditInstance | null = null;
    if (container) {
      const initEditor = async () => {
        const { Jodit } = await import('jodit');
        if (cancelled) return;
        const editor = Jodit.make(container, {
          showCharsCounter: false,
          showWordsCounter: false,
          showXPathInStatusbar: false,
          buttons: ['bold', 'italic', 'link', 'ul', 'ol', 'undo', 'redo'],
          disablePlugins:
            'add-new-line,print,preview,table,table-keyboard-navigation,select-cells,resize-cells,file,video,media,image,image-processor,image-properties,xpath,tab,stat,search,powered-by-jodit,mobile,justify,inline-popup,indent,iframe,fullsize',
          useSearch: false,
          askBeforePasteHTML: false,
          askBeforePasteFromWord: false,
          defaultActionOnPaste: 'insert_as_html',
          defaultActionOnPasteFromWord: 'insert_as_html',
          events: {
            beforePasteInsert: (html: unknown) =>
              typeof html === 'string' ? sanitizeRichText(html) : undefined,
            // Jodit calls this without a value when syncing typing/toolbar changes.
            // Returning a string then would replace the live editor content.
            beforeSetValueToEditor: (html: unknown) =>
              typeof html === 'string' ? sanitizeRichText(html) : undefined,
          },
          maxHeight: 200,
          link: LinkPlugin,
        });
        instance = editor;
        editor.value = sanitizeRichText(value);
        editorRef.current = editor;
        setEditorInstanceCreated(true);
      };
      initEditor();
    }
    return () => {
      cancelled = true;
      instance?.destruct();
      editorRef.current = null;
    };
    // oxlint-disable-next-line react/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      editorRef.current &&
      editorInstanceCreated &&
      editorRef.current.value !== sanitizeRichText(value)
    ) {
      editorRef.current.value = sanitizeRichText(value);
    }
  }, [value, editorInstanceCreated]);

  useEffect(() => {
    if (editorRef.current && editorInstanceCreated) {
      const editor = editorRef.current;
      const handleChange = (html: string) => onChange(sanitizeRichText(html));
      // Persist cleanup of formatting already present in saved resumes.
      const cleaned = sanitizeRichText(value);
      if (cleaned !== value) onChange(cleaned);
      editor.events.on('change', handleChange);
      return () => {
        if (!editor.isDestructed) editor.events.off('change', handleChange);
      };
    }
  }, [onChange, editorInstanceCreated, value]);

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
