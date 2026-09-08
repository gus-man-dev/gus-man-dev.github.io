import type { ComponentType, SVGProps } from 'react';

interface SocialIconLinkProps {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Full visual styling — Hero and Contact render the same links with different chrome. */
  className: string;
  iconClassName: string;
}

/**
 * One social-network icon link. Owns the non-visual anchor mechanics
 * (aria-label, opening external URLs in a new tab) so Hero and Contact
 * don't each re-derive them.
 */
export function SocialIconLink({ href, label, Icon, className, iconClassName }: SocialIconLinkProps) {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={className}
    >
      <Icon className={iconClassName} />
    </a>
  );
}
