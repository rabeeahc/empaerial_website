'use client';
import React from "react";
import styles from "./Team.module.css";

const teamData = [
  {
    team: "Software Team",
    description: "Frontend & Backend developers building the brains of our UAVs.",
    members: ["Alice - Frontend", "Bob - Backend", "Charlie - Fullstack"],
  },
  {
    team: "Electrical Team",
    description: "Circuit designers and electronics specialists making drones fly.",
    members: ["Dana - Circuit Designer", "Eve - Electronics Engineer"],
  },
  {
    team: "Mechanical Team",
    description: "Frames & aerodynamics experts keeping drones stable and agile.",
    members: ["Frank - Mechanical Engineer", "Grace - Aerodynamics Specialist"],
  },
  {
    team: "Coordinators",
    description: "Keeping the team organized and projects on track.",
    members: ["Hannah - Team Lead", "Ian - Operations"],
  },
];

export default function Team() {
  return (
    <section className={styles.teamSection}>
      <h2 className={styles.teamTitle}>The Minds Behind the Empaerial</h2>
      <p className={styles.teamSubtitle}>
        Empaerial is a community of international students working on UAVs,
        sharing knowledge, and building innovation together.
      </p>

      <div className={styles.cardContainer}>
        {teamData.map((group, index) => (
          <div key={index} className={styles.bigCard}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <h3 className={styles.cardTitle}>{group.team}</h3>
                <p className={styles.cardDescription}>{group.description}</p>
              </div>
              <div className={styles.cardBack}>
                <h3>Team Members</h3>
                <ul className={styles.membersList}>
                  {group.members.map((member, i) => (
                    <li key={i}>{member}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
