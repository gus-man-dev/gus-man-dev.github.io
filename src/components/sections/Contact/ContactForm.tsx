import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { EMAIL, WEB3FORMS_ACCESS_KEY } from '../../../constants/contact';
import { Button } from '../../controls';
import { buildMailtoHref, submitToWeb3Forms } from './utils';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

const INPUT_CLASSES =
  'w-full rounded-md border border-slate-300 bg-transparent px-4 py-2.5 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  /** Visible placeholder; defaults to the (sr-only) label text. */
  placeholder?: string;
}

function FormField({ id, name, label, type = 'text', placeholder = label }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        data-testid={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className={INPUT_CLASSES}
      />
    </div>
  );
}

export function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<SubmitStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!WEB3FORMS_ACCESS_KEY) {
      window.location.href = buildMailtoHref(form);
      return;
    }

    setStatus('sending');

    try {
      await submitToWeb3Forms(form);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="contact-first-name" name="firstName" label={t('contact.form.firstName')} />
        <FormField id="contact-last-name" name="lastName" label={t('contact.form.lastName')} />
      </div>

      <FormField
        id="contact-email"
        name="email"
        type="email"
        label={t('contact.form.email')}
        placeholder={t('contact.form.emailPlaceholder')}
      />

      <div className="flex flex-1 flex-col">
        <label htmlFor="contact-message" className="sr-only">
          {t('contact.form.message')}
        </label>
        <textarea
          id="contact-message"
          data-testid="contact-message"
          name="message"
          required
          placeholder={t('contact.form.messagePlaceholder')}
          className={`${INPUT_CLASSES} flex-1 resize-none`}
        />
      </div>

      {/* Web3Forms honeypot: bots tick it, humans never see it. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />

      <Button
        type="submit"
        disabled={status === 'sending'}
        data-testid="contact-submit"
        className="mt-2 w-full disabled:opacity-60"
      >
        {t(status === 'sending' ? 'contact.form.sending' : 'contact.form.submit')}
      </Button>

      {status === 'sent' && (
        <p role="status" data-testid="contact-status-sent" className="text-sm text-accent">
          {t('contact.form.sent')}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" data-testid="contact-status-error" className="text-sm text-red-500 dark:text-red-400">
          {t('contact.form.error')}{' '}
          <a href={`mailto:${EMAIL}`} data-testid="contact-error-email-link" className="underline">
            {EMAIL}
          </a>
        </p>
      )}
    </form>
  );
}
