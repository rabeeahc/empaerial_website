import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.line}>
        <span className={styles.comment}>// Follow us on social media</span>
      </p>
      <div className={styles.social}>
        <a
          href="https://www.instagram.com/_empaerial_"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.function}
        >
          Instagram()
        </a>
        <a
          href="https://www.linkedin.com/company/emp%C3%A6rial/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.keyword}
        >
          LinkedIn()
        </a>
        <a
          href="https://www.youtube.com/@Emp%C3%A6rial_UAV"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.number}
        >
          YouTube()
        </a>
      </div>
      <p className={styles.copy}>
        <span className={styles.variable}>return</span>{" "}
        <span className={styles.string}>
          "© 2025 Empaerial. All rights reserved."
        </span>
      </p>
    </footer>
  );
};

export default Footer;