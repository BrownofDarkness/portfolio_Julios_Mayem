import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { AnchorHTMLAttributes } from "react";
import { Figure } from "./Figure";
import { Callout } from "./Callout";
import styles from "./mdx.module.css";

/**
 * Anchor MDX — détecte les liens externes et ajoute un petit
 * marqueur ↗ discret. Applique aussi rel/noopener automatiquement.
 */
function MdxA(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href = "", children, ...rest } = props;
  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http://") || href.startsWith("https://"));

  if (isExternal) {
    return (
      <a
        className={styles.a}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
        <span className={styles.aExt} aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <a className={styles.a} href={href} {...rest}>
      {children}
    </a>
  );
}

/**
 * Composants MDX exposés au corps des case studies et notes.
 * On surcharge les balises HTML natives pour appliquer notre
 * design system (h1, h2, h3, p, ul, ol, code, blockquote, etc.)
 * et on expose Figure/Callout pour un usage explicite.
 */
export const mdxComponents: MDXRemoteProps["components"] = {
  h1: (props) => <h1 className={styles.h1} {...props} />,
  h2: (props) => <h2 className={styles.h2} {...props} />,
  h3: (props) => <h3 className={styles.h3} {...props} />,
  p:  (props) => <p className={styles.p} {...props} />,
  a: MdxA,
  ul: (props) => <ul className={styles.ul} {...props} />,
  ol: (props) => <ol className={styles.ol} {...props} />,
  li: (props) => <li className={styles.li} {...props} />,
  blockquote: (props) => <blockquote className={styles.quote} {...props} />,
  code: (props) => <code className={styles.code} {...props} />,
  pre:  (props) => <pre className={styles.pre} {...props} />,
  hr:   () => <hr className={styles.hr} />,
  strong: (props) => <strong className={styles.strong} {...props} />,
  em: (props) => <em className={styles.em} {...props} />,
  Figure,
  Callout,
};
