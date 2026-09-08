import { useEffect, useState } from 'react';

/** True once the page has scrolled past `threshold` px — drives the header's transparent→solid switch. */
export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
