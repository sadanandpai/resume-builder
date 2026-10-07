import parseHtmlStringToHtml, { domToReact } from 'html-react-parser';

import Link from 'next/link';
import styles from './richtext/jodit.module.css';
import { useMemo } from 'react';

export const HTMLRenderer = ({ htmlString }: { htmlString: string }) => {
  const parsedElement = useMemo(() => {
    return parseHtmlStringToHtml(htmlString, {
      // oxlint-disable-next-line typescript/no-explicit-any
      replace: (domNode: any) => {
        if (domNode.attribs && domNode.attribs.href && domNode.name === 'a') {
          return <Link href={domNode.attribs.href}>{domToReact(domNode.children)}</Link>;
        } else if (domNode.name === 'script') {
          return <></>;
        }
      },
    });
  }, [htmlString]);
  return (
    <div
      className={`${styles.richtextRuntimeWrapper} text-xs`}
      style={{
        // Keep the existing uncustomized text-xs geometry, but let the resume's
        // global controls reach the wrapper instead of stopping at its parent.
        fontSize: 'var(--resume-body, 0.75rem)',
        lineHeight: 'var(--resume-line-height, calc(1rem * var(--resume-line-factor, 1)))',
      }}
    >
      {parsedElement}
    </div>
  );
};
