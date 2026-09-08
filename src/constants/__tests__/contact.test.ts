import { describe, expect, it } from 'vitest';
import { VISIBLE_SOCIAL_LINKS } from '../contact';

describe('social links', () => {
  it('exposes only links with real destinations — pending placeholders stay hidden', () => {
    expect(VISIBLE_SOCIAL_LINKS.length).toBeGreaterThan(0);

    for (const link of VISIBLE_SOCIAL_LINKS) {
      expect(link.href, `${link.label} must not render as a dead link`).not.toBe('#');
      expect(link.pending).toBeFalsy();
    }
  });
});
