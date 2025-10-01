'use client';
import { useState } from 'react';
import FeedbackButtons from '@/components/FeedbackButtons';

export const dynamic = 'force-dynamic';

export default function CoverLetterPage() {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerateCoverLetter() {
    if (!cvText.trim() || !jobDescription.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mode: 'cover-letter', 
          text: cvText,
          job: {
            description: jobDescription,
            title: 'Functie',
            company: 'Bedrijf'
          }
        })
      });
      
      const data = await response.json();
      if (data.ok) {
        setCoverLetter(data.output);
      } else {
        throw new Error(data.error || 'Cover letter generation failed');
      }
    } catch (error) {
      console.error('Cover letter error:', error);
      setCoverLetter('Sorry, er is een fout opgetreden bij het genereren van de sollicitatiebrief. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#89CFF0' }}>Cover Letter Generator</h1>
        <p style={{ color: '#6B7280', marginBottom: '32px' }}>Laat AI een professionele sollicitatiebrief voor je schrijven</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Jouw CV (tekst)</label>
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Plak hier je CV tekst..."
              style={{ width: '100%', height: '200px', padding: '16px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', fontFamily: 'monospace', marginBottom: '16px' }}
            />
            
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Vacature beschrijving</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Plak hier de vacature beschrijving..."
              style={{ width: '100%', height: '200px', padding: '16px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', fontFamily: 'monospace' }}
            />
            
            <button
              onClick={handleGenerateCoverLetter}
              disabled={!cvText.trim() || !jobDescription.trim() || loading}
              style={{ 
                marginTop: '16px', 
                padding: '12px 24px', 
                background: '#89CFF0', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                fontWeight: '600', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                opacity: (!cvText.trim() || !jobDescription.trim() || loading) ? 0.6 : 1 
              }}
            >
              {loading ? 'AI werkt...' : '✨ Genereer Cover Letter'}
            </button>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Gegenereerde Cover Letter</label>
            <div style={{ background: 'white', padding: '16px', border: '1px solid #D1D5DB', borderRadius: '8px', height: '400px', overflow: 'auto', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.6' }}>
              {coverLetter || <span style={{ color: '#9CA3AF' }}>De cover letter verschijnt hier...</span>}
            </div>
            {coverLetter && (
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => navigator.clipboard.writeText(coverLetter)}
                  style={{ padding: '10px 20px', background: '#10B981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                >
                  📋 Kopieer naar klembord
                </button>
                <FeedbackButtons feature="cover_letter" itemId="cover-letter-result" />
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '32px', background: '#DBEAFE', padding: '16px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#1E40AF' }}>💡 Tips</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#1E40AF' }}>
            <li>Zorg dat je CV en de vacature beschrijving compleet zijn</li>
            <li>AI past de brief aan op basis van de specifieke functie</li>
            <li>Lees de brief altijd door en pas aan waar nodig</li>
            <li>Gebruik de feedback knop om de AI te verbeteren</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

