import {
  SiPython,
  SiC,
  SiCplusplus,
  SiOpenjdk,
  SiDart,
  SiPhp,
  SiJavascript,
  SiFlutter,
  SiAndroid,
  SiMysql,
  SiSqlite,
  SiFirebase,
  SiOpencv,
  SiGit,
  SiGithub,
  SiArduino,
} from "@icons-pack/react-simple-icons";
import { getTranslations } from "next-intl/server";
import styles from "./Skills.module.css";

/**
 * Compétences — mosaïque de logos SVG regroupés par catégorie.
 * Chaque tuile reste monochrome par defaut, se colore en brand
 * color au hover.
 * Base : CV de Julios (langages, frameworks, outils, embarque).
 */

type Skill = {
  name: string;
  Icon: typeof SiPython;
  color: string;
};

const languages: Skill[] = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "C", Icon: SiC, color: "#A8B9CC" },
  { name: "C++", Icon: SiCplusplus, color: "#00599C" },
  { name: "Java", Icon: SiOpenjdk, color: "#EA2D2E" },
  { name: "Dart", Icon: SiDart, color: "#0175C2" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
];

const frameworks: Skill[] = [
  { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
  { name: "Android", Icon: SiAndroid, color: "#3DDC84" },
  { name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8" },
];

const data: Skill[] = [
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "SQLite", Icon: SiSqlite, color: "#003B57" },
  { name: "Firebase", Icon: SiFirebase, color: "#DD2C00" },
];

const tools: Skill[] = [
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#E8EAEE" },
  { name: "Arduino", Icon: SiArduino, color: "#00979D" },
];

function SkillGroup({
  title,
  items,
}: {
  title: string;
  items: Skill[];
}) {
  return (
    <div className={styles.group}>
      <div className={styles.groupLabel}>{title}</div>
      <div className={styles.tiles}>
        {items.map(({ name, Icon, color }) => (
          <div
            key={name}
            className={styles.tile}
            style={{ ["--brand" as string]: color }}
          >
            <Icon size={22} className={styles.icon} />
            <span className={styles.name}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function Skills() {
  const t = await getTranslations("skills");

  return (
    <div className={styles.wrap}>
      <p className={styles.lead}>{t("lead")}</p>

      <div className={styles.groups}>
        <SkillGroup title={t("groups.languages")} items={languages} />
        <SkillGroup title={t("groups.frameworks")} items={frameworks} />
        <SkillGroup title={t("groups.data")} items={data} />
        <SkillGroup title={t("groups.tools")} items={tools} />
      </div>
    </div>
  );
}
