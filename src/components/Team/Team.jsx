'use client';
import React from "react";
import styles from "./Team.module.css";

const teamData = [
  {
    team: "Software Team",
    description: "Frontend & Backend developers building the brains of our UAVs.",
    members: [
      { name: "Abdullah Amin", url: "/profiles/abdullah-amin" },
      { name: "Aboubacar Sow", url: "/profiles/aboubacar-sow" },
      { name: "Aine Mukama", url: "/profiles/aine-mukama" },
      { name: "Azra", url: "/profiles/azra" },
      { name: "Najibullah Muhammadi", url: "/profiles/najibullah-muhammadi" },
      { name: "Rabeeah Chishti", url: "/profiles/rabeeah-chishti" },
    ],
  },
  {
    team: "Electrical Team",
    description: "Circuit designers and electronics specialists making drones fly.",
    members: [
      { name: "Ahmed Mulki", url: "/profiles/ahmed-mulki" },
      { name: "Ricky", url: "/profiles/ricky" },
      { name: "William", url: "/profiles/william" },
      { name: "Zawadi", url: "/profiles/zawadi" },
    ],
  },
  {
    team: "Mechanical Team",
    description: "Frames & aerodynamics experts keeping drones stable and agile.",
    members: [
      { name: "Ahmed Osman Mahamoud", url: "/profiles/ahmed-osman-mahamoud" },
      { name: "Henry", url: "/profiles/henry" },
      { name: "Hilmi Kabir", url: "/profiles/hilmi-kabir" },
    ],
  },
  {
    team: "Coordinators",
    description: "Keeping the team organized and projects on track.",
    members: [
      { name: "Lujain Nofal", url: "/profiles/lujain-nofal" },
    ],
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
                    <li key={i}>
                      <a
                        href={member.url}
                        className={styles.memberLink}
                      >
                        {member.name}
                      </a>
                    </li>
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