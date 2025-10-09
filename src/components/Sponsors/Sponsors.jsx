'use client';

import React from "react";
import styles from "./Sponsors.module.css";

const sponsors = [
  "/images/sponsor1.png",
  "/images/sponsor2.png",
  "/images/sponsor3.png",
  "/images/sponsor4.png",
  "/images/sponsor5.png",
];

export default function Sponsors() {
  return (
    <section className={styles.sponsorsSection}>
      <h2 className={styles.title}>Sponsors</h2>
      <div className={styles.carousel}>
        <div className={styles.track}>
          {}
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
