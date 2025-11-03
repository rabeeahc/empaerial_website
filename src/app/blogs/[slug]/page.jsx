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

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/blogs`);
      const all = await res.json();
      const found = all.find((b) => b.slug === slug);
      setBlog(found);
    }
    fetchBlog();
  }, [slug]);

  if (!blog)
    return (
      <div style={{ color: "#00B4D8", textAlign: "center", marginTop: "3rem" }}>
        Loading...
      </div>
    );

  let graphData = null;
  try {
    if (blog.graph_data) {
      graphData =
        typeof blog.graph_data === "string"
          ? JSON.parse(blog.graph_data)
          : blog.graph_data;
    }
  } catch {
    graphData = null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #051727, #000)",
        color: "#EAEAEA",
        fontFamily: "'Poppins', sans-serif",
        padding: "3rem 1rem",
        maxWidth: "850px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {}
   <button
  onClick={() => router.push("/blogs")}
  style={{
    position: "absolute",
    top: "20px",
    right: "25px",
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "2.5rem",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  ×
</button>


      <h1
        style={{
          color: "#00B4D8",
          marginBottom: "0.5rem",
          fontSize: "2.2rem",
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

      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "2rem",
            boxShadow: "0 0 15px rgba(0,180,216,0.2)",
          }}
        />
      )}

      <div
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.7",
          color: "#E0E0E0",
          marginBottom: "2rem",
        }}
      >
        {blog.content}
      </div>

      {}
      {blog.video_url && (
        <div style={{ marginTop: "2.5rem" }}>
          <h3
            style={{
              color: "#00B4D8",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            🎥 Watch Video
          </h3>

          {blog.video_url.includes("youtube") ? (
            <iframe
              width="100%"
              height="400"
              src={blog.video_url.replace("watch?v=", "embed/")}
              title="Video"
              allowFullScreen
              style={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 0 20px rgba(0,180,216,0.2)",
              }}
            ></iframe>
          ) : (
            <video
              width="100%"
              height="400"
              controls
              style={{
                borderRadius: "12px",
                boxShadow: "0 0 20px rgba(0,180,216,0.2)",
              }}
            >
              <source src={blog.video_url} type="video/mp4" />
            </video>
          )}
        </div>
      )}

      {}
      {graphData &&
        graphData.labels &&
        graphData.values &&
        graphData.labels.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h3
              style={{
                color: "#00B4D8",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              📊 Graph Visualization
            </h3>
            <ResponsiveContainer width="100%" height={320}>
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
        )}
    </div>
  );
}
