import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { MockIntersectionObserver } from '../../test/setup';
import { useActiveSection } from '../useActiveSection';

// Module-level constant mirrors real usage (Header's NAV_IDS): the hook
// re-creates its observer whenever the ids array identity changes.
const SECTION_IDS = ['home', 'about', 'contact'];

function ActiveSectionLabel() {
  const activeId = useActiveSection(SECTION_IDS);

  return <span data-testid="active-section">{activeId}</span>;
}

function renderWithSections() {
  render(
    <>
      <div id="home" />
      <div id="about" />
      <div id="contact" />
      <ActiveSectionLabel />
    </>,
  );

  return MockIntersectionObserver.instances.at(-1)!;
}

function entryFor(id: string, intersectionRatio: number): Partial<IntersectionObserverEntry> {
  return { target: document.getElementById(id)!, isIntersecting: intersectionRatio > 0, intersectionRatio };
}

describe('useActiveSection', () => {
  it('observes every section and defaults to the first id', () => {
    const observer = renderWithSections();

    expect(observer.observed).toHaveLength(SECTION_IDS.length);
    expect(screen.getByTestId('active-section')).toHaveTextContent('home');
  });

  it('activates the section that scrolled into view', () => {
    const observer = renderWithSections();

    act(() => observer.fire([entryFor('about', 0.6)]));

    expect(screen.getByTestId('active-section')).toHaveTextContent('about');
  });

  it('prefers the most visible section when several intersect', () => {
    const observer = renderWithSections();

    act(() => observer.fire([entryFor('home', 0.3), entryFor('contact', 0.8)]));

    expect(screen.getByTestId('active-section')).toHaveTextContent('contact');
  });

  it('keeps the current section while nothing intersects', () => {
    const observer = renderWithSections();

    act(() => observer.fire([entryFor('about', 0.6)]));
    act(() => observer.fire([entryFor('about', 0)]));

    expect(screen.getByTestId('active-section')).toHaveTextContent('about');
  });
});
