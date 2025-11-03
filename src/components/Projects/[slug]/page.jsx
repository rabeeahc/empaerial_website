'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        const data = await res.json();
        const found = data.find((p) => p.slug === slug);
        setProject(found);
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>;
  if (!project) return <p style={{ padding: '2rem' }}>Project not found.</p>;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '3rem',
      padding: '3rem',
      minHeight: '100vh',
      backgroundColor: '#0a0f12',
      color: '#eaeaea',
      fontFamily: 'Arial, sans-serif',
    }}>
      
      {}
      <div style={{ flex: '1', maxWidth: '45%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <img
          src={project.image_url || '/images/default-drone.png'}
          alt={project.name}
          style={{
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(0, 255, 200, 0.2)',
          }}
        />
      </div>

      {}
      <div style={{ flex: '1.2', maxWidth: '50%' }}>
        <h1 style={{ fontSize: '2.8rem', color: '#00e6a8', marginBottom: '0.8rem' }}>
          {project.name}
        </h1>
        <p style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: '2rem' }}>
          {project.description}
        </p>

        <h2 style={{ color: '#00bcd4', fontSize: '1.4rem', marginBottom: '1rem' }}>
          SPECIFICATIONS
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', color: '#ddd' }}>
          <tbody>
            <tr><td>Weight:</td><td>{project.weight || 'N/A'}</td></tr>
            <tr><td>Flight Duration:</td><td>{project.flight_duration || 'N/A'}</td></tr>
            <tr><td>Frame Length:</td><td>{project.frame_length || 'N/A'}</td></tr>
          </tbody>
        </table>

        <h2 style={{ color: '#00bcd4', fontSize: '1.4rem', marginBottom: '1rem' }}>
          MATERIALS
        </h2>
        <p>{project.materials || 'N/A'}</p>

        <h2 style={{ color: '#00bcd4', fontSize: '1.4rem', marginBottom: '1rem', marginTop: '2rem' }}>
          FEATURES
        </h2>
        <p>{project.features || 'N/A'}</p>

        <div style={{
          marginTop: '3rem',
          backgroundColor: '#10191e',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 0 12px rgba(0, 255, 200, 0.1)'
        }}>
          <h3 style={{ color: '#00e6a8' }}>Interested in {project.name}?</h3>
          <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '1rem' }}>
            For collaborations, sponsorships, or technical details, contact us.
          </p>
          <a
            href="mailto:contact@empaerial.com"
            style={{
              display: 'inline-block',
              padding: '10px 16px',
              background: 'linear-gradient(90deg, #00bcd4, #00e6a8)',
              color: '#fff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
