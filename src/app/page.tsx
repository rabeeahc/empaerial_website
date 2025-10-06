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
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <Header />
      <Hero />

      <main>
        <>
          <Section className="fade-in" id="about">
            <h2 className={styles.title}>
              <span className={styles.function}>AboutUs</span>()
            </h2>
            <p className={styles.subtitle}>
              <span className={styles.string}>
                Empaerial is a community of international students working on UAVs,
                sharing knowledge and building innovation together.
              </span>
            </p>
          </Section>

          <Section className="fade-in" id="project">
            <h2 className={styles.title}>
            
              <span className={styles.function}>Projects</span>()
            </h2>
            <p className={styles.subtitle}>
              <span className={styles.string}>
                We offer UAV design, prototyping, and collaborative workshops to
                help students innovate and learn.
              </span>
            </p>
          </Section>

          <Section className="fade-in" id="contact">
            <h2 className={styles.title}>
          
              <span className={styles.function}>ContactUs</span>()
            </h2>
            <p className={styles.subtitle}>
              <span className={styles.string}>
                Email us at contact@empaerial.com or follow us on social media.
              </span>
            </p>
          </Section>
        </>
      </main>
    </>
  );
}