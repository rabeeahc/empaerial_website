'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter();

  // 🚫 Redirect if not logged in
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/admin-login");
    }
  }, [router]);

  // ✈️ Project form state
  const [form, setForm] = useState({
    name: "",
    summary: "",
    description: "",
    image_url: "",
    slug: "",
    weight: "",
    flight_duration: "",
    frame_length: "",
    materials: "",
    features: ""
  });

  // 📝 Blog form state
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    author: "",
    image_url: "",
    content: ""
  });

  // 🔤 Slug generator
  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  // ✈️ Project submission
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("✅ Project added successfully!");
      setForm({
        name: "",
        summary: "",
        description: "",
        image_url: "",
        slug: "",
        weight: "",
        flight_duration: "",
        frame_length: "",
        materials: "",
        features: ""
      });
    } else alert("❌ Failed to add project");
  };

  // 📝 Blog submission
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogForm),
    });
    if (res.ok) {
      alert("✅ Blog added successfully!");
      setBlogForm({
        title: "",
        slug: "",
        author: "",
        image_url: "",
        content: ""
      });
    } else alert("❌ Failed to add blog");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #051727, #000)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      fontFamily: "'Poppins', sans-serif",
      padding: "3rem 1rem"
    }}>
      <div style={{
        background: "rgba(10, 20, 30, 0.8)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "2rem 3rem",
        width: "90%",
        maxWidth: "650px",
        color: "#e6edf3",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)",
        backdropFilter: "blur(10px)"
      }}>

        {/* ✈️ PROJECT MANAGER */}
        <h1 style={{
          textAlign: "center",
          color: "#00B4D8",
          fontWeight: "700",
          marginBottom: "1.5rem",
          fontSize: "2rem",
          letterSpacing: "1px"
        }}>
          EMPAERIAL Admin Panel
        </h1>

        <p style={{
          textAlign: "center",
          color: "#E0E0E0",
          marginBottom: "2rem",
          fontStyle: "italic",
        }}>
          Add new drone projects easily ✈️
        </p>

        <form
          onSubmit={handleProjectSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          {[
            { placeholder: "Project Name", key: "name" },
            { placeholder: "Summary", key: "summary" },
            { placeholder: "Image URL (or /images/drone.png)", key: "image_url" },
            { placeholder: "Weight (e.g. 970 g)", key: "weight" },
            { placeholder: "Flight Duration (e.g. 16.4 minutes)", key: "flight_duration" },
            { placeholder: "Frame Length (e.g. 478 mm)", key: "frame_length" },
            { placeholder: "Materials (e.g. Carbon Fiber, PLA)", key: "materials" },
            { placeholder: "Features (e.g. GPS, HD camera)", key: "features" },
          ].map((field, i) => (
            <input
              key={i}
              placeholder={field.placeholder}
              value={form[field.key]}
              onChange={e => {
                const value = e.target.value;
                setForm({
                  ...form,
                  [field.key]: value,
                  ...(field.key === "name" ? { slug: generateSlug(value) } : {})
                });
              }}
              style={inputStyle}
            />
          ))}

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            style={{
              ...inputStyle,
              minHeight: "80px",
              resize: "vertical"
            }}
          />

          <input
            placeholder="Slug (auto-generated)"
            value={form.slug}
            readOnly
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px dashed rgba(255,255,255,0.3)",
              borderRadius: "10px",
              padding: "0.8rem 1rem",
              color: "#999",
              fontSize: "0.95rem",
            }}
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            + Add Project
          </button>
        </form>

        {/* 🧱 DIVIDER */}
        <hr style={{ margin: "3rem 0", border: "1px solid rgba(255,255,255,0.1)" }} />

        {/* 📝 BLOG MANAGER */}
        <h2 style={{
          color: "#00B4D8",
          textAlign: "center",
          marginBottom: "1rem",
        }}>
          Blog Manager 📝
        </h2>
        <p style={{
          textAlign: "center",
          color: "#ccc",
          fontStyle: "italic",
          marginBottom: "1rem"
        }}>
          Write updates, project progress, or research insights.
        </p>

        <form
          onSubmit={handleBlogSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            placeholder="Blog Title"
            value={blogForm.title}
            onChange={(e) => {
              const title = e.target.value;
              setBlogForm({
                ...blogForm,
                title,
                slug: generateSlug(title)
              });
            }}
            style={inputStyle}
          />
          <input
            placeholder="Author"
            value={blogForm.author}
            onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Image URL (optional)"
            value={blogForm.image_url}
            onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })}
            style={inputStyle}
          />
          <textarea
            placeholder="Write your blog content here..."
            value={blogForm.content}
            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
            style={{
              ...inputStyle,
              minHeight: "120px",
              resize: "vertical",
            }}
          />
          <input
            placeholder="Slug (auto-generated)"
            value={blogForm.slug}
            readOnly
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px dashed rgba(255,255,255,0.3)",
              borderRadius: "10px",
              padding: "0.8rem 1rem",
              color: "#999",
              fontSize: "0.95rem",
            }}
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            + Add Blog
          </button>
        </form>
      </div>
    </div>
  );
}

// 🎨 Shared Input Style
const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "10px",
  padding: "0.8rem 1rem",
  color: "#EAEAEA",
  fontSize: "1rem",
  transition: "0.3s",
};

// 🎨 Shared Button Style
const buttonStyle = {
  background: "linear-gradient(90deg, #00B4D8, #0077B6)",
  border: "none",
  borderRadius: "10px",
  padding: "0.8rem",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "0.5rem",
  transition: "0.3s",
};
