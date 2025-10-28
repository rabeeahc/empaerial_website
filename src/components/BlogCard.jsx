export default function BlogCard({ blog }) {
  return (
    <a
      href={`/blogs/${blog.slug}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        background: "rgba(255,255,255,0.05)",
        padding: "1.5rem",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "0.3s",
        display: "block",
      }}
    >
      <img
        src={blog.image_url || "/images/default-drone.png"}
        alt={blog.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      />
      <h2 style={{ color: "#00B4D8", fontSize: "1.3rem" }}>{blog.title}</h2>
      <p style={{ color: "#bbb", marginTop: "0.5rem" }}>
        {blog.content.slice(0, 100)}...
      </p>
    </a>
  );
}
