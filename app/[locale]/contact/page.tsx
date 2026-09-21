import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return null;
  }
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <main className="wrap" style={{ padding: "6rem 2rem" }}>
      <h1>{t("nav.contact")}</h1>
      <p style={{ color: "var(--text-2)", marginTop: "1rem" }}>
        {t("footer.contact")}{" "}
        <a href="mailto:maesjulios@gmail.com" className="inline">
          maesjulios@gmail.com
        </a>
        .
      </p>
      <p
        className="mono"
        style={{
          color: "var(--muted)",
          fontSize: "11px",
          marginTop: "3rem",
        }}
      >
        {t("footer.location")}
      </p>
    </main>
  );
}
