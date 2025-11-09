"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BlogPost() {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/blogs`, { cache: "no-store" });
      const all = await res.json();
      const found = all.find((b) => b.slug === slug);
      setBlog(found);
    }
    fetchBlog();
  }, [slug]);

  if (!blog)
    return (
      <div
        style={{
          color: "#00B4D8",
          textAlign: "center",
          marginTop: "3rem",
          fontFamily: "Fira Code, monospace",
        }}
      >
        Loading...
      </div>
    );

  // ✅ Safe parsing for graph and gallery
  let graphData = null;
  let gallery = [];
  try {
    if (blog.graph_data)
      graphData =
        typeof blog.graph_data === "string"
          ? JSON.parse(blog.graph_data)
          : blog.graph_data;
    if (blog.gallery_images)
      gallery =
        typeof blog.gallery_images === "string"
          ? JSON.parse(blog.gallery_images)
          : blog.gallery_images;
  } catch {
    graphData = null;
    gallery = [];
  }
  if (!Array.isArray(gallery)) gallery = [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #051727, #000)",
        color: "#EAEAEA",
        fontFamily: "'Poppins', sans-serif",
        padding: "3rem 1rem 5rem",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* ❌ Close Button */}
      <button
        onClick={() => router.push("/blogs")}
        style={{
          position: "fixed",
          top: "20px",
          right: "25px",
          background: "transparent",
          border: "none",
          color: "#ffffff",
          fontSize: "2.2rem",
          cursor: "pointer",
          fontWeight: "600",
          zIndex: 10,
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        ×
      </button>

      {/* 🧭 Title & Author */}
      <h1
        style={{
          color: "#00B4D8",
          marginBottom: "0.3rem",
          fontSize: "2.6rem",
          textAlign: "center",
        }}
      >
        {blog.title}
      </h1>
      <p
        style={{
          color: "#aaa",
          fontStyle: "italic",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        By {blog.author}
      </p>

      {/* 🧩 Two-Column Layout */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* 🖼 Left Column: Gallery */}
        {gallery.length > 0 && (
          <div
            style={{
              flex: "1 1 420px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <h3
              style={{
                color: "#00B4D8",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              
            </h3>

            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery ${i + 1}`}
                onClick={() => setSelectedImage(src)}
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  aspectRatio: "16 / 9",
                  boxShadow: "0 0 14px rgba(0,180,216,0.35)",
                  cursor: "pointer",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(0,200,255,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 0 14px rgba(0,180,216,0.35)";
                }}
              />
            ))}
          </div>
        )}

        {/* 📖 Right Column: Content + Graph */}
        <div
          style={{
            flex: "2 1 600px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "0 1rem",
          }}
        >
          {/* Blog Text */}
          <div
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: "#E0E0E0",
              textAlign: "justify",
            }}
          >
            {blog.content}
          </div>

          {/* Graph Section */}
          {graphData &&
            graphData.labels &&
            graphData.values &&
            graphData.labels.length > 0 && (
              <div>
                <h3
                  style={{
                    color: "#00B4D8",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  📊 Graph Visualization
                </h3>
                <div
                  style={{
                    width: "100%",
                    height: "320px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(180deg, rgba(0,30,50,0.4), rgba(0,0,0,0.3))",
                    boxShadow: "0 0 20px rgba(0,180,216,0.15)",
                    transition: "box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(0,180,255,0.4)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(0,180,216,0.15)")
                  }
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={graphData.labels.map((label, i) => ({
                        label,
                        value: graphData.values[i],
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#112233" />
                      <XAxis dataKey="label" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#001933",
                          border: "1px solid #00B4D8",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#00E0FF"
                        strokeWidth={2}
                        dot={{ fill: "#00E0FF" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* 🎥 Video */}
      {blog.video_url && (
        <div
          style={{
            marginTop: "4rem",
            width: "100%",
            maxWidth: "1200px",
            marginInline: "auto",
          }}
        >
          <h3
            style={{
              color: "#00B4D8",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            
          </h3>

          {blog.video_url.includes("youtube") ? (
            <iframe
              width="100%"
              height="480"
              src={blog.video_url.replace("watch?v=", "embed/")}
              title="Video"
              allowFullScreen
              style={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 0 20px rgba(0,180,216,0.25)",
              }}
            ></iframe>
          ) : (
            <video
              width="100%"
              controls
              style={{
                borderRadius: "12px",
                boxShadow: "0 0 20px rgba(0,180,216,0.25)",
              }}
            >
              <source src={blog.video_url} type="video/mp4" />
            </video>
          )}
        </div>
      )}

      {/* 🪩 Zoom Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{
              maxWidth: "92%",
              maxHeight: "88%",
              borderRadius: "15px",
              boxShadow: "0 0 40px rgba(0,200,255,0.5)",
              animation: "popIn 0.3s ease",
            }}
          />
        </div>
      )}

      {/* ✨ Animations + Responsive */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes popIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 900px) {
          div[style*="display: flex"][style*="gap: 2rem"] {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
