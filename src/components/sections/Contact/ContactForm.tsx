import type { TFunction } from 'i18next';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { EMAIL, WEB3FORMS_ACCESS_KEY } from '../../../constants/contact';
import { Button, CheckCircleIcon, XCircleIcon } from '../../controls';
import type { ButtonVariant } from '../../controls/buttons/buttonStyles';
import { buildMailtoHref, submitToWeb3Forms } from './utils';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

const BUTTON_VARIANT_BY_STATUS: Record<SubmitStatus, ButtonVariant> = {
  idle: 'primary',
  sending: 'primary',
  sent: 'success',
  error: 'danger',
};

const BUTTON_LABEL_BY_STATUS: Record<SubmitStatus, (t: TFunction) => string> = {
  idle: (t) => t('contact.form.submit'),
  sending: (t) => t('contact.form.sending'),
  sent: (t) => t('contact.form.sentButton'),
  error: (t) => t('contact.form.errorButton'),
};

const BUTTON_ICON_BY_STATUS: Record<SubmitStatus, ReactNode> = {
  idle: null,
  sending: null,
  sent: <CheckCircleIcon className="h-4 w-4 -translate-y-[0.25px]" />,
  error: <XCircleIcon className="h-4 w-4 -translate-y-[0.25px]" />,
};

/** How long the button wears its green/red outcome state before returning to normal. */
const OUTCOME_CONFIRMATION_MS = 5000;

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
  // The error details (with the direct email) outlive the button's transient
  // red state — they stay until the visitor retries.
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  useEffect(() => {
    if (status !== 'sent' && status !== 'error') return;

    const timer = setTimeout(() => setStatus('idle'), OUTCOME_CONFIRMATION_MS);

    return () => clearTimeout(timer);
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!WEB3FORMS_ACCESS_KEY) {
      window.location.href = buildMailtoHref(form);

      return;
    }

    setStatus('sending');
    setShowErrorDetails(false);

    try {
      await submitToWeb3Forms(form);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
      setShowErrorDetails(true);
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

      {/* The button itself announces the outcome for a few seconds — green
          checkmark on success, red cross on failure — then returns to normal
          so the visitor can retry. */}
      <Button
        type="submit"
        variant={BUTTON_VARIANT_BY_STATUS[status]}
        startIcon={BUTTON_ICON_BY_STATUS[status]}
        disabled={status !== 'idle'}
        data-testid="contact-submit"
        className="mt-2 w-full disabled:opacity-60"
      >
        {BUTTON_LABEL_BY_STATUS[status](t)}
      </Button>

      {status === 'sent' && (
        <p role="status" data-testid="contact-status-sent" className="text-sm text-accent">
          {t('contact.form.sent')}
        </p>
      )}
      {showErrorDetails && (
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
