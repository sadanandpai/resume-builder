import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { PagedResume } from './PagedResume';
import { useTemplates } from '@/stores/useTemplate';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { TEMPLATE_REGISTRY } from '@/templates/designs/registry/templates';
import { spacing } from '@/helpers/resume-style/styles';

afterEach(cleanup);

describe('entry spacing round trips', () => {
  for (const templateId of Object.keys(TEMPLATE_REGISTRY)) {
    for (const density of [undefined, 'compact', 'spacious'] as const) {
      it(`restores relative gaps for ${templateId}, ${density ?? 'balanced'}`, () => {
        useTemplates.setState({
          activeTemplate: { ...useTemplates.getState().activeTemplate, id: templateId },
        });
        useResumeStyleStore.setState({
          settings: density ? { density } : {},
          past: [],
          future: [],
          baseline: null,
        });
        const { container, rerender } = render(
          <PagedResume>
            <div style={{ marginBottom: spacing('entry', 14) }} />
          </PagedResume>
        );
        const content = () => container.querySelector('.resume-page-content') as HTMLElement;
        const initialFactor = Number(content().style.getPropertyValue('--resume-density') || 1);
        const startingValue =
          TEMPLATE_REGISTRY[templateId].style.entry *
          (density === 'compact' ? 0.8 : density === 'spacious' ? 1.2 : 1);
        for (const value of [0, 25, startingValue, 40, startingValue]) {
          useResumeStyleStore.getState().commit({ density, spacing: { entry: value } });
          rerender(
            <PagedResume>
              <div style={{ marginBottom: spacing('entry', 14) }} />
            </PagedResume>
          );
          expect(content().style.getPropertyValue('--resume-entry')).toBe('');
          const factor = Number(content().style.getPropertyValue('--resume-entry-factor'));
          expect(factor).toBeCloseTo((initialFactor * value) / startingValue);
          if (value === startingValue) {
            // Both the primary and secondary entry gaps regain their original sizes.
            for (const gap of [7, 14, 20, 22]) {
              expect(gap * factor).toBeCloseTo(gap * initialFactor);
            }
          }
        }
      });
    }
  }
});
