import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.keyword}>CONST</span>{" "}
        <span className={styles.variable}>EMPÆRIAL</span>{" "}
        <span className={styles.function}>=</span>{" "}
        <span className={styles.string}>"UAV Team"</span>
      </div>
      <nav className={styles.nav}>
        <a href="#hero" className={styles.function}>Home()</a>
        <a href="#about" className={styles.keyword}>About()</a>
        <a href="#project" className={styles.variable}>Project()</a>
        <a href="#contact" className={styles.string}>Contact()</a>
      </nav>
    </header>
  );
};

export default Header;