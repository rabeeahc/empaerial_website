'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  const [form, setForm] = useState({ name: "", summary: "", image_url: "", slug: "", id: null })
  const [sections, setSections] = useState([])
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    author: "",
    image_url: "",
    content: "",
    video_url: "",
    graph_data: { labels: [], values: [] },
    id: null,
  })
  const [projects, setProjects] = useState([])
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") !== "true") router.push("/admin-login")
  }, [router])

  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, blogRes] = await Promise.all([
          fetch("/api/projects").then(r => r.json()),
          fetch("/api/blogs").then(r => r.json()),
        ])
        setProjects((projRes || []).filter(p => p && p.name))
        setBlogs((blogRes || []).filter(b => b && b.title))
      } catch (err) {
        console.error("❌ Fetch failed:", err)
      }
    }
    fetchData()
  }, [])

  const generateSlug = text =>
    text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")

  const sectionTemplates = {
    specs: { Weight: "", Max_Takeoff_Weight: "", Flight_Duration: "", Frame_Length: "", Height: "" },
    materials: { Arms: "", Motor_Mounts: "", Arm_To_Chassis: "", Chassis: "", ESCs: "", Motors: "", Battery: "", Props: "", Flight_Controller: "", Firmware: "" },
    gallery: { images: ["/images/sample1.png", "/images/sample2.png", "/images/sample3.png"] },
    text: { heading: "ABOUT THIS PROJECT", content: "" },
    contact: { email: "empaerial.uav@gmail.com", link: "/#contact" },
  }

  const addSection = (type) => setSections([...sections, { id: Date.now(), type, data: sectionTemplates[type] || {} }])
  const updateSection = (id, newData) => setSections(sections.map(s => s.id === id ? { ...s, data: newData } : s))
  const removeSection = (id) => setSections(sections.filter(s => s.id !== id))

  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, sections }
    try {
      const res = await fetch("/api/projects", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      const updated = await res.json()
      alert(form.id ? "✅ Project updated!" : "✅ Project added!")
      if (form.id) setProjects(projects.map((p) => (p.id === form.id ? updated : p)))
      else setProjects([...projects, updated])
      setForm({ name: "", summary: "", image_url: "", slug: "" })
      setSections([])
    } catch (err) {
      console.error("POST/PATCH error:", err)
      alert("❌ Failed to save project")
    }
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    const method = blogForm.id ? "PATCH" : "POST"
    try {
      const res = await fetch("/api/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogForm),
      })
      if (!res.ok) throw new Error(await res.text())
      const updated = await res.json()
      alert(blogForm.id ? "✅ Blog updated!" : "✅ Blog added!")
      if (blogForm.id) setBlogs(blogs.map(b => b.id === blogForm.id ? updated : b))
      else setBlogs([...blogs, updated])
      setBlogForm({ title: "", slug: "", author: "", image_url: "", content: "", video_url: "", graph_data: { labels: [], values: [] }, id: null })
    } catch (err) {
      console.error("POST error:", err)
      alert("❌ Failed to save blog")
    }
  }

  const handleEdit = (type, item) => {
    if (type === "project") {
      setForm({
        name: item.name || "",
        summary: item.summary || "",
        image_url: item.image_url || "",
        slug: item.slug || "",
        id: item.id,
      })
      try {
        if (item.sections) {
          const parsedSections = Array.isArray(item.sections) ? item.sections : JSON.parse(item.sections)
          setSections(parsedSections)
        } else setSections([])
      } catch { setSections([]) }
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (type === "blog") {
      setBlogForm({
        title: item.title || "",
        author: item.author || "",
        image_url: item.image_url || "",
        content: item.content || "",
        video_url: item.video_url || "",
        graph_data: item.graph_data || { labels: [], values: [] },
        slug: item.slug || "",
        id: item.id,
      })
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleDelete = async (type, id) => {
    const password = prompt("Enter admin password to confirm deletion:")
    if (!password) return
    const url = type === "project" ? "/api/projects" : "/api/blogs"
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      })
      const result = await res.json()
      if (!res.ok) {
        alert(result.error || "Failed to delete")
        return
      }
      alert("✅ Deleted successfully!")
      if (type === "project") setProjects(projects.filter(p => p?.id !== id))
      else setBlogs(blogs.filter(b => b?.id !== id))
    } catch (err) {
      console.error("Delete error:", err)
      alert("❌ Deletion failed.")
    }
  }

  return (
    <div style={pageContainer}>
      <div style={panelContainer}>
        <h1 style={title}>🛠️ EMPAERIAL Admin Dashboard</h1>
        <p style={subtitle}>Build full drone pages dynamically & manage blogs ✨</p>

        <div style={gridContainer}>
          <div style={sectionCard}>
            <h2 style={sectionTitle}>{form.id ? "✏️ Edit Project" : "✈️ Add New Project"}</h2>
            <form onSubmit={handleProjectSubmit} style={formLayout}>
              {[{ placeholder: "Project Name", key: "name" }, { placeholder: "Summary", key: "summary" }, { placeholder: "Cover Image URL", key: "image_url" }].map((field, i) => (
                <input key={i} placeholder={field.placeholder} value={form[field.key]} onChange={e => {
                  const val = e.target.value
                  setForm({ ...form, [field.key]: val, ...(field.key === "name" ? { slug: generateSlug(val) } : {}) })
                }} style={inputField} />
              ))}
              <input placeholder="Slug (auto-generated)" value={form.slug} readOnly style={readonlyInput} />

              <div style={builderBox}>
                <h3 style={miniHeader}>🧩 Page Builder</h3>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {["specs", "materials", "gallery", "text", "contact"].map(type => (
                    <button key={type} type="button" onClick={() => addSection(type)} style={addSectionBtn}>
                      + {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {sections.map((s) => (
                    <div key={s.id} style={sectionEditorBox}>
                      <h4 style={{ color: "#00B4D8" }}>{s.type.toUpperCase()}</h4>
                      <textarea placeholder={`Edit data for ${s.type} section (JSON)...`} value={JSON.stringify(s.data, null, 2)} onChange={e => {
                        try { updateSection(s.id, JSON.parse(e.target.value)) } catch { updateSection(s.id, { raw: e.target.value }) }
                      }} style={builderTextarea} />
                      <button type="button" onClick={() => removeSection(s.id)} style={deleteButton}>Remove Section</button>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" style={submitButton}>{form.id ? "💾 Update Project" : "+ Save Project"}</button>
            </form>

            {projects.length > 0 && (
              <div style={listContainer}>
                <h3 style={miniHeader}>Existing Projects</h3>
                <div style={scrollList}>
                  {projects.map((p) => (
                    <div key={p.id} style={listItem}>
                      <div>
                        <strong>🛩 {p.name}</strong>
                        <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.7 }}>{p.summary}</p>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button style={editButton} onClick={() => handleEdit("project", p)}>✏️ Edit</button>
                        <button style={deleteButton} onClick={() => handleDelete("project", p.id)}>🗑 Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BLOG BUILDER */}
          <div style={sectionCard}>
            <h2 style={sectionTitle}>{blogForm.id ? "✏️ Edit Blog" : "📝 Add Blog"}</h2>
            <form onSubmit={handleBlogSubmit} style={formLayout}>
              <input placeholder="Blog Title" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value, slug: generateSlug(e.target.value) })} style={inputField} />
              <input placeholder="Author" value={blogForm.author} onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })} style={inputField} />
              <input placeholder="Image URL (optional)" value={blogForm.image_url} onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })} style={inputField} />
              <textarea placeholder="Write blog content..." value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} style={{ ...inputField, minHeight: "100px" }} />
              <input placeholder="Video URL (YouTube or MP4)" value={blogForm.video_url || ""} onChange={(e) => setBlogForm({ ...blogForm, video_url: e.target.value })} style={inputField} />

              {/* 📊 GRAPH BUILDER */}
              <div style={{ ...builderBox, padding: "1rem" }}>
                <h3 style={miniHeader}>📊 Graph Builder</h3>
                <p style={{ fontSize: "0.85rem", color: "#aaa", marginBottom: "1rem" }}>
                  Add X (labels) and Y (values) below to generate your graph.
                </p>

                {(blogForm.graph_data?.labels || [""]).map((label, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <input
                      type="text"
                      placeholder={`X${i + 1} Value`}
                      value={label}
                      onChange={(e) => {
                        const newLabels = [...(blogForm.graph_data?.labels || [])]
                        newLabels[i] = e.target.value
                        setBlogForm({ ...blogForm, graph_data: { labels: newLabels, values: blogForm.graph_data?.values || [] } })
                      }}
                      style={{ ...inputField, flex: "1 1 42%", minWidth: "120px" }}
                    />
                    <input
                      type="number"
                      placeholder={`Y${i + 1} Value`}
                      value={blogForm.graph_data?.values?.[i] || ""}
                      onChange={(e) => {
                        const newValues = [...(blogForm.graph_data?.values || [])]
                        newValues[i] = Number(e.target.value)
                        setBlogForm({ ...blogForm, graph_data: { labels: blogForm.graph_data?.labels || [], values: newValues } })
                      }}
                      style={{ ...inputField, flex: "1 1 42%", minWidth: "120px" }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newLabels = [...(blogForm.graph_data?.labels || [])]
                        const newValues = [...(blogForm.graph_data?.values || [])]
                        newLabels.splice(i, 1)
                        newValues.splice(i, 1)
                        setBlogForm({ ...blogForm, graph_data: { labels: newLabels, values: newValues } })
                      }}
                      style={{
                        background: "rgba(255,60,60,0.2)",
                        border: "1px solid rgba(255,100,100,0.3)",
                        color: "#FF6B6B",
                        borderRadius: "8px",
                        fontWeight: "700",
                        cursor: "pointer",
                        padding: "0.4rem 0.8rem",
                        fontSize: "1rem",
                      }}
                    >
                      ✖
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setBlogForm({
                      ...blogForm,
                      graph_data: {
                        labels: [...(blogForm.graph_data?.labels || []), ""],
                        values: [...(blogForm.graph_data?.values || []), 0],
                      },
                    })
                  }}
                  style={{ ...addSectionBtn, width: "100%" }}
                >
                  + Add Data Point
                </button>
              </div>

              <input placeholder="Slug (auto-generated)" value={blogForm.slug} readOnly style={readonlyInput} />
              <button type="submit" style={submitButton}>
                {blogForm.id ? "💾 Update Blog" : "+ Add Blog"}
              </button>
            </form>

            {blogs.length > 0 && (
              <div style={listContainer}>
                <h3 style={miniHeader}>Existing Blogs</h3>
                <div style={scrollList}>
                  {blogs.map((b) => (
                    <div key={b.id} style={listItem}>
                      <div>
                        <strong>📰 {b.title}</strong>
                        <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.7 }}>by {b.author}</p>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button style={editButton} onClick={() => handleEdit("blog", b)}>✏️ Edit</button>
                        <button style={deleteButton} onClick={() => handleDelete("blog", b.id)}>🗑 Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const pageContainer = { minHeight: "100vh", background: "radial-gradient(circle at top, #001933 0%, #000814 70%)", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "4rem 0", color: "#fff", fontFamily: "'Inter', sans-serif" }
const panelContainer = { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", padding: "2rem", width: "100%", maxWidth: "1400px", boxShadow: "0 0 30px rgba(0, 255, 255, 0.1)" }
const title = { textAlign: "center", color: "#00E0FF", fontWeight: "700", marginBottom: "0.5rem", fontSize: "2rem" }
const subtitle = { textAlign: "center", color: "#A0AEC0", marginBottom: "2rem" }
const gridContainer = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", width: "100%" }
const sectionCard = { background: "rgba(0, 0, 0, 0.35)", borderRadius: "18px", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 0 15px rgba(0, 180, 216, 0.1)" }
const sectionTitle = { color: "#00B4D8", fontSize: "1.2rem", marginBottom: "1rem", fontWeight: "600" }
const formLayout = { display: "flex", flexDirection: "column", gap: "0.8rem" }
const inputField = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "0.7rem 1rem", color: "#EAEAEA", fontSize: "0.95rem", outline: "none" }
const readonlyInput = { ...inputField, border: "1px dashed rgba(255,255,255,0.2)", color: "#888" }
const submitButton = { background: "linear-gradient(90deg, #00B4D8, #0077B6)", border: "none", borderRadius: "10px", padding: "0.8rem", color: "white", fontWeight: "600", cursor: "pointer", marginTop: "0.3rem", fontSize: "1rem", letterSpacing: "0.3px" }
const builderBox = { marginTop: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "1rem", border: "1px solid rgba(255,255,255,0.08)" }
const addSectionBtn = { background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.3)", color: "#00B4D8", padding: "6px 10px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }
const builderTextarea = { background: "rgba(255,255,255,0.06)", color: "#EAEAEA", width: "100%", minHeight: "100px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", padding: "0.8rem", fontFamily: "monospace" }
const sectionEditorBox = { background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)" }
const listContainer = { marginTop: "1.8rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "1rem", boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)", width: "100%" }
const scrollList = { maxHeight: "200px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.7rem" }
const miniHeader = { color: "#00B4D8", marginBottom: "1rem", fontWeight: "600" }
const listItem = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.06)", padding: "0.9rem 1rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }
const deleteButton = { background: "rgba(255, 60, 60, 0.15)", border: "1px solid rgba(255, 100, 100, 0.25)", color: "#FF6B6B", padding: "6px 13px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }
const editButton = { background: "rgba(0, 180, 216, 0.15)", border: "1px solid rgba(0, 180, 216, 0.25)", color: "#00B4D8", padding: "6px 13px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }
