import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from '../../../constants/contact';
import { CV_PDF_PATH } from '../../../constants/personal';
import '../../../i18n';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('shows the headline facts of the CV', () => {
    render(<Hero />);

    expect(screen.getByTestId('hero-name')).toHaveTextContent('Roman Gusevski');
    expect(screen.getByTestId('hero-title')).toHaveTextContent('Senior Front-End Developer');
    expect(screen.getByTestId('hero-location')).not.toBeEmptyDOMElement();
  });

  it('links the email and phone to real contact channels', () => {
    render(<Hero />);

    const email = screen.getByTestId('hero-email');
    const phone = screen.getByTestId('hero-phone');

    expect(email).toHaveAttribute('href', `mailto:${EMAIL}`);
    expect(email).toHaveTextContent(EMAIL);
    expect(phone).toHaveAttribute('href', `tel:${PHONE_TEL}`);
    expect(phone).toHaveTextContent(PHONE_DISPLAY);
  });

  it('offers the CV download', () => {
    const { getByTestId } = render(<Hero />);

    const link = getByTestId('hero-download-cv');

    expect(link).toHaveAttribute('href', CV_PDF_PATH);
    expect(link).toHaveAttribute('download');
  });
});
