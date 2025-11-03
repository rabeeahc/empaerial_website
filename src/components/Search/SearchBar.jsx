'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ data = [] }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const isMac =
    typeof window !== 'undefined' &&
    navigator.platform.toUpperCase().includes('MAC');


  const teamMembers = [
    { title: 'Rabeeah Chishti', link: 'https://www.linkedin.com/in/rabeeah-chishti/', type: 'linkedin' },
     { title: 'Abdullah Amin', link: 'https://www.linkedin.com/in/abdullah-milad', type: 'linkedin' },
    { title: 'Najibullah Muhammadi', link: 'https://www.linkedin.com/in/najib-muhammadi-/', type: 'linkedin' },
    { title: 'John Ricky', link: 'https://www.linkedin.com/in/john-ricky-433367335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', type: 'linkedin' },
    { title: 'Ahmed Mulki', link: 'https://www.linkedin.com/in/ahmed-mulki-393a3b389/', type: 'linkedin' },
    { title: 'Azra Dika', link: 'https://www.linkedin.com/in/f-azra-dika-2786011b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', type: 'linkedin' },
    { title: 'Aine-Mukama Katureebe', link: 'https://www.linkedin.com/in/aine-mukama-rwankurukumbi-katureebe-083939264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', type: 'linkedin' },
    { title: 'William Amani', link: 'https://linkedin.com/in/william-amani-363ba12a5', type: 'linkedin' },
    { title: 'Zawadi Wafula', link: 'https://www.linkedin.com/in/zawadi-wafula-956493265/', type: 'linkedin' },
    { title: 'Ahmed Osman Mahamoud', link: 'https://www.linkedin.com/in/aom99/', type: 'linkedin' },
    { title: 'Henry Christophe', link: 'https://www.linkedin.com/in/henry-christophe-ndahirwa-b80015288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', type: 'linkedin' },
    { title: 'Hilmi Kabir', link: 'https://www.linkedin.com/in/hilmikabir', type: 'linkedin' },
    { title: 'Lujain Nofal', link: 'https://www.linkedin.com/in/lujain-nofal-33a708387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', type: 'linkedin' },
    { title: 'Aboubacar Sow', link: 'https://www.linkedin.com/in/aboubacar-sow-853a7b25b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', type: 'linkedin' },
  ];


  const staticProjects = [
    { title: 'Vespasian', link: '/vespasian', type: 'project' },
  ];


  const fullData = [...teamMembers, ...staticProjects, ...data];


  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return fullData.filter((item) =>
      item.title.toLowerCase().includes(q)
    );
  }, [query, fullData]);

 
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
      if (
        (isMac && e.metaKey && e.key.toLowerCase() === 'k') ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k')
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
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
  }, [isMac]);


  const goTo = (link, type) => {
    if (!link) return;
    window.location.href = link; 
  };

 
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      const item = results[0];
      goTo(item.link, item.type);
      setQuery('');
      setOpen(false);
      inputRef.current?.blur();
    }
  };


  const handleSelect = (e, item) => {
    e.preventDefault();
    goTo(item.link, item.type);
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className={styles.searchWrap} ref={wrapRef}>
      <input
        ref={inputRef}
        className={styles.input}
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
              <button
                type="button"
                className={styles.item}
                onClick={(e) => handleSelect(e, item)}
              >
                <span>{item.title}</span>
                <span className={styles.badge}>
                  {item.type === 'linkedin'
                    ? '👥 Team'
                    : item.type === 'project'
                    ? '🚁 Project'
                    : '📄 Page'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
