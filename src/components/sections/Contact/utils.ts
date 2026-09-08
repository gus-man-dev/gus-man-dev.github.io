import { EMAIL, WEB3FORMS_ACCESS_KEY } from '../../../constants/contact';

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  botcheck: FormDataEntryValue | null;
}

function readContactMessage(form: HTMLFormElement): ContactMessage {
  const fields = new FormData(form);

  return {
    name: `${fields.get('firstName')} ${fields.get('lastName')}`.trim(),
    email: String(fields.get('email') ?? ''),
    message: String(fields.get('message') ?? ''),
    botcheck: fields.get('botcheck'),
  };
}

/**
 * Fallback for when no Web3Forms key is configured: hand the message off
 * to the visitor's mail client via a prefilled mailto: link.
 */
export function buildMailtoHref(form: HTMLFormElement): string {
  const { name, email, message } = readContactMessage(form);

  const subject = encodeURIComponent(`Message from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Sends the message to the inbox via Web3Forms (static-site form relay,
 * no backend of our own). Throws on any non-success response so the
 * caller can show the error state.
 */
export async function submitToWeb3Forms(form: HTMLFormElement): Promise<void> {
  const { name, email, message, botcheck } = readContactMessage(form);

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `CV site — message from ${name}`,
      name,
      email,
      message,
      botcheck,
    }),
  });

  if (!response.ok) throw new Error(`Web3Forms responded ${response.status}`);
}
