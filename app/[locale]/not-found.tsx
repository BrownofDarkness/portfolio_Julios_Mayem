import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("nav");

  return (
    <main className="wrap" style={{ padding: "8rem 2rem", textAlign: "center" }}>
      <p
        className="mono"
        style={{
          color: "var(--muted)",
          fontSize: "11px",
          letterSpacing: "0.06em",
        }}
      >
        404
      </p>
      <h1 style={{ marginTop: "1rem" }}>Page introuvable.</h1>
      <p style={{ color: "var(--text-2)", marginTop: "1rem" }}>
        La ressource demandée n&apos;existe pas — ou plus.
      </p>
      <Link
        href="/"
        className="inline"
        style={{ display: "inline-block", marginTop: "2rem" }}
      >
        {t("work")} →
      </Link>
    </main>
  );
}
