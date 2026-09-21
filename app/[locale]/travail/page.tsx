import { setRequestLocale, getTranslations } from "next-intl/server";
import { getProjects } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

/**
 * Index des projets — stub Phase 0.
 * En Phase 1 : styling + carte projet + intégration hero.
 */
export default async function WorkPage({
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
  const projects = await getProjects(locale as (typeof routing.locales)[number]);

  return (
    <main className="wrap" style={{ padding: "6rem 2rem" }}>
      <p
        className="mono smcp"
        style={{ color: "var(--muted)", fontSize: "11px" }}
      >
        {t("sections.projectsAside")}
      </p>
      <h1 style={{ marginTop: "1rem" }}>{t("sections.projectsTitle")}</h1>

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
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={{ pathname: "/travail/[slug]", params: { slug: p.slug } }}>
              <span style={{ fontWeight: 500 }}>{p.title}</span>{" "}
              <span className="mono" style={{ color: "var(--muted)", fontSize: "12px" }}>
                — {p.year}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
