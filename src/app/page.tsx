'use client';

import { useEffect } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Section from "../components/Section/Section";
import Footer from "../components/Footer/Footer";
import styles from "./page.module.css";

export default function Page() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in, section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Hero />

      <Section className="fade-in" id="about">
        <h2 className={styles.title}>
          <span className={styles.function}>About_Us()</span> {"{"}</h2>
        <p className={styles.subtitle}>Empaerial is a community of international students working on UAVs,<br /> sharing knowledge and building innovation together.</p>
        <h2 className={styles.title}>{"}"}</h2>
      </Section>

      <Section className="fade-in" id="services">
        <h2 className={styles.title}>
          <span className={styles.function}>Services()</span> {"{"}</h2>
        <p className={styles.subtitle}>We offer UAV design, prototyping, and collaborative workshops<br /> to help students innovate and learn.</p>
        <h2 className={styles.title}>{"}"}</h2>
      </Section>

      <Section className="fade-in" id="contact">
        <h2 className={styles.title}>
          <span className={styles.function}>Contact()</span> {"{"}</h2>
        <p className={styles.subtitle}>Email us at contact@empaerial.com or follow us on social media.</p>
        <h2 className={styles.title}>{"}"}</h2>
      </Section>
    </>
  );
}
