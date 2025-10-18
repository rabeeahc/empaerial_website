import React from "react";
import styles from "./Footer.module.css";

export default function Footer({ t }) {
  return (
    <footer className={styles.footer}>
      <p className={styles.line}>
        <span className={styles.comment}>// {t.footer_follow}</span>
      </p>

      <div className={styles.social}>
        <a
          href="https://www.instagram.com/_empaerial_"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.function}
        >
          {t.footer_instagram}
        </a>
        <a
          href="https://www.linkedin.com/company/emp%C3%A6rial/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.keyword}
        >
          {t.footer_linkedin}
        </a>
        <a
          href="https://www.youtube.com/@Emp%C3%A6rial_UAV"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.number}
        >
          {t.footer_youtube}
        </a>
      </div>

      <p className={styles.copy}>
        <span className={styles.variable}>return</span>{" "}
        <span className={styles.string}>{t.footer_copyright}</span>
      </p>
    </footer>
  );
}
