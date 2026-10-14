import type { Locale } from "@/i18n/routing";
import type { ProjectMeta } from "./content";

import { SITE_URL as BASE, FULL_NAME } from "./site";

// ── Person ────────────────────────────────────────────────────────────────────

export function personSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/${locale}#julios-mayem`,
    name: FULL_NAME,
    alternateName: [
      "Julios Mayem",
      "Mayem Julios",
      "MAYEM YOTA TAMESSUING",
      "Julios Mayem Yota Tamessuing",
    ],
    givenName: "Julios",
    familyName: "Mayem Yota Tamessuing",
    jobTitle: locale === "fr" ? "Développeur logiciel et bases de données" : "Software Developer & Databases",
    description:
      locale === "fr"
        ? "Développeur informatique camerounais spécialisé en génie logiciel, bases de données, applications métier et reconnaissance faciale. En poste chez BkSquare SARL depuis 2024."
        : "Cameroonian software developer specialised in software engineering, databases, business applications and facial recognition. Working at BkSquare SARL since 2024.",
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
        name: "Institut universitaire des sciences, des technologies et de l'éthique (IUSTE)",
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
    ],
    knowsAbout: [
      "Computer Vision",
      "OpenCV",
      "Python",
      "SQL",
      "Génie logiciel",
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
      "https://github.com/Devmaes",
      "https://www.linkedin.com/in/julios-mayem-yota-tamessuing-4700322b2",
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
    ...(project.repo ? { codeRepository: project.repo } : {}),
    author: {
      "@type": "Person",
      "@id": `${BASE}/${locale}#julios-mayem`,
      name: FULL_NAME,
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
