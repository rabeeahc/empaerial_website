'use client';

import React, { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import styles from "../DronePage.module.css";

import en from "@/translations/en.json";
import tr from "@/translations/tr.json";

export default function VespasianPage() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const userLang = navigator.language.startsWith("tr") ? "tr" : "en";
    setLang(userLang);
  }, []);

  const t = lang === "tr" ? tr : en;

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} />
      <main className={styles.fullPage}>
        <div className={styles.imageContainer}>
          <div className={styles.imageGrid}>
            <img src="/images/vespasian1.png" alt="Vespasian drone front view" />
            <img src="/images/vespasian2.png" alt="Vespasian drone side view" />
            <img src="/images/vespasian3.png" alt="Vespasian drone top view" />
          </div>
        </div>

        <div className={styles.detailsContainer}>
          <h1 className={styles.title}>VESPASIAN</h1>
          <p className={styles.subtitle}>
            {t.vespasian?.subtitle ||
              "A modular, lightweight quadcopter engineered for precision and endurance."}
          </p>

          <div className={styles.detailsSection}>
            <h2>{t.vespasian?.specifications || "Specifications"}</h2>
            <div className={styles.specGrid}>
              <div>
                <strong>{t.vespasian?.specs?.weight || "Weight"}:</strong> 970 g / 0.97 kg
              </div>
              <div>
                <strong>{t.vespasian?.specs?.max_takeoff || "Max Takeoff Weight"}:</strong> 2.5 kg
              </div>
              <div>
                <strong>{t.vespasian?.specs?.flight_duration || "Flight Duration"}:</strong> 16.4 minutes
              </div>
              <div>
                <strong>{t.vespasian?.specs?.frame_length || "Frame Length"}:</strong> 478.28 mm
              </div>
              <div>
                <strong>{t.vespasian?.specs?.height || "Height"}:</strong> 157.76 mm
              </div>
            </div>
          </div>

          <div className={styles.detailsSection}>
            <h2>{t.vespasian?.materials || "Materials"}</h2>
            <div className={styles.bomTable}>
              <div className={styles.bomRow}>
                <span>{t.projects.vespasian.bom.arms}</span>
                <span>10/8 3K Carbon Fiber</span>
              </div>
              <div className={styles.bomRow}>
                <span>{t.projects.vespasian.bom.motor_mounts}</span>
                <span>Standard PLA Plastic</span>
              </div>
              <div className={styles.bomRow}>
                <span>{t.projects.vespasian.bom.arm_to_chassis}</span>
                <span>Standard PLA Plastic</span>
              </div>
              <div className={styles.bomRow}>
                <span>{t.projects.vespasian.bom.chassis}</span>
                <span>Standard PLA Plastic</span>
              </div>
              <div className={styles.bomRow}>
                <span>{t.projects.vespasian.bom.escs}</span>
                <span>20A SimonK</span>
              </div>
              <div className={styles.bomRow}>
                <span>{t.projects.vespasian.bom.motors}</span>
                <span>EMAX A2212 980KV</span>
              </div>
              <div className={styles.bomRow}>
                <span>{t.projects.vespasian.bom.battery}</span>
                <span>RC Master 2200 mAh 30C Li-Po</span>
              </div>
              <div className={styles.bomRow}>
                <span>{t.projects.vespasian.bom.props}</span>
                <span>Plastic 1045</span>
              </div>
              <div className={styles.bomRow}>
                <span>{t.projects.vespasian.bom.controller}</span>
                <span>ESP32S</span>
              </div>
              <div className={styles.bomRow}>
                <span>{t.projects.vespasian.bom.firmware}</span>
                <span>ESP-FC (by RTLopez) Betaflight compatible</span>
              </div>
            </div>
          </div>

          <div className={styles.detailsSection}>
            <h2>{t.vespasian?.about || "About the Project"}</h2>
            <p>
              {t.vespasian?.about_text ||
                "Details on this project will be uploaded soon."}
            </p>
          </div>

          <div className={`${styles.detailsSection} ${styles.contactCard}`}>
            <h2>{t.vespasian?.contact_title || "Interested in Vespasian?"}</h2>
            <p>
              {t.vespasian?.contact_text ||
                "For collaborations, sponsorships, or limited-batch availability, reach out to us."}
            </p>
            <div className={styles.contactActions}>
              <a href="mailto:empaerial.uav@gmail.com" className={styles.primaryBtn}>
                {t.vespasian?.email_us || "Email Us"}
              </a>
              <a href="/#contact" className={styles.secondaryBtn}>
                {t.vespasian?.contact_section || "Contact Section →"}
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
