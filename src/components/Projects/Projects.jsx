'use client';

import React, { useState } from "react";
import styles from "./Projects.module.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      name: "Vespasian",
      summary: "Lightweight quadcopter prototype for stable flight and durability.",
      description:
        "Vespasian is a lightweight quadcopter prototype featuring carbon fiber arms and 3D printed PLA body components, designed for stability, modularity, and precision performance.",
      images: [
        "/images/vespasian1.png",
        "/images/vespasian2.png",
        "/images/vespasian3.png",
      ],
      specs: [
        { label: "Weight", value: "970 g or 0.97 kg" },
        { label: "Max takeoff weight", value: "2.5 kg" },
        { label: "Flight duration (no load)", value: "16.4 minutes" },
        { label: "Frame length", value: "478.28 mm" },
        { label: "Height", value: "157.76 mm" },
      ],
      bom: [
        { part: "Arms", material: "10/8 3K carbon fiber" },
        { part: "Motor mounts", material: "Standard PLA Plastic" },
        { part: "Arm to Chassis connection", material: "Standard PLA Plastic" },
        { part: "Chassis", material: "Standard PLA Plastic" },
        { part: "ESCs", material: "20A SimonK" },
        { part: "Motors", material: "EMAX A2212 980KV" },
        { part: "Battery", material: "RC Master 2200 mAh 30C Li-po" },
        { part: "Props", material: "Plastic 1045" },
        { part: "Flight Controller", material: "ESP32S" },
        { part: "Firmware", material: "ESP-FC (by RTLopez) Betaflight compatible" },
      ],
    },
    { name: "Drone 2", summary: "Coming Soon", image: "/images/anka.png" },
    { name: "Drone 3", summary: "Coming Soon", description: "TBD", image: "/images/gokdogan.png" },
    { name: "Drone 4", summary: "Coming Soon", image: "/images/dinosaur.png" },
  ];

  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const closeModal = () => setSelectedProject(null);

  const nextImage = () => {
    if (!selectedProject?.images) return;
    setCurrentImage((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    if (!selectedProject?.images) return;
    setCurrentImage(
      (prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length
    );
  };

  return (
    <section className={styles.projectSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Our Projects</h2>
        <p className={styles.subtitle}>
          Here we showcase the drones we are building and those completed,
          including images, specs, and BOM.
        </p>
      </div>

      <div className={styles.projectRow}>
        {projects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <div className={styles.previewImageContainer}>
              <img
                src={project.image || project.images?.[0]}
                alt={project.name}
                className={styles.previewImage}
              />
            </div>
            <div className={styles.projectOverview}>
              <h2>{project.name}</h2>
              <p>{project.summary}</p>
              {project.summary !== "Coming Soon" && (
                <button
                  className={styles.expandButton}
                  onClick={() => {
                    setSelectedProject(project);
                    setCurrentImage(0);
                  }}
                >
                  View Details →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button className={styles.closeButton} onClick={closeModal}>
              <X size={22} color="#ffffff" />
            </button>

            {/* ==== IMAGE CAROUSEL ON TOP ==== */}
            {selectedProject.images && (
              <div className={styles.carousel}>
                <button className={styles.arrow} onClick={prevImage}>
                  <ChevronLeft size={28} strokeWidth={2.5} color="#000000" />
                </button>
                <img
                  src={selectedProject.images[currentImage]}
                  alt={selectedProject.name}
                  className={styles.mainImage}
                />
                <button className={styles.arrow} onClick={nextImage}>
                  <ChevronRight size={28} strokeWidth={2.5} color="#000000" />
                </button>
              </div>
            )}

            {/* ==== TEXT & DETAILS BELOW ==== */}
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>{selectedProject.name}</h2>
              <p className={styles.modalSubtitle}>{selectedProject.summary}</p>

              {selectedProject.description && (
                <p className={styles.modalDescription}>{selectedProject.description}</p>
              )}

              {/* ==== SPECS SECTION ==== */}
              {selectedProject.specs && (
                <div className={styles.specsSection}>
                  {selectedProject.specs.map((item, index) => (
                    <p key={index}>
                      <strong>{item.label}:</strong> {item.value}
                    </p>
                  ))}
                </div>
              )}

              {/* ==== BOM SECTION ==== */}
              {selectedProject.bom && (
                <div className={styles.bomSection}>
                  <h3 className={styles.bomTitle}>BOM</h3>
                  <table className={styles.bomTable}>
                    <tbody>
                      {selectedProject.bom.map((item, index) => (
                        <tr key={index}>
                          <td>{item.part}</td>
                          <td>{item.material}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
