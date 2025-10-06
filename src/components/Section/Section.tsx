import React, { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className, ...rest }) => {
  return (
    <section className={`${styles.section} ${className ?? ""}`} {...rest}>
      {children}
    </section>
  );
};

export default Section;