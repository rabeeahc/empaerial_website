'use client';
import { useState, useEffect } from 'react';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher({ setLang }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const browserLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
    setLanguage(browserLang);
    setLang(browserLang);
  }, [setLang]);

  const handleSwitch = (lang) => {
    setLanguage(lang);
    setLang(lang);
  };

  return (
    <div className={styles.langSwitch}>
      <span
        onClick={() => handleSwitch('en')}
        style={{
          color:
            language === 'en'
              ? 'var(--function)'
              : 'rgba(255,255,255,0.7)',
        }}
      >
        EN
      </span>
      <span>|</span>
      <span
        onClick={() => handleSwitch('tr')}
        style={{
          color:
            language === 'tr'
              ? 'var(--function)'
              : 'rgba(255,255,255,0.7)',
        }}
      >
        TR
      </span>
    </div>
  );
}
