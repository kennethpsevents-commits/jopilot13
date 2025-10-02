'use client';
import { useState } from 'react';
import FeedbackButtons from '@/components/FeedbackButtons';

export const dynamic = 'force-dynamic';

export default function JobSummaryPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerateSummary() {
    if (!jobDescription.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mode: 'job-summary', 
          text: jobDescription
        })
      });
      
      const data = await response.json();
      if (data.ok) {
        setSummary(data.output);
      } else {
        throw new Error(data.error || 'Summary generation failed');
      }
    } catch (error) {
      console.error('Summary error:', error);
      setSummary('Sorry, er is een fout opgetreden bij het genereren van de samenvatting. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#89CFF0' }}>Job Summary Generator</h1>
        <p style={{ color: '#6B7280', marginBottom: '32px' }}>Laat AI een vacature samenvatten en de belangrijkste vereisten extraheren</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Vacature beschrijving</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Plak hier de volledige vacature beschrijving..."
              style={{ width: '100%', height: '400px', padding: '16px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', fontFamily: 'monospace' }}
            />
            
            <button
              onClick={handleGenerateSummary}
              disabled={!jobDescription.trim() || loading}
              style={{ 
                marginTop: '16px', 
                padding: '12px 24px', 
                background: '#89CFF0', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                fontWeight: '600', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                opacity: (!jobDescription.trim() || loading) ? 0.6 : 1 
              }}
            >
              {loading ? 'AI werkt...' : '✨ Genereer Samenvatting'}
            </button>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>AI Samenvatting</label>
            <div style={{ background: 'white', padding: '16px', border: '1px solid #D1D5DB', borderRadius: '8px', height: '400px', overflow: 'auto', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.6' }}>
              {summary || <span style={{ color: '#9CA3AF' }}>De samenvatting verschijnt hier...</span>}
            </div>
            {summary && (
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => navigator.clipboard.writeText(summary)}
                  style={{ padding: '10px 20px', background: '#10B981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                >
                  📋 Kopieer naar klembord
                </button>
                <FeedbackButtons feature="job_summary" itemId="job-summary-result" />
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '32px', background: '#DBEAFE', padding: '16px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#1E40AF' }}>💡 Wat krijg je?</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#1E40AF' }}>
            <li><strong>Top 3 vereisten:</strong> De belangrijkste skills en ervaring</li>
            <li><strong>Functie samenvatting:</strong> Wat de rol precies inhoudt</li>
            <li><strong>Bedrijfscultuur:</strong> Wat voor werkgever het is</li>
            <li><strong>Match score:</strong> Hoe goed jij past bij deze functie</li>
          </ul>
        </div>
      </div>
    </div>
  );
}



