'use client';

import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Section from "../components/Section/Section";
import Footer from "../components/Footer/Footer";
import Team from "../components/Team/Team";
import Projects from "../components/Projects/Projects";
import Sponsors from "../components/Sponsors/Sponsors";
import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";
import styles from "./page.module.css";

import en from "@/translations/en.json";
import tr from "@/translations/tr.json";

export default function Page() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const userLang = navigator.language.startsWith("tr") ? "tr" : "en";
    setLang(userLang);
  }, []);

  const t = lang === "tr" ? tr : en;

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in, section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} />

      {}
      <Hero/>

      <Section className="fade-in" id="team">
        <Team t={t} />
      </Section>

      <Section className="fade-in" id="projects">
        <Projects t={t} />
      </Section>

      <Section className="fade-in" id="sponsors">
        <Sponsors t={t} />
      </Section>

      <Section className="fade-in" id="contact">
        <h2 className={styles.title}>
          <span className={styles.function}>{t.contact_title}</span>
        </h2>

        <p className={styles.subtitle}>{t.contact_text}</p>

        <h2 className={styles.title}>{t.contact_end}</h2>
      </Section>

      <Footer t={t} />
    </>
  );
}
