'use client';

import { useEffect } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Section from "../components/Section/Section";
import Footer from "../components/Footer/Footer";
import Team from "../components/Team/Team";
import Projects from "../components/Projects/Projects";
import Sponsors from "../components/Sponsors/Sponsors";
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
      <Header />
      <Hero />

      <Section className="fade-in" id="team">
        <Team />
      </Section>

      <Section className="fade-in" id="projects">
        <Projects />
      </Section>

      <Section className="fade-in" id="sponsors">
        <Sponsors />
      </Section>

      <Section className="fade-in" id="contact">
        <h2 className={styles.title}>
          <span className={styles.function}>Contact()</span> {"{"}
        </h2>
        <p className={styles.subtitle}>
          Email us at contact@empaerial.com or follow us on social media.
        </p>
        <h2 className={styles.title}>{"}"}</h2>
      </Section>
    </>
  );
}
