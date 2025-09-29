import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content}>
        <h1>WelcoSme to Empaerial</h1>
        <p>Innovative solutions for your business</p>
        <button className={styles.cta}>Get Started</button>
      </div>
    </section>
  );
};

export default Hero;
