import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content}>
        <h1>
          <span className={styles.keyword}>EM</span>
          <span className={styles.function}>P</span>
          <span className={styles.number}>Æ</span>
          <span className={styles.function}>RI</span>
          <span className={styles.number}>AL</span>
        </h1>
        <p>
          <span className={styles.string}>
      
          </span>
        </p>
      </div>
    </section>
  );
};

export default Hero;