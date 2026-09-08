import logoLightOnDark from '../../assets/images/logo-light-on-dark.png';
import logoDarkOnLight from '../../assets/images/logo-dark-on-light.png';
import { LOGO_ALT } from '../../constants/personal';

interface LogoProps {
  /** Whether the logo sits on a dark background right now (picks the matching color variant). */
  onDark: boolean;
  /** Sizing is the caller's responsibility (e.g. "h-10 w-10") — no default, so it can't silently conflict. */
  className: string;
}

export function Logo({ onDark, className }: LogoProps) {
  return (
    <img src={onDark ? logoLightOnDark : logoDarkOnLight} alt={LOGO_ALT} className={`object-contain ${className}`} />
  );
}
