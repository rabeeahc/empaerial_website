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

    
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data && typeof data === "object" && Array.isArray(data.projects)) {
          
          setProjects(data.projects);
        } else {
          console.warn("⚠️ Unexpected API format:", data);
          setProjects([]);
        }
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
        setProjects([]);
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
        {!Array.isArray(projects) || projects.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No projects found.</p>
        ) : (
          projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.previewImageContainer}>
                <img
                  src={project.image_url || "/images/default-drone.png"}
                  alt={`${project.name || "Project"} drone image`}
                  className={styles.previewImage}
                />
              </div>

              <div className={styles.projectOverview}>
                <h2>{project.name || "Untitled Project"}</h2>
                <p>{project.summary || "No summary available."}</p>

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
