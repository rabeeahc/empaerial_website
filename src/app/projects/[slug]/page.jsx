'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header/Header';
import styles from '@/app/DronePage.module.css';
import en from '@/translations/en.json';
import tr from '@/translations/tr.json';

export default function ProjectDetails() {
  const { slug } = useParams();
  const [lang, setLang] = useState('en');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
    setLang(userLang);
  }, []);

  const t = lang === 'tr' ? tr : en;

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        const data = await res.json();
        const found = data.find((p) => p.slug === slug);
        setProject(found);
      } catch (err) {
        console.error('❌ Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>;
  if (!project) return <p style={{ padding: '2rem' }}>Project not found.</p>;

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} />
      <main className={styles.fullPage}>
        {/* 📸 Gallery */}
        <div className={styles.imageContainer}>
          <div className={styles.imageGrid}>
            {Array.isArray(project.sections) &&
              project.sections
                .filter((s) => s.type === 'gallery')
                .flatMap((s) => s.data.images || [])
                .map((src, i) => (
                  <img key={i} src={src} alt={`${project.name} view ${i + 1}`} />
                ))}
          </div>
        </div>

        {/* 🧾 Details */}
        <div className={styles.detailsContainer}>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.subtitle}>
            {project.summary ||
              'A modular, lightweight quadcopter engineered for precision and endurance.'}
          </p>

          {/* 🧩 Specs */}
          {project.sections
            ?.filter((s) => s.type === 'specs')
            .map((s, i) => (
              <div key={i} className={styles.detailsSection}>
                <h2>{t.vespasian?.specifications || 'Specifications'}</h2>
                <div className={styles.specGrid}>
                  {Object.entries(s.data).map(([key, val]) => (
                    <div key={key}>
                      <strong>{key.replaceAll('_', ' ')}:</strong> {val || 'N/A'}
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* 🧱 Materials */}
          {project.sections
            ?.filter((s) => s.type === 'materials')
            .map((s, i) => (
              <div key={i} className={styles.detailsSection}>
                <h2>{t.vespasian?.materials || 'Materials'}</h2>
                <div className={styles.bomTable}>
                  {Object.entries(s.data).map(([key, val]) => (
                    <div key={key} className={styles.bomRow}>
                      <span>{key}</span>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* 📝 Text sections */}
          {project.sections
            ?.filter((s) => s.type === 'text')
            .map((s, i) => (
              <div key={i} className={styles.detailsSection}>
                <h2>{s.data.heading || 'About the Project'}</h2>
                <p>{s.data.content || 'Details coming soon.'}</p>
              </div>
            ))}

          {/* ✉️ Contact */}
          {project.sections
            ?.filter((s) => s.type === 'contact')
            .map((s, i) => (
              <div
                key={i}
                className={`${styles.detailsSection} ${styles.contactCard}`}
              >
                <h2>
                  {t.vespasian?.contact_title ||
                    `Interested in ${project.name}?`}
                </h2>
                <p>
                  {t.vespasian?.contact_text ||
                    'For collaborations or sponsorships, contact us.'}
                </p>
                <div className={styles.contactActions}>
                  <a
                    href={`mailto:${s.data.email}`}
                    className={styles.primaryBtn}
                  >
                    {t.vespasian?.email_us || 'Email Us'}
                  </a>
                  <a href={s.data.link} className={styles.secondaryBtn}>
                    {t.vespasian?.contact_section || 'Contact Section →'}
                  </a>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
