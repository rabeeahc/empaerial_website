'use client';

import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';

const Header = ({ t, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(o => !o);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) setShow(false);
      else setShow(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const onDocClick = e => {
      if (
        isOpen &&
        !e.target.closest(`.${styles.nav}`) &&
        !e.target.closest(`.${styles.hamburger}`)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [isOpen]);

  return (
    <header className={`${styles.header} ${show ? styles.show : styles.hide}`}>
      <div className={styles.container}>
        {}
        <a href="/" className={styles.logo} onClick={closeMenu}>
          <img src="/images/logo.png" alt="Empaerial Logo" className={styles.logoImage} />
        </a>

        {}
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <a href="#hero" className={`${styles.navLink} ${styles.function}`} onClick={closeMenu}>
            {t.nav_home}
          </a>
          <a href="#team" className={`${styles.navLink} ${styles.keyword}`} onClick={closeMenu}>
            {t.nav_team}
          </a>
          <a href="#projects" className={`${styles.navLink} ${styles.number}`} onClick={closeMenu}>
            {t.nav_projects}
          </a>
          <a href="#contact" className={`${styles.navLink} ${styles.string}`} onClick={closeMenu}>
            {t.nav_contact}
          </a>

          {}
          <div className={styles.langSwitch}>
            <span
              onClick={() => setLang('en')}
              style={{ color: lang === 'en' ? 'var(--function)' : 'rgba(214,197,197,0.8)' }}
            >
              EN
            </span>
            <span>|</span>
            <span
              onClick={() => setLang('tr')}
              style={{ color: lang === 'tr' ? 'var(--function)' : 'rgba(214,197,197,0.8)' }}
            >
              TR
            </span>
          </div>
        </nav>

        {}
        <div
          className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
