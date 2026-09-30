import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { useI18n } from "../i18n/LanguageContext";

interface Base {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

function Wrap({ id, label, error, hint, optional, children }: Base & { children: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className={`field${error ? " field--error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {optional && <span className="field__opt"> {t("order.optional")}</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const describe = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({ id, label, error, hint, optional, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap id={id} label={label} error={error} hint={hint} optional={optional}>
      <input id={id} aria-invalid={!!error} aria-describedby={describe(id, error, hint)} {...rest} />
    </Wrap>
  );
}

export function TextArea({ id, label, error, hint, optional, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea id={id} aria-invalid={!!error} aria-describedby={describe(id, error, hint)} {...rest} />
    </Wrap>
  );
}
