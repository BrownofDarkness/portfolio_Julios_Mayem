import type { Locale } from "@/i18n/routing";
import type { ProjectMeta } from "./content";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.julios.dev";

// ── Person ────────────────────────────────────────────────────────────────────

export function personSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/${locale}#julios-mayem`,
    name: "Julios Mayem",
    givenName: "Julios",
    familyName: "Mayem",
    jobTitle: locale === "fr" ? "Ingénieur logiciel" : "Software Engineer",
    description:
      locale === "fr"
        ? "Développeur camerounais spécialisé en vision par ordinateur et IA, diplômé Licence (Très Bien, 1er/25), en poste chez BkSquare SARL depuis 2024."
        : "Cameroonian software engineer specialised in computer vision and AI, bachelor's graduate (highest honours, 1st/25), working at BkSquare SARL since 2024.",
    url: `${BASE}/${locale}`,
    email: "maesjulios@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yaoundé",
      addressCountry: "CM",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Institut Universitaire des Sciences des Technologies et Éthique",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Yaoundé",
          addressCountry: "CM",
        },
      },
      {
        "@type": "EducationalOrganization",
        name: "IUT de Ngaoundéré",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ngaoundéré",
          addressCountry: "CM",
        },
      },
    ],
    award: [
      "Prime présidentielle d'excellence — Licence 1 (2021)",
      "Prime présidentielle d'excellence — Licence 2 (2022)",
      "Prix GDG Ngaoundéré — Quiz IA & Écosystème Google (2022)",
    ],
    knowsAbout: [
      "Computer Vision",
      "OpenCV",
      "Python",
      "Machine Learning",
      "Flutter",
      "Dart",
      "Firebase",
      "MySQL",
      "Android",
      "CI/CD",
      "DevOps",
    ],
    worksFor: {
      "@type": "Organization",
      name: "BkSquare SARL",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Yaoundé",
        addressCountry: "CM",
      },
    },
    sameAs: [
      "https://github.com/BrownofDarkness",
    ],
  };
}

// ── CreativeWork / SoftwareSourceCode ─────────────────────────────────────────

export function projectSchema(project: ProjectMeta, locale: Locale) {
  const projectPath =
    locale === "fr"
      ? `/fr/travail/${project.slug}`
      : `/en/work/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${BASE}${projectPath}#project`,
    name: project.title,
    description: project.summary,
    dateCreated: String(project.year),
    programmingLanguage: project.stack,
    url: `${BASE}${projectPath}`,
    author: {
      "@type": "Person",
      "@id": `${BASE}/${locale}#julios-mayem`,
      name: "Julios Mayem",
    },
    ...(project.client
      ? {
          producer: {
            "@type": "Organization",
            name: project.client,
          },
        }
      : {}),
  };
}
