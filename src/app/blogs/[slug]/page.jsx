"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogPost() {
  const { slug } = useParams();
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #051727, #000)",
        color: "#EAEAEA",
        fontFamily: "'Poppins', sans-serif",
        padding: "3rem 1rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: "#00B4D8", marginBottom: "1rem" }}>{blog.title}</h1>
      <p style={{ color: "#aaa", fontStyle: "italic", marginBottom: "2rem" }}>
        By {blog.author}
      </p>
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "2rem",
          }}
        />
      )}
      <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
        {blog.content}
      </p>
    </div>
  );
}
