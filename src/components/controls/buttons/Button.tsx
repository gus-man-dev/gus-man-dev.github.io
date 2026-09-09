import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { BUTTON_BASE_CLASSES, BUTTON_VARIANT_CLASSES, type ButtonVariant } from './buttonStyles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Icon rendered before the label; the base classes provide the gap. */
  startIcon?: ReactNode;
  /** Icon rendered after the label. */
  endIcon?: ReactNode;
  children: ReactNode;
}

/**
 * Base button control. All section components should use this instead of a
 * raw <button>, so button styling changes in one place.
 */
export function Button({ variant = 'primary', startIcon, endIcon, className = '', children, ...rest }: ButtonProps) {
  return (
    <button className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${className}`} {...rest}>
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}
