import type { Locale } from "@/i18n/routing";
import type { PublicationMeta } from "./content";

const KIND_LABELS: Record<PublicationMeta["kind"], Record<Locale, string>> = {
  article:    { fr: "article",                en: "article" },
  experience: { fr: "retour d'expérience",    en: "experience report" },
  watch:      { fr: "note de veille",         en: "tech watch" },
  research:   { fr: "recherche appliquée",    en: "applied research" },
};

export function publicationKindLabel(kind: PublicationMeta["kind"], locale: Locale) {
  return KIND_LABELS[kind][locale];
}

/** Date affichée, ou « bientôt » tant que le texte n'est pas publié. */
export function publicationDateLabel(
  p: Pick<PublicationMeta, "status" | "date">,
  locale: Locale
) {
  if (p.status !== "published") return locale === "fr" ? "bientôt" : "coming soon";
  return p.date;
}
