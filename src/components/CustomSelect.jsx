"use client";
import { useState, useRef, useEffect } from "react";

export default function CustomSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: "1rem" }}>
      <label style={{ color: "#A0AEC0", marginBottom: "6px", display: "block" }}>
        {label}
      </label>

      {/* SELECT BOX */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.15)",
          padding: "0.8rem 1rem",
          borderRadius: "10px",
          cursor: "pointer",
          color: "#EAEAEA",
          position: "relative",
          userSelect: "none",
        }}
      >
        {value ? options.find((o) => o.value === value)?.label : "Select a team..."}

        <span style={{ float: "right", opacity: 0.6 }}>▾</span>

        {/* DROPDOWN MENU */}
        {open && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              left: 0,
              width: "100%",
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(6px)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 15px rgba(0,0,0,0.5)",
              zIndex: 999,
              overflow: "hidden",
            }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                style={{
                  padding: "0.8rem 1rem",
                  cursor: "pointer",
                  color: "#EAEAEA",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background:
                    value === opt.value
                      ? "rgba(0,180,216,0.25)"
                      : "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(0,180,216,0.18)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    value === opt.value
                      ? "rgba(0,180,216,0.25)"
                      : "transparent")
                }
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
