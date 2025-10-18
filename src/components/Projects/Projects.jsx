'use client';

import React from "react";
import styles from "./Projects.module.css";

export default function Projects({ t }) {
  const projectData = [
    {
      name: t.projects_vespasian_name,
      description: t.projects_vespasian_desc,
      image: "/images/vespasian.png",
      specs: {
        Weight: "0.97 kg",
        Max: "2.5 kg",
        Flight: "16.4 mins",
        Height: "157.76 mm",
      },
      bom: [
        { part: t.bom_motor_mounts, qty: 4 },
        { part: t.bom_propeller, qty: 4 },
        { part: t.bom_flight_controller, qty: 1 },
      ],
    },
    {
      name: t.projects_comingsoon_name,
      description: t.projects_comingsoon_desc,
      image: "/images/comingsoon.png",
      specs: { Weight: "?", Max: "?", Flight: "?" },
      bom: [
        { part: t.bom_motor, qty: 0 },
        { part: t.bom_propeller, qty: 0 },
        { part: t.bom_flight_controller, qty: 0 },
      ],
    },
  ];

  return (
    <div className={styles.projectsSection}>
      <h2 className={styles.title}>{t.projects_title}</h2>
      <p className={styles.subtitle}>{t.projects_subtitle}</p>

      <div className={styles.cardsContainer}>
        {projectData.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <img src={project.image} alt={project.name} className={styles.projectImage} />
            <h3 className={styles.projectName}>{project.name}</h3>
            <p className={styles.projectDesc}>{project.description}</p>

            <div className={styles.specs}>
              <h4>{t.specs_title}</h4>
              <ul>
                {Object.entries(project.specs).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.bom}>
              <h4>{t.bom_title}</h4>
              <table>
                <thead>
                  <tr>
                    <th>{t.bom_part}</th>
                    <th>{t.bom_qty}</th>
                  </tr>
                </thead>
                <tbody>
                  {project.bom.map((item, i) => (
                    <tr key={i}>
                      <td>{item.part}</td>
                      <td>{item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
