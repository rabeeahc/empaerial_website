'use client';

import { useEffect, useState } from 'react';
import styles from './SearchPage.module.css';
import en from '@/translations/en.json';
import tr from '@/translations/tr.json';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [lang, setLang] = useState('en');
  const t = lang === 'tr' ? tr : en;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q')?.toLowerCase() || '';
    setQuery(q);
    const siteData = [
      { title: t.nav_home, section: 'Home', link: '/' },
      { title: t.nav_team, section: 'Blogs', link: '/#blogs' },
      { title: t.nav_projects, section: 'Projects', link: '/#projects' },
      { title: t.nav_contact, section: 'Contact', link: '/#contact' },
      { title: t.sponsors_title, section: 'Sponsors', link: '/#sponsors' },
      { title: 'Empaerial UAV', section: 'Hero', link: '/#hero' },
      { title: 'Vespasian Drone', section: 'Projects', link: '/#projects' },
    ];

    const filtered = siteData.filter((item) =>
      item.title.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, []);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>
        Results for <span>"{query}"</span>
      </h1>

      {results.length > 0 ? (
        <ul className={styles.results}>
          {results.map((r, i) => (
            <li key={i}>
              <a href={r.link}>
                {r.title} <span>({r.section})</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noResults}>No matches found 😢</p>
      )}
    </main>
  );
}
