/**
 * Feature flags for optional page sections.
 *
 * All sections are implemented and kept in the codebase; flags here control
 * what actually renders on deploy. Flip a flag and rebuild — no code deleted,
 * no env vars needed.
 */
export const sectionFlags = {
  hero: true,
  about: true,
  services: true,
  skills: true,
  proficiency: false, // Technical/Professional Skills bars & rings — self-assessed % read as arbitrary; Key Technologies covers the same ground
  education: true,
  experience: true,
  ctaBanner: true, // "Interested to Work?" in the reference, renamed
  pricing: true,
  contact: true,
} as const;

// The reference template's Testimonials / Blog / Portfolio / Featured Projects
// sections were excluded from this port entirely (per requirements) — they have
// no components, so they get no flags here.
