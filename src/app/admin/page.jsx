'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
const BUCKET = "uploads"

async function uploadWithProgress(file, folder, onProgress) {
  const ext = file.name.split(".").pop()
  const filename = `${Date.now()}_${Math.random().toString(36).slice(2,8)}.${ext}`
  const path = folder ? `${folder}/${filename}` : filename

  const url = `${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(BUCKET)}/${encodeURIComponent(path)}`
  const xhr = new XMLHttpRequest()

  const promise = new Promise((resolve, reject) => {
    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable && onProgress) {
        onProgress(Math.round((evt.loaded / evt.total) * 100))
      }
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`)
      } else {
        console.error("Upload failed:", xhr.status, xhr.responseText)
        reject(new Error("Upload failed"))
      }
    }
    xhr.onerror = e => {
      console.error("XHR error", e)
      reject(e)
    }
  })

  xhr.open("PUT", url)
  xhr.setRequestHeader("Authorization", `Bearer ${SUPABASE_ANON}`)
  xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream")
  xhr.send(file)
  return promise
}

const clamp = (n, min, max) => Math.max(min, Math.min(max, n))
function moveItem(arr, from, to) {
  const copy = [...arr]
  const start = clamp(from, 0, copy.length - 1)
  const end = clamp(to, 0, copy.length - 1)
  const [item] = copy.splice(start, 1)
  copy.splice(end, 0, item)
  return copy
}

function toTitleCaseNoUnderscore(s) {
  return (s || "")
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function rowsFromObject(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return []
  return Object.entries(obj).map(([key, value]) => ({
    key, 
    value: String(value ?? "")
  }))
}

function normalizeKeyValueSection(sec) {
  if (!sec?.data) return { rows: [] }
  if (Array.isArray(sec.data?.rows)) {
    return { rows: sec.data.rows.map(r => ({ key: r.key ?? "", value: String(r.value ?? "") })) }
  }
  return { rows: rowsFromObject(sec.data) }
}

const DEFAULT_SPECS_ROWS = [
  { key: "Weight", value: "" },
  { key: "Max Takeoff Weight", value: "" },
  { key: "Flight Duration", value: "" },
  { key: "Frame Length", value: "" },
  { key: "Height", value: "" },
]

const DEFAULT_MATERIALS_ROWS = [
  { key: "Arms", value: "" },
  { key: "Motor Mounts", value: "" },
  { key: "Arm To Chassis", value: "" },
  { key: "Chassis", value: "" },
  { key: "ESCs", value: "" },
  { key: "Motors", value: "" },
  { key: "Battery", value: "" },
  { key: "Props", value: "" },
  { key: "Flight Controller", value: "" },
  { key: "Firmware", value: "" },
]

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const styleTag = document.createElement("style")
      styleTag.innerHTML = `
        @media (max-width: 900px) {
          body { overflow-x: hidden; }
          [style*="max-width: 1400px"] { padding: 1.2rem !important; }
          [style*="grid-template-columns: repeat(auto-fit"] {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
          }
          input, textarea, button { font-size: 0.9rem !important; }
          h1 { font-size: 1.6rem !important; }
          h2, h3, h4 { font-size: 1rem !important; }
          div[style*="padding: 1.5rem"][style*="border-radius: 18px"] {
            padding: 1rem !important;
          }
          div[style*="display: grid"][style*="minmax(90px"] {
            grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)) !important;
          }
        }
        @media (max-width: 600px) {
          [style*="padding: 4rem 0"] { padding: 2rem 0 !important; }
          input, textarea, button { width: 100% !important; }
          div[style*="grid-template-columns: 32px 1fr 1fr 36px"] {
            grid-template-columns: 24px 1fr 1fr 28px !important;
            gap: 0.4rem !important;
          }
        }
      `
      document.head.appendChild(styleTag)
      return () => styleTag.remove()
    }
  }, [])

  const createContactSection = (projectName = "this project") => ({
    id: "contact-fixed",
    type: "contact",
    data: {
      email: "empaerial.uav@gmail.com",
      link: "/#contact",
      message: `Interested in ${projectName}?`,
    },
  })

  const [form, setForm] = useState({ name: "", summary: "", image_url: "", slug: "", id: null, gallery_images: [] })
  const [sections, setSections] = useState([])
  const [projects, setProjects] = useState([])
  const [blogs, setBlogs] = useState([])
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    author: "",
    image_url: "",
    content: "",
    video_url: "",
    graph_data: { labels: [], values: [] },
    gallery_images: [],
    id: null,
  })

  const [dragBlogIdx, setDragBlogIdx] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("isAdmin") !== "true") {
      router.push("/admin-login")
    }
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
    (text || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")

  const sectionTemplates = {
    specs: { rows: DEFAULT_SPECS_ROWS.map(r => ({ ...r })) },         // defaults always
    materials: { rows: DEFAULT_MATERIALS_ROWS.map(r => ({ ...r })) }, // defaults always
    gallery: { images: [] },
    text: { heading: "ABOUT THIS PROJECT", content: "" },
  }

  const addSection = (type) => setSections(prev => [...prev, { id: Date.now(), type, data: sectionTemplates[type] || {} }])
  const updateSection = (id, newData) => setSections(prev => prev.map(s => s.id === id ? { ...s, data: newData } : s))
  const removeSection = (id) => setSections(prev => prev.filter(s => s.id !== id))

  const handleProjectSubmit = async (e) => {
    e.preventDefault()

    const normalized = sections.map(sec => {
      if (sec.type === "specs" || sec.type === "materials") {
        const data = normalizeKeyValueSection(sec)
        const rows = (data.rows || []).map(r => ({
          key: toTitleCaseNoUnderscore(r.key),
          value: r.value
        }))
        return { ...sec, data: { rows } }
      }
      if (sec.type === "gallery") {
        const images = Array.isArray(sec.data?.images) ? sec.data.images : []
        return { ...sec, data: { images } }
      }
      return sec
    })

    const filteredSections = normalized.filter(s => s.type !== "contact")
    const contact = createContactSection(form.name || "this project")
    const payload = { ...form, sections: [...filteredSections, contact] }

    try {
      const res = await fetch("/api/projects", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      const updated = await res.json()
      alert(form.id ? "✅ Project updated!" : "✅ Project added!")
      if (form.id) setProjects(prev => prev.map(p => (p.id === form.id ? updated : p)))
      else setProjects(prev => [...prev, updated])
      setForm({ name: "", summary: "", image_url: "", slug: "", id: null, gallery_images: [] })
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
      if (blogForm.id) setBlogs(prev => prev.map(b => (b.id === blogForm.id ? updated : b)))
      else setBlogs(prev => [...prev, updated])
      setBlogForm({ title: "", slug: "", author: "", image_url: "", content: "", video_url: "", graph_data: { labels: [], values: [] }, gallery_images: [], id: null })
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
        gallery_images: item.gallery_images || [],
      })
      try {
        if (item.sections) {
          const parsed = Array.isArray(item.sections) ? item.sections : JSON.parse(item.sections)
          setSections(parsed.filter(s => s.type !== "contact").map(sec => {
            if (sec.type === "gallery") {
              return { ...sec, data: { images: Array.isArray(sec.data?.images) ? sec.data.images : [] } }
            }
            if (sec.type === "specs" || sec.type === "materials") {
              return { ...sec, data: normalizeKeyValueSection(sec) }
            }
            return sec
          }))
        } else {
          setSections([])
        }
      } catch {
        setSections([])
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (type === "blog") {
      setBlogForm({
        title: item.title || "",
        slug: item.slug || "",
        author: item.author || "",
        image_url: item.image_url || "",
        content: item.content || "",
        video_url: item.video_url || "",
        graph_data: item.graph_data || { labels: [], values: [] },
        gallery_images: item.gallery_images || [],
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
      if (type === "project") setProjects(prev => prev.filter(p => p?.id !== id))
      else setBlogs(prev => prev.filter(b => b?.id !== id))
    } catch (err) {
      console.error("Delete error:", err)
      alert("❌ Deletion failed.")
    }
  }

  const onBlogThumbDragStart = (i) => setDragBlogIdx(i)
  const onBlogThumbDragOver = (e) => e.preventDefault()
  const onBlogThumbDrop = (i) => {
    if (dragBlogIdx === null || dragBlogIdx === i) return
    setBlogForm(prev => ({ ...prev, gallery_images: moveItem(prev.gallery_images || [], dragBlogIdx, i) }))
    setDragBlogIdx(null)
  }

  return (
    <div style={pageContainer}>
      <div style={panelContainer}>
        <h1 style={title}>ADMIN DASHBOARD</h1>
        <p style={subtitle}>Build drone pages dynamically & manage blogs</p>

        <div style={gridContainer}>
          {}
          <div style={sectionCard}>
            <h2 style={sectionTitle}>{form.id ? "✏️ Edit Project" : "✈️ Add New Project"}</h2>
            <form onSubmit={handleProjectSubmit} style={formLayout}>
              <input
                placeholder="Project Name"
                value={form.name}
                onChange={e => {
                  const val = e.target.value
                  setForm(prev => ({ ...prev, name: val, slug: generateSlug(val) }))
                }}
                style={inputField}
              />
              <input
                placeholder="Summary"
                value={form.summary}
                onChange={e => setForm(prev => ({ ...prev, summary: e.target.value }))}
                style={inputField}
              />

              {}
              <div style={{ ...builderBox, padding: "1rem" }}>
                <h3 style={miniHeader}>🖼 Project Cover</h3>
                <FileDrop
                  label="Upload Project Cover"
                  folder=""
                  onUploaded={(url) => setForm(prev => ({ ...prev, image_url: url }))}
                />
                {form.image_url && (
                  <div style={{ display: "grid", gridTemplateColumns: "90px", gap: "10px" }}>
                    <div style={thumbBox}>
                      <img src={form.image_url} alt="project-cover" style={thumbImg}/>
                      <button type="button" onClick={() => setForm(prev => ({ ...prev, image_url: "" }))} title="Remove" style={thumbClose}>✕</button>
                    </div>
                  </div>
                )}
              </div>

              <input placeholder="Slug (auto-generated)" value={form.slug} readOnly style={readonlyInput} />

              {}
              <div style={builderBox}>
                <h3 style={miniHeader}>🧩 Page Builder</h3>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {["specs", "materials", "gallery", "text"].map(type => (
                    <button key={type} type="button" onClick={() => addSection(type)} style={addSectionBtn}>
                      + {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {sections.map((s) => (
                    <div key={s.id} style={sectionEditorBox}>
                      <h4 style={{ color: "#00B4D8" }}>{s.type.toUpperCase()}</h4>

                      {}
                      {(s.type === "specs" || s.type === "materials") ? (
                        <KVEditor
                          rows={
                            Array.isArray(s.data?.rows) && s.data.rows.length > 0
                              ? s.data.rows
                              : (s.type === "specs" ? DEFAULT_SPECS_ROWS : DEFAULT_MATERIALS_ROWS)
                          }
                          onChange={(rows) => updateSection(s.id, { rows })}
                        />
                      ) : s.type === "text" ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                          <input
                            type="text"
                            placeholder="Heading (e.g., ABOUT THIS PROJECT)"
                            value={s.data.heading}
                            onChange={(e) => updateSection(s.id, { ...s.data, heading: e.target.value })}
                            style={inputField}
                          />
                          <textarea
                            placeholder="Write content here..."
                            value={s.data.content}
                            onChange={(e) => updateSection(s.id, { ...s.data, content: e.target.value })}
                            style={{ ...builderTextarea, minHeight: "120px" }}
                          />
                        </div>
                      ) : s.type === "gallery" ? (
                        <ProjectGalleryEditor
                          images={Array.isArray(s.data?.images) ? s.data.images : []}
                          onChange={(images) => updateSection(s.id, { images })}
                        />
                      ) : (
                        <textarea
                          placeholder={`Edit data for ${s.type} section (JSON)...`}
                          value={JSON.stringify(s.data, null, 2)}
                          onChange={(e) => {
                            try { updateSection(s.id, JSON.parse(e.target.value)) }
                            catch { updateSection(s.id, { raw: e.target.value }) }
                          }}
                          style={builderTextarea}
                        />
                      )}

                      <button type="button" onClick={() => removeSection(s.id)} style={deleteButton}>
                        Remove Section
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" style={submitButton}>
                {form.id ? "💾 Update Project" : "+ Save Project"}
              </button>
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

          {}
          <div style={sectionCard}>
            <h2 style={sectionTitle}>{blogForm.id ? "✏️ Edit Blog" : "📰 Add New Blog"}</h2>
            <form onSubmit={handleBlogSubmit} style={formLayout}>
              <input
                placeholder="Blog Title"
                value={blogForm.title}
                onChange={e => setBlogForm(prev => ({ ...prev, title: e.target.value, slug: generateSlug(e.target.value) }))}
                style={inputField}
              />
              <input placeholder="Author" value={blogForm.author} onChange={e => setBlogForm(prev => ({ ...prev, author: e.target.value }))} style={inputField} />

              {}
              <div style={{ ...builderBox, padding: "1rem" }}>
                <h3 style={miniHeader}>🖼 Blog Cover</h3>
                <FileDrop
                  label="Upload Blog Cover"
                  folder=""
                  onUploaded={(url) => setBlogForm(prev => ({ ...prev, image_url: url }))}
                />
                {blogForm.image_url && (
                  <div style={{ display: "grid", gridTemplateColumns: "90px", gap: "10px" }}>
                    <div style={thumbBox}>
                      <img src={blogForm.image_url} alt="blog-cover" style={thumbImg}/>
                      <button type="button" onClick={() => setBlogForm(prev => ({ ...prev, image_url: "" }))} title="Remove" style={thumbClose}>✕</button>
                    </div>
                  </div>
                )}
              </div>

              <textarea placeholder="Write blog content..." value={blogForm.content} onChange={e => setBlogForm(prev => ({ ...prev, content: e.target.value }))} style={{ ...builderTextarea, minHeight: "120px" }} />
              <input placeholder="Video URL (YouTube or MP4)" value={blogForm.video_url || ""} onChange={e => setBlogForm(prev => ({ ...prev, video_url: e.target.value }))} style={inputField} />

              {}
              <div style={{ ...builderBox, padding: "1rem", marginTop: "1rem" }}>
                <h3 style={miniHeader}>🖼 Blog Gallery</h3>
                <FileDropMulti
                  label="Upload Gallery Images"
                  folder=""
                  onUploaded={(urls) => setBlogForm(prev => ({ ...prev, gallery_images: [...(prev.gallery_images || []), ...urls] }))}
                />
                {Array.isArray(blogForm.gallery_images) && blogForm.gallery_images.length > 0 && (
                  <div style={gridThumbs}>
                    {blogForm.gallery_images.map((url, idx) => (
                      <div
                        key={`${url}-${idx}`}
                        style={thumbBox}
                        draggable
                        onDragStart={() => onBlogThumbDragStart(idx)}
                        onDragOver={onBlogThumbDragOver}
                        onDrop={() => onBlogThumbDrop(idx)}
                        title="Drag to reorder"
                      >
                        <img src={url} alt={`gallery-${idx}`} style={thumbImg}/>
                        <button
                          type="button"
                          onClick={() => {
                            setBlogForm(prev => {
                              const copy = [...(prev.gallery_images || [])]
                              copy.splice(idx, 1)
                              return { ...prev, gallery_images: copy }
                            })
                          }}
                          title="Remove"
                          style={thumbClose}
                        >✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {}
              <div style={{ ...builderBox, padding: "1rem" }}>
                <h3 style={miniHeader}>📊 Graph Builder</h3>
                <p style={{ fontSize: "0.85rem", color: "#aaa", marginBottom: "1rem" }}>
                  Add X (labels) and Y (values) below to generate your graph.
                </p>

                {(blogForm.graph_data?.labels || []).map((label, i) => (
                  <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
                    <input
                      type="text"
                      placeholder={`X${i + 1} Label`}
                      value={label}
                      onChange={(e) => {
                        const newLabels = [...(blogForm.graph_data?.labels || [])]
                        newLabels[i] = e.target.value
                        setBlogForm(prev => ({ ...prev, graph_data: { labels: newLabels, values: prev.graph_data?.values || [] } }))
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
                        setBlogForm(prev => ({ ...prev, graph_data: { labels: prev.graph_data?.labels || [], values: newValues } }))
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
                        setBlogForm(prev => ({ ...prev, graph_data: { labels: newLabels, values: newValues } }))
                      }}
                      style={iconDeleteBtn}
                      title="Remove point"
                    >
                      ✖
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setBlogForm(prev => ({
                      ...prev,
                      graph_data: {
                        labels: [...(prev.graph_data?.labels || []), ""],
                        values: [...(prev.graph_data?.values || []), 0],
                      },
                    }))
                  }}
                  style={{ ...addSectionBtn, width: "100%" }}
                >
                  + Add Data Point
                </button>
              </div>

              <input placeholder="Slug (auto-generated)" value={blogForm.slug} readOnly style={readonlyInput} />
              <button type="submit" style={submitButton}>{blogForm.id ? "💾 Update Blog" : "+ Add Blog"}</button>
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


function FileDrop({ label, folder, onUploaded }) {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: async (files) => {
      const file = files[0]
      if (!file) return
      setUploading(true)
      try {
        const url = await uploadWithProgress(file, folder, setProgress)
        onUploaded(url)
        alert(`✅ ${label} uploaded!`)
      } catch (err) {
        alert("❌ Upload failed")
      } finally {
        setUploading(false)
        setProgress(0)
      }
    },
  })

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed rgba(0,180,216,0.4)",
        borderRadius: "10px",
        padding: "1rem",
        textAlign: "center",
        color: "#00B4D8",
        background: isDragActive ? "rgba(0,180,216,0.1)" : "rgba(255,255,255,0.04)",
        cursor: "pointer",
        marginBottom: "0.5rem",
        transition: "0.3s",
      }}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <p>Uploading... {progress}%</p>
      ) : (
        <p>{isDragActive ? "Drop file here" : `${label} (click or drop)`}</p>
      )}
    </div>
  )
}


function FileDropMulti({ label, folder, onUploaded }) {
  const [uploading, setUploading] = useState(false)
  const [overall, setOverall] = useState(0)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: { "image/*": [] },
    onDrop: async (files) => {
      if (!files || files.length === 0) return
      setUploading(true)
      try {
        const total = files.length
        let done = 0
        const urls = []
        for (const f of files) {
          const url = await uploadWithProgress(f, folder, () => {})
          urls.push(url)
          done += 1
          setOverall(Math.round((done / total) * 100))
        }
        onUploaded(urls)
        alert(`✅ Uploaded ${urls.length} file(s)!`)
      } catch (e) {
        alert("❌ Some uploads failed")
      } finally {
        setUploading(false)
        setOverall(0)
      }
    },
  })

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed rgba(0,180,216,0.4)",
          borderRadius: "10px",
          padding: "1rem",
          textAlign: "center",
          color: "#00B4D8",
          background: isDragActive ? "rgba(0,180,216,0.1)" : "rgba(255,255,255,0.04)",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p>Uploading... {overall}%</p>
        ) : (
          <p>{isDragActive ? "Drop images here" : `${label} (click or drop multiple)`}</p>
        )}
      </div>
    </div>
  )
}

function KVEditor({ rows, onChange }) {
  const [dragIdx, setDragIdx] = useState(null);

  const onDragStart = (i) => setDragIdx(i);
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (i) => {
    if (dragIdx === null || dragIdx === i) return;
    const next = moveItem(rows || [], dragIdx, i);
    onChange(next);
    setDragIdx(null);
  };

  const updateKey = (i, val) => {
    const next = rows.map((r, idx) => (idx === i ? { ...r, key: val } : r));
    onChange(next);
  };
  const updateValue = (i, val) => {
    const next = rows.map((r, idx) => (idx === i ? { ...r, value: val } : r));
    onChange(next);
  };
  const addRow = () => onChange([...(rows || []), { key: "", value: "" }]);
  const removeRow = (i) => onChange(rows.filter((_, idx) => idx !== i));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {(rows || []).map((r, i) => (
        <div
          key={i}
          draggable
          onDragStart={() => onDragStart(i)}
          onDragOver={onDragOver}
          onDrop={() => onDrop(i)}
          title="Drag to reorder"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(15, 20, 25, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "8px",
            padding: "0.6rem 0.8rem",
          }}
        >
          {}
          <div
            style={{
              color: "#00B4D8",
              fontSize: "1rem",
              cursor: "grab",
              userSelect: "none",
              flex: "0 0 auto",
            }}
          >
            ⠿
          </div>

          {}
          <input
            type="text"
            value={r.key ?? ""}
            onChange={(e) => updateKey(i, e.target.value)}
            placeholder="Attribute"
            style={{
              ...inputField,
              flex: "1 1 42%",
              minWidth: "120px",
              background: "rgba(20, 25, 30, 0.8)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff",
              fontSize: "0.9rem",
            }}
          />

          {}
          <input
            type="text"
            value={r.value ?? ""}
            onChange={(e) => updateValue(i, e.target.value)}
            placeholder="Value"
            style={{
              ...inputField,
              flex: "1 1 42%",
              minWidth: "120px",
              background: "rgba(20, 25, 30, 0.8)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff",
              fontSize: "0.9rem",
            }}
          />

          {}
          <button
            type="button"
            onClick={() => removeRow(i)}
            title="Remove row"
            style={{
              background: "rgba(255,60,60,0.15)",
              border: "1px solid rgba(255,100,100,0.25)",
              color: "#FF6B6B",
              borderRadius: "6px",
              padding: "0.4rem 0.7rem",
              cursor: "pointer",
              flex: "0 0 auto",
              transition: "0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,80,80,0.25)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,60,60,0.15)")
            }
          >
            ✖
          </button>
        </div>
      ))}

      {}
      <button
        type="button"
        onClick={addRow}
        style={{
          ...addSectionBtn,
          width: "100%",
          marginTop: "0.5rem",
          fontWeight: "600",
          padding: "0.7rem 0",
        }}
      >
        + Add Row
      </button>

      <style jsx>{`
        @media (max-width: 768px) {
          div[draggable] {
            flex-direction: column;
            align-items: stretch;
          }
          div[draggable] input {
            width: 100%;
          }
          div[draggable] button {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
}

function ProjectGalleryEditor({ images, onChange }) {
  const [dragIdx, setDragIdx] = useState(null)

  const onThumbDragStart = (i) => setDragIdx(i)
  const onThumbDragOver = (e) => e.preventDefault()
  const onThumbDrop = (i) => {
    if (dragIdx === null || dragIdx === i) return
    const next = moveItem(images || [], dragIdx, i)
    onChange(next)
    setDragIdx(null)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <FileDropMulti
        label="Upload Project Gallery Images"
        folder=""
        onUploaded={(urls) => onChange([...(images || []), ...urls])}
      />
      {Array.isArray(images) && images.length > 0 && (
        <div style={gridThumbs}>
          {images.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              style={thumbBox}
              draggable
              onDragStart={() => onThumbDragStart(idx)}
              onDragOver={onThumbDragOver}
              onDrop={() => onThumbDrop(idx)}
              title="Drag to reorder"
            >
              <img src={url} alt={`proj-gallery-${idx}`} style={thumbImg}/>
              <button
                type="button"
                onClick={() => {
                  const arr = [...images]
                  arr.splice(idx, 1)
                  onChange(arr)
                }}
                title="Remove"
                style={thumbClose}
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const gridThumbs = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
  gap: "10px",
  marginTop: "10px",
}
const thumbBox = {
  position: "relative",
  width: "100%",
  paddingTop: "100%",
  borderRadius: "10px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
  transition: "transform 350ms ease, box-shadow 350ms ease",
}
const thumbImg = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
}
const thumbClose = {
  position: "absolute",
  top: 4, right: 4,
  background: "rgba(0,0,0,0.6)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "6px",
  fontSize: "12px",
  padding: "2px 6px",
  cursor: "pointer"
}


const pageContainer = { minHeight: "100vh", background: "radial-gradient(circle at top, #001933 0%, #000814 70%)", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "4rem 0", color: "#fff", fontFamily: "'Inter', sans-serif" }
const panelContainer = { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", padding: "2rem", width: "100%", maxWidth: "1400px", boxShadow: "0 0 30px rgba(0, 255, 255, 0.1)" }
const title = { textAlign: "center", color: "#00E0FF", fontWeight: "700", marginBottom: "0.5rem", fontSize: "2rem" }
const subtitle = { textAlign: "center", color: "#A0AEC0", marginBottom: "2rem" }
const gridContainer = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "2rem", width: "100%" }

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
const scrollList = { maxHeight: "230px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.7rem" }
const miniHeader = { color: "#00B4D8", marginBottom: "1rem", fontWeight: "600" }

const listItem = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.06)", padding: "0.9rem 1rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }
const deleteButton = { background: "rgba(255, 60, 60, 0.15)", border: "1px solid rgba(255, 100, 100, 0.25)", color: "#FF6B6B", padding: "6px 13px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }
const iconDeleteBtn = { background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,100,100,0.3)", color: "#FF6B6B", borderRadius: "8px", cursor: "pointer", padding: "0.3rem 0.8rem", fontWeight: "700" }
const editButton = { background: "rgba(0, 180, 216, 0.15)", border: "1px solid rgba(0, 180, 216, 0.25)", color: "#00B4D8", padding: "6px 13px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }
