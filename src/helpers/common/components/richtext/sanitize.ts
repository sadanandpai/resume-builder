// Keep the same formatting vocabulary as the editor toolbar. Run only in the browser.
export function sanitizeRichText(html: string | null | undefined): string {
  const root = document.createElement('template');
  root.innerHTML = html ?? '';
  const allowed = new Set(['P', 'DIV', 'BR', 'B', 'STRONG', 'I', 'EM', 'UL', 'OL', 'LI', 'A']);
  const discard = new Set([
    'SCRIPT',
    'STYLE',
    'IFRAME',
    'OBJECT',
    'EMBED',
    'SVG',
    'MATH',
    'TEMPLATE',
  ]);

  const clean = (parent: Node) => {
    for (const child of Array.from(parent.childNodes)) {
      if (child.nodeType === Node.COMMENT_NODE) {
        child.remove();
      } else if (child instanceof Element) {
        if (discard.has(child.tagName)) {
          child.remove();
          continue;
        }
        clean(child);
        if (!allowed.has(child.tagName)) {
          // Preserve block boundaries when flattening headings and pasted containers.
          if (/^(H[1-6]|BLOCKQUOTE|PRE|SECTION|ARTICLE|TR)$/.test(child.tagName)) {
            const block = document.createElement('div');
            block.append(...Array.from(child.childNodes));
            child.replaceWith(block);
          } else {
            child.replaceWith(...Array.from(child.childNodes));
          }
          continue;
        }
        for (const attribute of Array.from(child.attributes)) {
          const keep = child.tagName === 'A' && ['href', 'target', 'rel'].includes(attribute.name);
          if (!keep) child.removeAttribute(attribute.name);
        }
        if (child.tagName === 'A') {
          const href = child.getAttribute('href');
          if (href) {
            try {
              if (
                !['http:', 'https:', 'mailto:', 'tel:'].includes(
                  new URL(href, location.href).protocol
                )
              ) {
                child.removeAttribute('href');
              }
            } catch {
              child.removeAttribute('href');
            }
          }
          if (child.getAttribute('target') === '_blank')
            child.setAttribute('rel', 'noopener noreferrer');
        }
      }
    }
  };
  clean(root.content);
  return root.innerHTML;
}
