'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Projects.module.css";

export default function Projects({ t }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className={styles.projectSection} id="projects">
        <div className={styles.header}>
          <h2 className={styles.title}>{t.projects.title}</h2>
          <p className={styles.subtitle}>{t.projects.subtitle}</p>
        </div>
        <p style={{ textAlign: "center", color: "#888" }}>Loading projects...</p>
      </section>
    );
  }

  return (
    <section className={styles.projectSection} id="projects">
      <div className={styles.header}>
        <h2 className={styles.title}>{t.projects.title}</h2>
        <p className={styles.subtitle}>{t.projects.subtitle}</p>
      </div>

      <div className={styles.projectRow}>
        {projects.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No projects found.</p>
        ) : (
          projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.previewImageContainer}>
                <img
                  src={project.image_url || "/images/default-drone.png"}
                  alt={`${project.name} drone image`}
                  className={styles.previewImage}
                />
              </div>
              <div className={styles.projectOverview}>
                <h2>{project.name}</h2>
                <p>{project.summary}</p>
                {project.description && (
                  <Link
                    href={`/${project.slug || "project"}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button className={styles.expandButton}>
                      {t.projects.viewDetails} →
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
