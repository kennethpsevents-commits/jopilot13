

'use client';
import { useState } from 'react';
import FeedbackButtons from '@/components/FeedbackButtons';

export const dynamic = 'force-dynamic';

export default function CVUploadPage() {
  const [cvText, setCvText] = useState('');
  const [cleanedCV, setCleanedCV] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCleanCV() {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'cv-clean', text: cvText })
      });
      const data = await res.json();
      if (data.ok) {
        setCleanedCV(data.output);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#89CFF0' }}>CV Cleanup met AI</h1>
        <p style={{ color: '#6B7280', marginBottom: '32px' }}>Plak je CV hieronder en laat AI het opschonen en professionaliseren</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Jouw CV (tekst)</label>
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Plak hier je CV tekst..."
              style={{ width: '100%', height: '400px', padding: '16px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', fontFamily: 'monospace' }}
            />
            <button
              onClick={handleCleanCV}
              disabled={!cvText || loading}
              style={{ marginTop: '16px', padding: '12px 24px', background: '#89CFF0', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: (!cvText || loading) ? 0.6 : 1 }}
            >
              {loading ? 'AI werkt...' : '✨ Opschonen met AI'}
            </button>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Opgeschoonde versie</label>
            <div style={{ background: 'white', padding: '16px', border: '1px solid #D1D5DB', borderRadius: '8px', height: '400px', overflow: 'auto', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.6' }}>
              {cleanedCV || <span style={{ color: '#9CA3AF' }}>De opgeschoonde versie verschijnt hier...</span>}
            </div>
            {cleanedCV && (
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => navigator.clipboard.writeText(cleanedCV)}
                  style={{ padding: '10px 20px', background: '#10B981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                >
                  📋 Kopieer naar klembord
                </button>
                <FeedbackButtons feature="cv_cleanup" itemId="cv-cleanup-result" />
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '32px', background: '#DBEAFE', padding: '16px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#1E40AF' }}>💡 Tips</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#1E40AF' }}>
            <li>Plak de ruwe tekst van je CV (Word, PDF-export, etc.)</li>
            <li>AI verwijdert opmaakfouten en maakt de tekst professioneler</li>
            <li>Je kunt daarna de opgeschoonde versie gebruiken in sollicitaties</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
