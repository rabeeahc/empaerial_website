import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content}>
        <h1>Welcome to Empaerial</h1>
        <p>A community of international students working on UAVs.</p>
        <button className={styles.ctaButton}>Get Started</button>
      </div>
    </section>
  );
};

export default Hero;