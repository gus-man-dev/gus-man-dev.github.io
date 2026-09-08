import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import '../../i18n';
import { Contact } from './Contact';

function fillAndSubmitForm() {
  fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
  // Not getByLabelText('Email') — the footer's Email social icon carries the same aria-label.
  fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello!' } });
  fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
}

describe('Contact form', () => {
  let fetchMock: Mock;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  it('sends the message to Web3Forms and reports success', async () => {
    fetchMock.mockResolvedValue({ ok: true });

    render(<Contact />);
    fillAndSubmitForm();

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();

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

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'romka9876@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:romka9876@gmail.com',
    );
  });

  it('clears the form after a successful send', async () => {
    fetchMock.mockResolvedValue({ ok: true });

    render(<Contact />);
    fillAndSubmitForm();
    await screen.findByText(/message sent/i);

    expect(screen.getByLabelText('First Name')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });
});
