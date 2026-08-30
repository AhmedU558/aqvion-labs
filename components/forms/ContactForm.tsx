"use client";

import { type FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { contactFormCopy } from "@/data/contact";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type FieldName = keyof Fields;

const empty: Fields = { name: "", email: "", company: "", message: "" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Fields): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Describe the project or problem.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Add a little more detail — at least 20 characters.";
  }

  return errors;
}

/**
 * Client-side contact form.
 *
 * Validates accessibly, then refuses to pretend the message was delivered.
 * There is no backend on this route yet; a valid submit reports that fact
 * and leaves the fields intact.
 */
export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [notice, setNotice] = useState<string | null>(null);

  function setField(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setNotice(null);

    if (Object.keys(nextErrors).length > 0) {
      const first = (Object.keys(nextErrors) as FieldName[])[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    setNotice(contactFormCopy.unavailable);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <p className="rounded-xs border border-dashed border-border-strong px-4 py-3 text-[0.875rem] leading-relaxed text-muted">
        {contactFormCopy.notice}
      </p>

      <Field
        id={`${id}-name`}
        label={contactFormCopy.name}
        name="name"
        autoComplete="name"
        required
        value={values.name}
        error={errors.name}
        onChange={(value) => setField("name", value)}
      />

      <Field
        id={`${id}-email`}
        label={contactFormCopy.email}
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        required
        value={values.email}
        error={errors.email}
        onChange={(value) => setField("email", value)}
      />

      <Field
        id={`${id}-company`}
        label={contactFormCopy.company}
        name="company"
        autoComplete="organization"
        optional
        value={values.company}
        error={errors.company}
        onChange={(value) => setField("company", value)}
      />

      <Field
        id={`${id}-message`}
        label={contactFormCopy.message}
        name="message"
        multiline
        required
        value={values.message}
        error={errors.message}
        onChange={(value) => setField("message", value)}
      />

      {notice && (
        <p role="status" aria-live="polite" className="text-sm leading-relaxed text-muted-strong">
          {notice}
        </p>
      )}

      <div>
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          {contactFormCopy.submit}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  optional = false,
  required = false,
  multiline = false,
}: {
  id: string;
  label: string;
  name: FieldName;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "email";
  optional?: boolean;
  required?: boolean;
  multiline?: boolean;
}) {
  const errorId = `${id}-error`;
  const hintId = optional ? `${id}-hint` : undefined;
  const describedBy = [error ? errorId : null, hintId].filter(Boolean).join(" ") || undefined;

  const controlClass = cn(
    "min-h-11 w-full rounded-md border bg-surface px-4 py-3 text-base text-foreground",
    "placeholder:text-faint",
    "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-precise)]",
    "focus-visible:outline-offset-4",
    error
      ? "border-primary-bright"
      : "border-border-strong focus:border-border-glow",
  );

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3">
        <span className="label-mono text-muted-strong">{label}</span>
        {optional && (
          <span id={hintId} className="font-mono text-[0.625rem] tracking-[0.14em] text-faint">
            OPTIONAL
          </span>
        )}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={6}
          value={value}
          required={required || undefined}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={cn(controlClass, "min-h-36 resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          value={value}
          required={required || undefined}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={controlClass}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="text-sm text-primary-bright">
          {error}
        </p>
      )}
    </div>
  );
}
