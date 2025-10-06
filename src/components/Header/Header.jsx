'use client';

import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.keyword}>EM</span>
        <span className={styles.function}>P</span>
        <span className={styles.number}>Æ</span>
        <span className={styles.function}>RI</span>
        <span className={styles.number}>AL</span>
      </div>

      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}>
        <a href="#hero" className={styles.function}>Home()</a>
        <a href="#about" className={styles.keyword}>About()</a>
        <a href="#project" className={styles.variable}>Project()</a>
        <a href="#contact" className={styles.string}>Contact()</a>
      </nav>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
