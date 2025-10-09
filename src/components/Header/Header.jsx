'use client';

import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`${styles.header} ${show ? styles.show : styles.hide}`}>
      <div className={styles.logo}>
        <span className={styles.keyword}>EM</span>
        <span className={styles.function}>P</span>
        <span className={styles.number}>Æ</span>
        <span className={styles.function}>RI</span>
        <span className={styles.number}>AL</span>
      </div>

      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}>
        <a href="#hero" className={styles.function}>Home()</a>
        <a href="#team" className={styles.keyword}>Team()</a>
        <a href="#projects" className={styles.number}>Projects()</a>
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