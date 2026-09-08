import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { BUTTON_BASE_CLASSES, BUTTON_VARIANT_CLASSES, type ButtonVariant } from './buttonStyles';

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

/**
 * Anchor-based counterpart to Button, for cases that need a real link
 * (downloads, external URLs) rather than a click handler. Same visual
 * language as Button — same base/variant classes, different element.
 */
export function ButtonLink({ variant = 'primary', className = '', children, ...rest }: ButtonLinkProps) {
  return (
    <a className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
