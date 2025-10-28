"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("❌ Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#00B4D8",
          fontFamily: "Fira Code, monospace",
        }}
      >
        Loading blogs...
      </div>
    );
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #051727, #000)",
        color: "#EAEAEA",
        fontFamily: "'Poppins', sans-serif",
        padding: "80px 20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: "#00B4D8",
            marginBottom: "15px",
          }}
        >
          Our Blogs
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#aaa",
            fontStyle: "italic",
          }}
        >
          Explore our latest updates, stories, and UAV insights.
        </p>
      </div>

      {blogs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>
          No blog posts yet. Check back soon!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            width: "90%",
            maxWidth: "1200px",
            margin: "0 auto",
            justifyItems: "center",
            alignItems: "stretch",
          }}
        >
          {blogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                background: "linear-gradient(135deg, #001418, #048d9c)",
                borderRadius: "20px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
                overflow: "hidden",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 18px 45px rgba(0, 200, 255, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0, 0, 0, 0.4)";
              }}
            >
              {}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "radial-gradient(circle at center, #082635, #000)",
                }}
              >
                <img
                  src={blog.image_url || "/images/default-drone.png"}
                  alt={blog.title}
                  style={{
                    width: "80%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: 0.92,
                    transition: "transform 0.35s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {}
              <div
                style={{
                  textAlign: "center",
                  padding: "25px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <h2
                  style={{
                    color: "#00B4D8",
                    fontSize: "1.6rem",
                    marginBottom: "10px",
                    fontWeight: "700",
                    fontFamily: "Fira Code",
                  }}
                >
                  {blog.title}
                </h2>
                <p
                  style={{
                    color: "#E6DB74",
                    fontStyle: "italic",
                    marginBottom: "10px",
                    fontFamily: "Fira Code",
                  }}
                >
                  By {blog.author}
                </p>
                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "1rem",
                    marginBottom: "20px",
                    fontFamily: "Fira Code",
                  }}
                >
                  {blog.content.length > 120
                    ? blog.content.slice(0, 120) + "..."
                    : blog.content}
                </p>

                {}
                <Link href={`/blogs/${blog.slug}`} style={{ alignSelf: "center", textDecoration: "none" }}>
                  <div
                    style={{
                      background: "rgba(102, 217, 239, 0.15)",
                      border: "1px solid #00B4D8",
                      color: "#00B4D8",
                      fontFamily: "Fira Code, monospace",
                      padding: "10px 22px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      backdropFilter: "blur(3px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#00B4D8";
                      e.currentTarget.style.color = "#0b1622";
                      e.currentTarget.style.transform =
                        "translateY(-1px) scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(102, 217, 239, 0.15)";
                      e.currentTarget.style.color = "#00B4D8";
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                    }}
                  >
                    Read More →
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
