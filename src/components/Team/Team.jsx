'use client';
import React from "react";
import styles from "./Team.module.css";

export default function Team({ t }) {
  const teamData = [
    {
      team: t.team_software_title,
      description: t.team_software_desc,
      members: [
        {
          name: "Abdullah Amin",
          url: "https://www.linkedin.com/in/abdullah-milad/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
          age: 23,
          country: "Afghanistan",
          role: t.members.abdullah.role,
          skills: [t.members.abdullah.skills],
          funFact: t.members.abdullah.funfact,
          photo: "/images/abdullah.jpeg"
        },
        {
          name: "Aboubacar Sow",
          url: "https://www.linkedin.com/in/aboubacar-sow-853a7b25b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          age: 21,
          country: "Guinea",
          role: t.members.aboubacar.role,
          skills: [t.members.aboubacar.skills],
          funFact: t.members.aboubacar.funfact,
          photo: "/images/aboubacar.jpeg"
        },
        {
          name: "Aine-Mukama Katureebe",
          url: "https://www.linkedin.com/in/aine-mukama-rwankurukumbi-katureebe-083939264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          age: 22,
          country: "Uganda",
          role: t.members.aine.role,
          skills: [t.members.aine.skills],
          funFact: t.members.aine.funfact,
          photo: "/images/aine.jpeg"
        },
        {
          name: "Azra Dika",
          url: "https://www.linkedin.com/in/f-azra-dika-2786011b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
          age: 27,
          country: "Syria",
          role: t.members.azra.role,
          skills: [t.members.azra.skills],
          funFact: t.members.azra.funfact,
          photo: "/images/azra.jpeg"
        },
        {
          name: "Najibullah Muhammadi",
          url: "https://www.linkedin.com/in/najib-muhammadi-/",
          age: 21,
          country: "Afghanistan",
          role: t.members.najib.role,
          skills: [t.members.najib.skills],
          funFact: t.members.najib.funfact,
          photo: "/images/najib.jpeg"
        },
        {
          name: "Rabeeah Chishti",
          url: "https://www.linkedin.com/in/rabeeah-chishti/",
          age: 22,
          country: "India",
          role: t.members.rabeeah.role,
          skills: [t.members.rabeeah.skills],
          funFact: t.members.rabeeah.funfact,
          photo: "/images/rabeeah.JPG"
        }
      ]
    },
    {
      team: t.team_electronics_title,
      description: t.team_electronics_desc,
      members: [
        {
          name: "Ahmed Mulki",
          url: "https://www.linkedin.com/in/ahmed-mulki-393a3b389/",
          age: 26,
          country: "Syria",
          role: t.members.ahmedmulki.role,
          skills: [t.members.ahmedmulki.skills],
          funFact: t.members.ahmedmulki.funfact,
          photo: "/images/ahmedmulki.jpeg"
        },
        {
          name: "John Ricky",
          url: "https://www.linkedin.com/in/john-ricky-433367335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          age: 22,
          country: "Kenya",
          role: t.members.johnricky.role,
          skills: [t.members.johnricky.skills],
          funFact: t.members.johnricky.funfact,
          photo: "/images/ricky.jpeg"
        },
        {
          name: "William Amani",
          url: "https://linkedin.com/in/william-amani-363ba12a5",
          age: 20,
          country: "Rwanda",
          role: t.members.william.role,
          skills: [t.members.william.skills],
          funFact: t.members.william.funfact,
          photo: "/images/william.jpeg"
        },
        {
          name: "Zawadi Wafula",
          url: "https://www.linkedin.com/in/zawadi-wafula-956493265/",
          age: 20,
          country: "Kenya",
          role: t.members.zawadi.role,
          skills: [t.members.zawadi.skills],
          funFact: t.members.zawadi.funfact,
          photo: "/images/zawadi.jpeg"
        }
      ]
    },
    {
      team: t.team_mechanical_title,
      description: t.team_mechanical_desc,
      members: [
        {
          name: "Ahmed Osman Mahamoud",
          url: "https://www.linkedin.com/in/aom99/",
          age: 26,
          country: "Djibouti",
          role: t.members.ahmedosman.role,
          skills: [t.members.ahmedosman.skills],
          funFact: t.members.ahmedosman.funfact,
          photo: "/images/ahmed.jpeg"
        },
        {
          name: "Henry Christophe",
          url: "https://www.linkedin.com/in/henry-christophe-ndahirwa-b80015288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          age: 20,
          country: "Rwanda",
          role: t.members.henry.role,
          skills: [t.members.henry.skills],
          funFact: t.members.henry.funfact,
          photo: "/images/henry.jpeg"
        },
        {
          name: "Hilmi Kabir",
          url: "https://www.linkedin.com/in/hilmikabir",
          age: 26,
          country: "India",
          role: t.members.hilmi.role,
          skills: [t.members.hilmi.skills],
          funFact: t.members.hilmi.funfact,
          photo: "/images/hilmi.jpeg"
        }
      ]
    },
    {
      team: t.team_coord_title,
      description: t.team_coord_desc,
      members: [
        {
          name: "Lujain Nofal",
          url: "https://www.linkedin.com/in/lujain-nofal-33a708387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
          age: 24,
          country: "Jordan",
          role: t.members.lujain.role,
          skills: [t.members.lujain.skills],
          funFact: t.members.lujain.funfact,
          photo: "/images/lujain.jpeg"
        }
      ]
    }
  ];

  return (
    <section className={styles.teamSection}>
      <h2 className={styles.teamTitle}>{t.team_title}</h2>
      <p className={styles.teamSubtitle}>{t.team_subtitle}</p>

      <div className={styles.cardContainer}>
        {teamData.map((group, index) => (
          <div key={index} className={styles.bigCard}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <h3 className={styles.cardTitle}>{group.team}</h3>
                <p className={styles.cardDescription}>{group.description}</p>
              </div>
              <div className={styles.cardBack}>
                <h3>{t.team_members}</h3>
                <ul className={styles.membersList}>
                  {group.members.map((member, i) => (
                    <li key={i} className={styles.memberItem}>
                      <a href={member.url} target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
                        {member.name}
                      </a>
                      <div className={styles.memberTooltip}>
                        <img src={member.photo} alt={member.name} className={styles.memberPhoto} />
                        <div className={styles.tooltipContent}>
                          <p><span className={styles.label}>{t.team_age}</span> {member.age}</p>
                          <p><span className={styles.label}>{t.team_country}</span> {member.country}</p>
                          <p><span className={styles.label}>{t.team_role}</span> {member.role}</p>
                          <p><span className={styles.label}>{t.team_skills}</span> {member.skills.join(", ")}</p>
                          <p style={{ marginTop: '10px', fontStyle: 'italic', opacity: 0.8 }}>
                            <strong className={styles.function}>{t.team_funfact}</strong> {`"${member.funFact}"`}
                          </p>
                        </div>
                      </div>
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
