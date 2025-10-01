'use client';
import { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import NotificationSystem from '@/components/NotificationSystem';

export const dynamic = 'force-dynamic';

export default function CandidateDashboard() {
  const router = useRouter();
  const [matches, setMatches] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData() {
    const user = await getCurrentUser();
    if (!user) { router.push('/login'); return; }

    const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    setProfile(profileData);

    const { data: candProfile } = await supabase.from('candidate_profiles').select('id').eq('user_id', user.id).single();
    if (!candProfile) return;

    const { data: matchData } = await supabase.from('matches').select('*, jobs(*)').eq('candidate_id', candProfile.id).order('match_score', { ascending: false }).limit(10);
    setMatches(matchData || []);

    const { data: appData } = await supabase.from('applications').select('*, jobs(title)').eq('candidate_id', candProfile.id).order('created_at', { ascending: false });
    setApplications(appData || []);
  }

  async function handleSignOut() {
    await signOut();
    router.push('/');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7' }}>
      <header style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#89CFF0', margin: 0 }}>WeAreJobPilot</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <NotificationSystem />
            <span>Hallo, {profile?.full_name || 'Gebruiker'}</span>
            <button onClick={handleSignOut} style={{ padding: '8px 16px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Uitloggen</button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#89CFF0', margin: 0 }}>{matches.length}</p>
            <p style={{ color: '#6B7280', margin: '8px 0 0 0' }}>AI Matches</p>
          </div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#10B981', margin: 0 }}>{applications.length}</p>
            <p style={{ color: '#6B7280', margin: '8px 0 0 0' }}>Sollicitaties</p>
          </div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#F59E0B', margin: 0 }}>0</p>
            <p style={{ color: '#6B7280', margin: '8px 0 0 0' }}>Opgeslagen</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Jouw AI Matches</h2>
            {matches.length === 0 ? (
              <div style={{ background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ color: '#6B7280' }}>Nog geen matches. Voltooi je profiel voor betere matches!</p>
                <a href="/dashboard/candidate/profile" style={{ display: 'inline-block', marginTop: '16px', padding: '10px 20px', background: '#89CFF0', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>Profiel aanvullen</a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {matches.map((match: any) => (
                  <div key={match.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{match.jobs.title}</h3>
                        <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>{match.jobs.description.slice(0, 150)}...</p>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#10B981' }}>Match: {match.match_score}%</span>
                          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>•</span>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>{match.jobs.location}</span>
                        </div>
                      </div>
                      <a href={`/jobs/${match.jobs.id}`} style={{ padding: '8px 16px', background: '#89CFF0', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}>Bekijk →</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="/dashboard/candidate/cv" style={{ background: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', color: '#1F2937', fontWeight: '600', display: 'block', border: '1px solid #E5E7EB' }}>
                📄 CV Cleanup
              </a>
              <a href="/dashboard/candidate/cover-letter" style={{ background: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', color: '#1F2937', fontWeight: '600', display: 'block', border: '1px solid #E5E7EB' }}>
                ✍️ Cover Letter Generator
              </a>
              <a href="/dashboard/candidate/job-summary" style={{ background: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', color: '#1F2937', fontWeight: '600', display: 'block', border: '1px solid #E5E7EB' }}>
                📋 Job Summary
              </a>
              <a href="/dashboard/candidate/ai-buddy" style={{ background: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', color: '#1F2937', fontWeight: '600', display: 'block', border: '1px solid #E5E7EB' }}>
                🤖 AI Job Hunter
              </a>
              <a href="/dashboard/candidate/referrals" style={{ background: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', color: '#1F2937', fontWeight: '600', display: 'block', border: '1px solid #E5E7EB' }}>
                👥 Referrals
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
