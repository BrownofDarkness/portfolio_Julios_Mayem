import type { MDXComponents } from "mdx/types";

/**
 * Composants MDX partagés — hérités par tout MDX importé.
 * En Phase 2, on remplacera par nos vrais composants
 * (Figure, Metric, Callout, SideMeta).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
