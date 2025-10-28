'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ data = [] }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return data.filter((item) =>
      item.title.toLowerCase().includes(q)
    );
  }, [query, data]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const goTo = (link) => {
    if (!link) return;
    const id = link.startsWith('#') ? link.slice(1) : link;

    if (window.location.pathname !== '/') {
      window.location.href = `/${link}`;
    } else {
      const el = document.getElementById(id);
      if (el) {
        history.pushState(null, '', link);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      goTo(results[0].link);
      setQuery('');
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (e, item) => {
    e.preventDefault();
    goTo(item.link);
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className={styles.searchWrap} ref={wrapRef}>
      <input
        ref={inputRef}
        className={`${styles.input} searchInput`}
        type="search"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query && setOpen(true)}
        onKeyDown={handleKeyDown}
        aria-label="Search site"
      />

      {open && results.length > 0 && (
        <ul className={styles.dropdown} role="listbox">
          {results.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.link}
                className={styles.item}
                onMouseDown={(e) => handleSelect(e, item)}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
