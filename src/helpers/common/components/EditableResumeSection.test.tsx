import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { EditableResumeSection } from './EditableResumeSection';
import { previewEditorTargets, useEditorStore } from '@/stores/useEditorStore';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { SECTION_IDS } from '@/templates/designs/registry/sectionIds';
import { useTemplates } from '@/stores/useTemplate';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';

beforeEach(() => {
  useEditorStore.setState({ target: { section: '' }, revision: 0 });
  useSectionLayoutStore.setState({ isReorderMode: false });
  useTemplates.setState({ activeTemplate: AVAILABLE_TEMPLATES.modern });
});

describe('preview editor navigation', () => {
  it.each(['basics', ...Object.values(SECTION_IDS)])('opens the editor for %s', (id) => {
    render(<EditableResumeSection id={id}>Content</EditableResumeSection>);
    fireEvent.click(screen.getByText('Content'));
    expect(useEditorStore.getState().target).toEqual(previewEditorTargets[id]);
  });

  it('switches sections and reopens the same section after its panel was closed', () => {
    render(
      <>
        <EditableResumeSection id="work">Work</EditableResumeSection>
        <EditableResumeSection id="tools">Tools</EditableResumeSection>
      </>
    );
    fireEvent.click(screen.getByText('Work'));
    fireEvent.click(screen.getByText('Tools'));
    expect(useEditorStore.getState().target).toEqual({
      section: 'skills-and-expertise',
      panel: 'Tools',
    });
    fireEvent.click(screen.getByText('Tools'));
    expect(useEditorStore.getState().revision).toBe(3);
  });

  it('supports keyboard selection and preserves contact links', () => {
    render(
      <EditableResumeSection id="basics">
        <a href="mailto:test@example.com">Email</a>
      </EditableResumeSection>
    );
    fireEvent.click(screen.getByText('Email'));
    expect(useEditorStore.getState().revision).toBe(0);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(useEditorStore.getState().target.section).toBe('basic-details');
  });

  it('keeps reorder mode separate from editing', () => {
    act(() => useSectionLayoutStore.setState({ isReorderMode: true }));
    render(<EditableResumeSection id="work">Work</EditableResumeSection>);
    fireEvent.click(screen.getByText('Work'));
    expect(useEditorStore.getState().revision).toBe(0);
  });

  it('opens activities for Sidebar Left awards sourced from achievements', () => {
    useTemplates.setState({ activeTemplate: AVAILABLE_TEMPLATES['sidebar-left'] });
    render(<EditableResumeSection id="awards">Awards</EditableResumeSection>);
    fireEvent.click(screen.getByText('Awards'));
    expect(useEditorStore.getState().target).toEqual({
      section: 'activities',
      panel: 'achievements',
    });
  });
});
