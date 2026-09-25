import { setRequestLocale, getTranslations } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { getProjects } from "@/lib/content";
import { personSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";

import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { SectionHead } from "@/components/section/SectionHead";
import { ProjectsGrid } from "@/components/project/ProjectsGrid";
import { ProjectCard } from "@/components/project/ProjectCard";
import { NotesTeaser } from "@/components/section/NotesTeaser";
import {
  DistinctionsGrid,
  type DistinctionData,
} from "@/components/distinction/Distinction";

import styles from "./home.module.css";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;

  if (!routing.locales.includes(raw as Locale)) return null;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations();
  const projects = await getProjects(locale);

  return (
    <>
      <JsonLd data={personSchema(locale)} />
      <Hero />

      <div className="wrap">
        {/* ---------- Section Projets ---------- */}
        <section className={styles.block} id="travail">
          <SectionHead
            index="01."
            title={t("sections.projectsTitle")}
            aside={t("sections.projectsAside")}
          />
          <ProjectsGrid>
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </ProjectsGrid>
        </section>

        {/* ---------- Section À propos ---------- */}
        <section className={styles.block} id="a-propos">
          <SectionHead
            index="02."
            title={t("sections.aboutTitle")}
            aside={t("sections.aboutAside")}
          />
          <About />
        </section>

        {/* ---------- Section Compétences ---------- */}
        <section className={styles.block} id="competences">
          <SectionHead
            index="03."
            title={t("sections.skillsTitle")}
            aside={t("sections.skillsAside")}
          />
          <Skills />
        </section>

        {/* ---------- Section Notes ---------- */}
        <section className={styles.block} id="notes">
          <SectionHead
            index="04."
            title={t("sections.notesTitle")}
            aside={t("sections.notesAside")}
          />
          <NotesTeaser locale={locale} />
        </section>

        {/* ---------- Section Distinctions ---------- */}
        <section className={styles.block} id="distinctions">
          <SectionHead
            index="05."
            title={t("sections.distinctionsTitle")}
            aside={t("sections.distinctionsAside")}
          />
          <DistinctionsGridClient />
        </section>
      </div>
    </>
  );
}

/**
 * On délègue à un sous-composant serveur pour récupérer proprement
 * le tableau de distinctions depuis next-intl (rich content).
 */
async function DistinctionsGridClient() {
  const t = await getTranslations("distinctions");

  // next-intl v4 : t.raw() renvoie un objet non-string tel qu'écrit dans le JSON
  const items = t.raw("items") as DistinctionData[];

  return <DistinctionsGrid items={items} />;
}
