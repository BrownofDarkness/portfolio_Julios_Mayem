import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import type { SVGProps } from "react";
import styles from "./Socials.module.css";

/**
 * LinkedIn n'est plus fourni par Simple Icons (retrait pour raisons
 * de trademark). On l'inline en SVG minimal, en gardant currentColor
 * pour hériter du thème.
 */
function LinkedinIcon({ size = 22, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * Bloc de liens sociaux — logos SVG uniquement, cliquables.
 * Chaque icône reste monochrome par défaut (muted), passe au bleu
 * au hover. Un aria-label rend le lien lisible pour un lecteur d'écran.
 *
 * URLs actuelles : placeholders — à confirmer avec Julios.
 */

type SocialItem = {
  href: string;
  label: string;
  Icon: (props: { size?: number; className?: string }) => React.ReactElement;
};

const items: SocialItem[] = [
  {
    href: "https://github.com/BrownofDarkness",
    label: "GitHub",
    Icon: SiGithub as unknown as SocialItem["Icon"],
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
  {
    href: "https://twitter.com/",
    label: "X",
    Icon: SiX as unknown as SocialItem["Icon"],
  },
];

type SocialsProps = {
  size?: number;
  className?: string;
};

export function Socials({ size = 22, className }: SocialsProps) {
  return (
    <ul className={`${styles.list} ${className ?? ""}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={styles.link}
          >
            <Icon size={size} className={styles.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
