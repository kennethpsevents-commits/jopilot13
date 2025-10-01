'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) loadJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  async function loadJob() {
    if (!params?.id) return;
    try {
      // Load dummy jobs from JSON file
      const response = await fetch('/dummy-jobs.json');
      const data = await response.json();
      
      // Find job by ID (extract number from job-1, job-2, etc.)
      const jobIndex = parseInt(params.id.toString().replace('job-', '')) - 1;
      const foundJob = data[jobIndex];
      
      if (foundJob) {
        setJob({
          ...foundJob,
          id: params.id,
          views: Math.floor(Math.random() * 100) + 10 // Random view count
        });
      } else {
        setJob(null);
      }
    } catch (err) {
      console.error(err);
      setJob(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Laden...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '16px' }}>Vacature niet gevonden</p>
          <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', color: '#89CFF0', fontWeight: '600', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>← Terug naar overzicht</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7' }}>
      <header style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', color: '#89CFF0', textDecoration: 'none', fontWeight: '600', cursor: 'pointer', padding: 0 }}>← Terug naar overzicht</button>
        </div>
      </header>

      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', marginBottom: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>{job.title}</h1>
            <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '16px', fontWeight: '600' }}>{job.company}</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', color: '#6B7280' }}>
              <span>📍 {job.location}</span>
              <span>{job.contract_type === 'full-time' ? '⏰ Full-time' : job.contract_type === 'part-time' ? '⏰ Part-time' : job.contract_type === 'remote' ? '🏠 Remote' : '💼 ' + job.contract_type}</span>
              <span>👁️ {job.views} views</span>
            </div>
          </div>

          <div style={{ padding: '16px', background: '#E0F2FE', borderRadius: '8px', marginBottom: '24px' }}>
            <p style={{ fontSize: '18px', fontWeight: '600', color: '#0369A1', margin: 0 }}>
              {job.salary_min && job.salary_max ? `€${job.salary_min.toLocaleString()} - €${job.salary_max.toLocaleString()} per jaar` : 'Salaris bespreekbaar'}
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Vereiste Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {job.skills?.map((skill: string, idx: number) => (
                <span key={idx} style={{ padding: '8px 16px', background: '#F3F4F6', borderRadius: '16px', fontSize: '14px', fontWeight: '500' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Over deze functie</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
              We zijn op zoek naar een {job.title.toLowerCase()} bij {job.company}. 
              Deze functie biedt de mogelijkheid om te werken met moderne technologieën en 
              deel te nemen aan innovatieve projecten. We zoeken iemand die gepassioneerd is 
              over {job.skills?.slice(0, 2).join(' en ')} en klaar is voor een nieuwe uitdaging.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Deel deze vacature</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')} style={{ padding: '8px 12px', background: '#0A66C2', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>in LinkedIn</button>
              <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(job.title)}`, '_blank', 'width=600,height=400')} style={{ padding: '8px 12px', background: '#1DA1F2', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>𝕏 Twitter</button>
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(job.title + ' ' + window.location.href)}`, '_blank', 'width=600,height=400')} style={{ padding: '8px 12px', background: '#25D366', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>💬 WhatsApp</button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link gekopieerd!'); }} style={{ padding: '8px 12px', background: '#6B7280', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>🔗 Kopieer</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="/register"
              style={{ padding: '14px 32px', background: '#89CFF0', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}
            >
              Solliciteren →
            </a>
            <button
              onClick={() => alert('Functie opgeslagen!')}
              style={{ padding: '14px 24px', background: 'white', color: '#89CFF0', border: '2px solid #89CFF0', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
            >
              💾 Opslaan
            </button>
          </div>
        </div>

        <div style={{ background: '#DBEAFE', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#1E40AF', marginBottom: '12px' }}>
            Interesse in deze functie?
          </p>
          <p style={{ color: '#1E40AF', marginBottom: '16px' }}>
            Maak een gratis account aan en laat AI je CV optimaliseren voor betere kansen!
          </p>
          <a href="/register" style={{ padding: '12px 28px', background: '#1E40AF', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: '600', display: 'inline-block' }}>
            Gratis account aanmaken
          </a>
        </div>
      </div>
    </div>
  );
}
