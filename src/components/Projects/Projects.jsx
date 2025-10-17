'use client';

import React from "react";
import styles from "./Projects.module.css";

const projectData = [
  {
    name: "VESPASIAN",
    description: "Drone description",
    image: "image",
    specs: { Weight: "0.97 kg", Max: "2.5 kg", Flight: "16.4 mins", Height: "157.76mm"},
    bom: [
      { part: "Motor Mounts", qty: 4 },
      { part: "Propeller", qty: 4 },
      { part: "Flight Controller", qty: 1 },
    ],
  },
  {
    name: "Coming Soon",
    description: "Drone description",
    image: "image",
    specs: { weight: "?", wingspan: "?", battery: "?" },
    bom: [
      { part: "Motor", qty: 0},
      { part: "Propeller", qty: 0 },
      { part: "Flight Controller", qty: 0 },
    ],
  },
];

export default function Projects() {
  return (
    <div className={styles.projectsSection}>
      <h2 className={styles.title}>Drones in Action</h2>
      <p className={styles.subtitle}>
        Here we showcase the drones we are building and those completed, including images, specs, and BOM.
      </p>

      <div className={styles.cardsContainer}>
        {projectData.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <img src={project.image} alt={project.name} className={styles.projectImage} />
            <h3 className={styles.projectName}>{project.name}</h3>
            <p className={styles.projectDesc}>{project.description}</p>
            <div className={styles.specs}>
              <h4>Specs:</h4>
              <ul>
                {Object.entries(project.specs).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </div>
            <div className={styles.bom}>
              <h4>BOM:</h4>
              <table>
                <thead>
                  <tr>
                    <th>Part</th>
                    <th>Quantity</th>
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