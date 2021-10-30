import React, { useCallback } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

export function MarkDownField({ value, setValue }: any) {
  const handleEditorChange = useCallback(
    ({ text }) => {
      setValue(text);
    },
    [setValue]
  );

  return (
    <>
      <MdEditor
        style={{ height: '200px' }}
        view={{ menu: true, md: true, html: false }}
        plugins={[
          'font-bold',
          'font-italic',
          'link',
          'full-screen',
          'list-ordered',
          'list-unordered',
          'logger',
        ]}
        value={value}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </>
  );
}
