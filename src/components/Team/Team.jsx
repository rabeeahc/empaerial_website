'use client';
import React from "react";
import styles from "./Team.module.css";

const teamData = [
  {
    team: "Software Team",
    description: "Frontend & Backend developers building the brains of our UAVs.",
    members: [
      {
        name: "Abdullah Amin",
        url: "https://www.linkedin.com/in/abdullah-milad/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        age: 23,
        country: "Afghanistan",
        role: "Software Team (Image Processing & Drone Vision).",
        skills: ["Deep learning, Computer Vision. Languages= Dari, English, Turkish."],
        funFact: "I love training both neural networks and muscles AI by day, gym by night 💪🤖",
        photo: "/images/abdullah.jpeg"
      },
      {
        name: "Aboubacar Sow",
        url: "https://www.linkedin.com/in/aboubacar-sow-853a7b25b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        age: 21,
        country: "Guinea",
        role: "Software Team Leader",
        skills: [".Net Backend Engineer, love understanding how things work under hood. "],
        funFact: "Love playing footboll",
        photo: "/images/aboubacar.jpeg"
      },
      {
        name: "Aine-Mukama Katureebe ",
        url: "https://www.linkedin.com/in/aine-mukama-rwankurukumbi-katureebe-083939264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        age: 22,
        country: "Uganda",
        role: "Working on the telemetry",
        skills: ["Research & coding"],
        funFact: "Fun fact is I support the best football team in the world, Arsenal. ",
        photo: "/images/aine.jpeg"
      },
      {
        name: "Azra Dika",
        url: "https://www.linkedin.com/in/f-azra-dika-2786011b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        age: "27",
        country: "Syria",
        role: "Sofftware Developer",
        skills: [" Hard to list easier to witness Just wait until you see me in action."],
        funFact: " I am a 3rd year pharmacy student but that doesn’t stop me from stay away from technology. The future of healthcare is digital that’s why I want to blend both worlds through code. 💊💻",
        photo: "/images/azra.jpeg"
      },
      {
        name: "Najibullah Muhammadi",
        url: "https://www.linkedin.com/in/najib-muhammadi-/",
        age: 21,
        country: "Afghanistan",
        role: "Software Team (Image processing & Drone vision)",
        skills: ["Programming langs = C, Java, Python. Human langs = English, Dari, Turkish, Hindi, Uzbek. Great problem solving skills."],
        funFact: "I learn languages of humans & computers.",
        photo: "/images/najib.jpeg"
      },
      {
        name: "Rabeeah Chishti",
        url: "https://www.linkedin.com/in/rabeeah-chishti/",
        age: 22,
        country: "India",
        role: "Website Architect",
        skills: ["Experirnced in web development, UI/UX design, problem solving, and version control with Git."],
        funFact: "Can solve a Rubik's cube in under a minute which is ironic because it takes me 3 hours to fix a missing semicolon.",
        photo: "/images/rabeeah.JPG"
      },

    ],
  },
  {
    team: "Electronics Team",
    description: "Circuit designers and electronics speacialists making drones fly.",
    members: [
      {
        name: "Ahmed Mulki",
        url: "https://www.linkedin.com/in/ahmed-mulki-393a3b389/",
        age: 26,
        country: "Syria",
        role: "Electronics team member.",
        skills: ["Embedded systems hardware and software development, languages = Arabic, Turkish, English"],
        funFact: " I love replying to messages so fast (instantly)🌚",
        photo: "/images/ahmedmulki.jpeg"
      },
      {
        name: "John Ricky",
        url: "https://www.linkedin.com/in/john-ricky-433367335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        age: 22,
        country: "Kenya",
        role: "Electronics team member.",
        skills: ["..."],
        funFact: " I am artistic and funny😌.",
        photo: "/images/ricky.jpeg"
      },
      {
        name: "William Amani",
        url: " https://linkedin.com/in/william-amani-363ba12a5",
        age: 20,
        country: "Rwanda",
        role: "Electronics department team leader.",
        skills: ["Intermediate low level programming."],
        funFact: "...",
        photo: "/images/william.jpeg"
      },
      {
        name: "Zawadi Wafula",
        url: "https://www.linkedin.com/in/zawadi-wafula-956493265/",
        age: 20,
        country: "Kenya",
        role: "Electronics Team (Electronics & Software integration).",
        skills: ["Proficient in 3 Programming Languages and General Electronics."],
        funFact: "⁠I love coffee flavoured things but coffee not so much🫣.",
        photo: "/images/zawadi.jpeg"
      },
    ]
  },
  {
    team: "Mechanical Team",
    description: "Frames & aerodynamics experts keeping drones stable and agile.",
    members: [
      {
        name: "Ahmed Osman Mahamoud",
        url: "https://www.linkedin.com/in/aom99/",
        age: 26,
        country: "Djibouti",
        role: "Captain (otherwise called no job description just hangs with everyone and makes jokes).",
        skills: ["Mechanical design, intermediate coding skills, very good at online research, 5 languages and more on the way, etc etc."],
        funFact: "I can make a great monkey face but I dare you to ask me to do it without sounding racist 🙂",
        photo: "/images/ahmed.jpeg"
      },
      {
        name: "Henry Christophe",
        url: "https://www.linkedin.com/in/henry-christophe-ndahirwa-b80015288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        age: 20,
        country: "Rwanda",
        role: "Mecahnical team member.",
        skills: ["..."],
        funFact: "...",
        photo: "/images/henry.jpeg"
      },
      {
        name: "Hilmi Kabir",
        url: "https://www.linkedin.com/in/hilmikabir",
        age: 26,
        country: "India",
        role: "Mechanical design, material selection, BOM preparation and anticipating for more to come. To keep it short, suffering with Henry and Osman on the same boat.:D ",
        skills: ["Jack of all trades but master of none. :D"],
        funFact: " If you see me angry or annoyed, just know that my manager has messed with me again. 😃",
        photo: "/images/hilmi.jpeg"
      },
    ]
  },

  {
    team: "Coordinators",
    description: "Keeping the team oganised and projects on track.",
    members: [
      {
        name: "Lujain Nofal",
        url: "https://www.linkedin.com/in/lujain-nofal-33a708387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        age: "24",
        country: "Jordan",
        role: "Coordinating the team’s support operations, overseeing the planning and execution of events.",
        skills: ["Experienced in teaching, enjoy expressing my creativity through handcrafts. "],
        funFact: "I don’t code, I connect people 🙂‍↔️",
        photo: "/images/lujain.jpeg"
      },
    ]
  }
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
                    <li key={i} className={styles.memberItem}>
                      <a
                        href={member.url}
                      
                        rel="noopener noreferrer"
                        className={styles.memberLink}
                      >
                        {member.name}
                      </a>

                      <div className={styles.memberTooltip}>
                        <img
                          src={member.photo}
                        
                          className={styles.memberPhoto}
                        />
                        <div className={styles.tooltipContent}>
                          
                         <p><span className={styles.label}>Age:</span> {member.age}</p>
                        <p><span className={styles.label}>Country:</span> {member.country}</p>
                        <p><span className={styles.label}>Role:</span> {member.role}</p>
                        <p><span className={styles.label}>Skills:</span> {member.skills.join(", ")}</p>
                          <p style={{ marginTop: '10px', fontStyle: 'italic', opacity: 0.8 }}>
                            <strong className={styles.function}>Fun Fact:</strong> {`"${member.funFact}"`}
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