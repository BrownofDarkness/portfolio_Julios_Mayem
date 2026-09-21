import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { Figure } from "./Figure";
import { Callout } from "./Callout";
import styles from "./mdx.module.css";

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
  a:  (props) => <a className={styles.a} {...props} />,
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
