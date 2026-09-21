import { setRequestLocale, getTranslations } from "next-intl/server";

/**
 * Home — squelette provisoire de Phase 0.
 * Sera remplacé en Phase 1 par le vrai composant Hero + sections.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <main className="wrap" style={{ padding: "6rem 2rem" }}>
      <p className="mono" style={{ color: "var(--muted)", fontSize: "11px" }}>
        {t("hero.location")} — {t("hero.role")}
      </p>
      <h1 style={{ marginTop: "1rem" }}>{t("hero.titleLine1")}</h1>
      <p
        style={{
          color: "var(--text-2)",
          maxWidth: "34rem",
          marginTop: "1rem",
          fontSize: "17px",
        }}
      >
        {t("hero.titleLine2")}
      </p>
      <p
        className="mono"
        style={{
          marginTop: "3rem",
          color: "var(--dim)",
          fontSize: "10.5px",
        }}
      >
        Phase 0 · setup en cours — Home réel arrive en Phase 1.
      </p>
    </main>
  );
}
