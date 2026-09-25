/**
 * Injecte un bloc JSON-LD dans le <head> via un script inline.
 * Composant serveur — pas de "use client".
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
