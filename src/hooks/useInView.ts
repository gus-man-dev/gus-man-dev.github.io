import { useEffect, useRef, useState } from 'react';

/**
 * One-shot IntersectionObserver: `inView` flips to true the first time the
 * element enters the viewport and stays true (reveal animations shouldn't
 * replay on every scroll pass). Threshold 0.15 so the animation starts once
 * a meaningful part of the block is visible, not on the first pixel.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
