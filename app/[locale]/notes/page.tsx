import { setRequestLocale, getTranslations } from "next-intl/server";
import { getNotes } from "@/lib/content";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

export default async function NotesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return null;
  setRequestLocale(locale);

  const t = await getTranslations();
  const notes = await getNotes(locale as Locale);

  return (
    <main className="wrap" style={{ padding: "6rem 2rem" }}>
      <p
        className="mono smcp"
        style={{ color: "var(--muted)", fontSize: "11px" }}
      >
        {t("sections.notesAside")}
      </p>
      <h1 style={{ marginTop: "1rem" }}>{t("sections.notesTitle")}</h1>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {notes.map((n) => (
          <li key={n.slug}>
            <span style={{ fontWeight: 500 }}>{n.title}</span>{" "}
            <span
              className="mono"
              style={{ color: "var(--muted)", fontSize: "12px" }}
            >
              — {n.date}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
