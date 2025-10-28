'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import styles from './Header.module.css';
import SearchBar from '../Search/SearchBar';

const Header = ({ t, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchRef = useRef(null);

  const toggleMenu = () => setIsOpen((o) => !o);
  const closeMenu = () => setIsOpen(false);

  const searchData = useMemo(
    () => [
      { title: 'Home', link: '/' },
      { title: 'Blogs', link: '/blogs' },
      { title: 'Projects', link: '/#projects' },
      { title: 'Sponsors', link: '/#sponsors' },
      { title: 'Contact', link: '/#contact' },
    ],
    []
  );

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
    const onDocClick = (e) => {
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

  const handleNavClick = (e, id) => {
    e.preventDefault();
    closeMenu();

    // Blog page link (open as a page, not scroll)
    if (id === 'blogs') {
      window.location.href = '/blogs';
      return;
    }

    // Scroll smoothly if on homepage
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
    } else {
      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`${styles.header} ${show ? styles.show : styles.hide}`}
      role="banner"
    >
      <div className={styles.container}>
        <a href="/" className={styles.logo} onClick={closeMenu}>
          <img
            src="/images/logo.png"
            alt="Empaerial logo"
            className={styles.logoImage}
          />
        </a>

        <nav
          className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <a
            href="/#hero"
            className={`${styles.navLink} ${styles.function}`}
            onClick={(e) => handleNavClick(e, 'hero')}
          >
            {t.nav_home}
          </a>

          {}
          <a
            href="/blogs"
            className={`${styles.navLink} ${styles.keyword}`}
            onClick={(e) => handleNavClick(e, 'blogs')}
          >
            {t.nav_blogs}
          </a>

          <a
            href="/#projects"
            className={`${styles.navLink} ${styles.number}`}
            onClick={(e) => handleNavClick(e, 'projects')}
          >
            {t.nav_projects}
          </a>

          <a
            href="/#contact"
            className={`${styles.navLink} ${styles.string}`}
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            {t.nav_contact}
          </a>

          <div className={styles.searchArea} ref={searchRef}>
            <SearchBar data={searchData} />
          </div>

          <div className={styles.langSwitch}>
            <span
              onClick={() => setLang('en')}
              style={{
                color:
                  lang === 'en' ? 'var(--function)' : 'rgba(214,197,197,0.8)',
              }}
              role="button"
              tabIndex={0}
              aria-label="Switch to English"
            >
              EN
            </span>
            <span>|</span>
            <span
              onClick={() => setLang('tr')}
              style={{
                color:
                  lang === 'tr' ? 'var(--function)' : 'rgba(214,197,197,0.8)',
              }}
              role="button"
              tabIndex={0}
              aria-label="Switch to Turkish"
            >
              TR
            </span>
          </div>
        </nav>

        <div
          className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          role="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
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
