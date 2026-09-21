import { setRequestLocale, getTranslations } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { getProjects } from "@/lib/content";
import { SectionHead } from "@/components/section/SectionHead";
import { ProjectsGrid } from "@/components/project/ProjectsGrid";
import { ProjectCard } from "@/components/project/ProjectCard";

import styles from "./index.module.css";

export default async function WorkIndexPage({
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
    <div className={`wrap ${styles.wrap}`}>
      <SectionHead
        index="—"
        title={t("sections.projectsTitle")}
        aside={t("sections.projectsAside")}
      />
      <ProjectsGrid>
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </ProjectsGrid>
    </div>
  );
}
