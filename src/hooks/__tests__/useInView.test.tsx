import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { MockIntersectionObserver } from '../../test/setup';
import { useInView } from '../useInView';

function InViewIndicator() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} data-testid="in-view-indicator">
      {inView ? 'visible' : 'hidden'}
    </div>
  );
}

function renderIndicatorAndCaptureObserver() {
  render(<InViewIndicator />);

  return MockIntersectionObserver.instances.at(-1)!;
}

describe('useInView', () => {
  it('starts hidden and observes the element', () => {
    const observer = renderIndicatorAndCaptureObserver();

    expect(screen.getByTestId('in-view-indicator')).toHaveTextContent('hidden');
    expect(observer.observed).toHaveLength(1);
  });

  it('flips once on intersection and disconnects (one-shot)', () => {
    const observer = renderIndicatorAndCaptureObserver();

    act(() => observer.intersect(true));

    expect(screen.getByTestId('in-view-indicator')).toHaveTextContent('visible');
    expect(observer.disconnected).toBe(true);
  });

  it('ignores non-intersecting callbacks', () => {
    const observer = renderIndicatorAndCaptureObserver();

    act(() => observer.intersect(false));

    expect(screen.getByTestId('in-view-indicator')).toHaveTextContent('hidden');
    expect(observer.disconnected).toBe(false);
  });
});
