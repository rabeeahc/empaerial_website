import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <a href="https://www.instagram.com/_empaerial_" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        {"|" }
        <a href="https://www.linkedin.com/company/emp%C3%A6rial/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
      <p>© 2025 Empaerial. All rights reserved.</p>
    </footer>
  );
};

export default Footer;