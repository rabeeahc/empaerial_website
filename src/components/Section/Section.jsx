import React from "react";
import styles from "./Section.module.css";

const Section = ({ children, className, ...rest }) => {
  return (
    <section className={`${styles.section} ${className}`} {...rest}>
      {children}
    </section>
  );
};

export default Section;