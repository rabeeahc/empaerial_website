'use client';

import React from "react";
import styles from "./Sponsors.module.css";

export default function Sponsors({ t }) {
  const sponsors = [
    "image1",
    "image2",
    "image3",
    "image4",
  ];

  return (
    <section className={styles.sponsorsSection}>
      <h2 className={styles.title}>{t.sponsors_title}</h2>
      <div className={styles.carousel}>
        <div className={styles.track}>
          {sponsors.concat(sponsors).map((logo, index) => (
            <div key={index} className={styles.logoWrapper}>
              <img src={logo} alt={`Sponsor ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
