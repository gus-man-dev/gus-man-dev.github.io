import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { EMAIL, PHONE_DISPLAY } from '../../../constants/contact';
import '../../../i18n';
import { Contact } from '../Contact';

function fillAndSubmitForm() {
  fireEvent.change(screen.getByTestId('contact-first-name'), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByTestId('contact-last-name'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByTestId('contact-email'), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByTestId('contact-message'), { target: { value: 'Hello!' } });
  fireEvent.click(screen.getByTestId('contact-submit'));
}

describe('Contact form', () => {
  let fetchMock: Mock;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  it('shows the real contact channels in the info cards', () => {
    render(<Contact />);

    expect(screen.getByTestId('contact-info-email-value')).toHaveTextContent(EMAIL);
    expect(screen.getByTestId('contact-info-phone-value')).toHaveTextContent(PHONE_DISPLAY);
    expect(screen.getByTestId('contact-info-address-value')).not.toBeEmptyDOMElement();
  });

  it('sends the message to Web3Forms and reports success', async () => {
    fetchMock.mockResolvedValue({ ok: true });

    render(<Contact />);
    fillAndSubmitForm();

    expect(await screen.findByTestId('contact-status-sent')).toBeInTheDocument();

    const [url, request] = fetchMock.mock.calls[0];
    const payload = JSON.parse(request.body);

    expect(url).toBe('https://api.web3forms.com/submit');
    expect(payload.access_key).toBe('test-access-key');
    expect(payload.name).toBe('Jane Doe');
    expect(payload.email).toBe('jane@example.com');
    expect(payload.message).toBe('Hello!');
  });

  it('shows the error state with a direct email link when sending fails', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 });

    render(<Contact />);
    fillAndSubmitForm();

    expect(await screen.findByTestId('contact-status-error')).toBeInTheDocument();
    expect(screen.getByTestId('contact-error-email-link')).toHaveAttribute('href', 'mailto:romka9876@gmail.com');
  });

  it('clears the form after a successful send', async () => {
    fetchMock.mockResolvedValue({ ok: true });

    render(<Contact />);
    fillAndSubmitForm();
    await screen.findByTestId('contact-status-sent');

    expect(screen.getByTestId('contact-first-name')).toHaveValue('');
    expect(screen.getByTestId('contact-message')).toHaveValue('');
  });
});
