import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HTMLRenderer } from './HTMLRenderer';
import { styleVariables } from '@/helpers/resume-style/styles';

describe('rich text layout customization', () => {
  it('allows body and line-height settings through its formerly fixed text-xs wrapper', () => {
    const view = render(
      <div style={styleVariables({ typography: { body: 16, lineHeight: 1.8 } })}>
        <HTMLRenderer htmlString="<p>Resume description</p>" />
      </div>
    );
    const wrapper = screen.getByText('Resume description').parentElement!;
    expect(wrapper.style.fontSize).toBe('var(--resume-body, 0.75rem)');
    expect(wrapper.style.lineHeight).toBe(
      'var(--resume-line-height, var(--resume-richtext-line-height, calc(1rem * var(--resume-line-factor, 1))))'
    );
    expect(wrapper.parentElement!.style.getPropertyValue('--resume-body')).toBe('16px');
    view.rerender(
      <div style={styleVariables({ typography: { body: 9, lineHeight: 1.1 } })}>
        <HTMLRenderer htmlString="<p>Resume description</p>" />
      </div>
    );
    expect(wrapper.parentElement!.style.getPropertyValue('--resume-body')).toBe('9px');
    expect(wrapper.parentElement!.style.getPropertyValue('--resume-line-height')).toBe('1.1');
  });
  it('preserves explicit inline typography and rich text markup', () => {
    render(
      <div style={styleVariables({ typography: { body: 16, family: 'mono', lineHeight: 1.8 } })}>
        <HTMLRenderer
          htmlString={
            '<p><span style="font-size:20px;font-family:Georgia;line-height:2"><strong>Formatted text</strong></span></p>'
          }
        />
      </div>
    );
    const span = screen.getByText('Formatted text').parentElement!;
    expect(span.style.fontSize).toBe('20px');
    expect(span.style.fontFamily).toBe('Georgia');
    expect(span.style.lineHeight).toBe('2');
    expect(screen.getByText('Formatted text').tagName).toBe('STRONG');
  });
});
