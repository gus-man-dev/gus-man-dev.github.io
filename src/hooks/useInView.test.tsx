import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { MockIntersectionObserver } from '../test/setup';
import { useInView } from './useInView';

function Probe() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return <div ref={ref}>{inView ? 'visible' : 'hidden'}</div>;
}

function renderProbe() {
  render(<Probe />);

  return MockIntersectionObserver.instances.at(-1)!;
}

describe('useInView', () => {
  it('starts hidden and observes the element', () => {
    const observer = renderProbe();

    expect(screen.getByText('hidden')).toBeInTheDocument();
    expect(observer.observed).toHaveLength(1);
  });

  it('flips once on intersection and disconnects (one-shot)', () => {
    const observer = renderProbe();

    act(() => observer.intersect(true));

    expect(screen.getByText('visible')).toBeInTheDocument();
    expect(observer.disconnected).toBe(true);
  });

  it('ignores non-intersecting callbacks', () => {
    const observer = renderProbe();

    act(() => observer.intersect(false));

    expect(screen.getByText('hidden')).toBeInTheDocument();
    expect(observer.disconnected).toBe(false);
  });
});
