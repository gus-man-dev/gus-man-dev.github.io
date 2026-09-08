import { afterEach, describe, expect, it, vi } from 'vitest';
import { readStorage, writeStorage } from '../storage';

describe('storage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('round-trips a value', () => {
    writeStorage('theme', 'dark');

    expect(readStorage('theme')).toBe('dark');
  });

  it('returns null for a key that was never written', () => {
    expect(readStorage('language')).toBeNull();
  });

  it('reads as null when localStorage access throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });

    expect(readStorage('theme')).toBeNull();
  });

  it('swallows write failures instead of crashing the page', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });

    expect(() => writeStorage('theme', 'dark')).not.toThrow();
  });
});
