"use client";
import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer({ t }) {
  return (
    <footer className={styles.footer} role="contentinfo">
      {/* 💬 Comment line */}
      <p className={styles.line}>
        <span className={styles.comment}>// {t.footer_follow}</span>
      </p>

      {/* 🌐 Social Media Links */}
      <div className={styles.social} aria-label="Social media links">
        <a
          href="https://www.instagram.com/_empaerial_"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.function}
          aria-label="Follow Empaerial on Instagram"
        >
          {t.footer_instagram}
        </a>
        <a
          href="https://www.linkedin.com/company/emp%C3%A6rial/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.keyword}
          aria-label="Connect with Empaerial on LinkedIn"
        >
          {t.footer_linkedin}
        </a>
        <a
          href="https://www.youtube.com/@Emp%C3%A6rial_UAV"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.number}
          aria-label="Visit Empaerial YouTube channel"
        >
          {t.footer_youtube}
        </a>
      </div>

      {/* ⚙️ Copyright line */}
      <p className={styles.copy}>
        {/* 🔒 Hidden Admin Login link */}
        <Link
          href="/admin-login"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <span className={styles.variable}>return</span>
        </Link>{" "}
        <span className={styles.string}>{t.footer_copyright}</span>
      </p>
    </footer>
  );
}
