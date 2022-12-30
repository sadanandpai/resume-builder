import { useMemo } from 'react';
import parseHtmlStringToHtml, { domToReact } from 'html-react-parser';
import Link from 'next/link';

import styles from './richtext/jodit.module.css';

export const HTMLRenderer = ({ htmlString }: { htmlString: string }) => {
  const parsedElement = useMemo(() => {
    return parseHtmlStringToHtml(htmlString, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      replace: (domNode: any) => {
        if (domNode.attribs && domNode.attribs.href && domNode.name === 'a') {
          return (
            <Link href={domNode.attribs.href}>
              <a>{domToReact(domNode.children)}</a>
            </Link>
          );
        } else if (domNode.name === 'script') {
          return <></>;
        }
      },
    });
  }, [htmlString]);
  return <div className={`${styles.richtextRuntimeWrapper} text-xs`}>{parsedElement}</div>;
};
