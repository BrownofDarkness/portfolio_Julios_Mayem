"use client";

import { useTranslations } from "next-intl";
import { useState, useRef, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

type State = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, setState] = useState<State>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;

    const fd = new FormData(e.currentTarget);
    const body = {
      name:    fd.get("name") as string,
      email:   fd.get("email") as string,
      message: fd.get("message") as string,
    };

    setState("loading");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });

      if (!res.ok) throw new Error("server");
      setState("success");
      formRef.current?.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className={styles.feedback} data-variant="success">
        <span className={styles.feedbackIcon}>✓</span>
        <p>{t("success")}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-name" className={styles.label}>{t("name")}</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className={styles.input}
            disabled={state === "loading"}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-email" className={styles.label}>{t("email")}</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className={styles.input}
            disabled={state === "loading"}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message" className={styles.label}>{t("message")}</label>
        <textarea
          id="cf-message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={styles.textarea}
          disabled={state === "loading"}
        />
      </div>

      {state === "error" && (
        <p className={styles.feedback} data-variant="error">{t("error")}</p>
      )}

      <button
        type="submit"
        className={styles.submit}
        disabled={state === "loading"}
        aria-busy={state === "loading"}
      >
        {state === "loading" ? t("sending") : t("send")}
      </button>
    </form>
  );
}
