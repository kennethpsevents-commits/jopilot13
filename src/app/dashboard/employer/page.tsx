'use client';
import { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function EmployerDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
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

    const { data: empProfile } = await supabase.from('employer_profiles').select('id').eq('user_id', user.id).single();
    if (!empProfile) return;

    const { data: jobsData } = await supabase.from('jobs').select('*').eq('employer_id', empProfile.id).order('created_at', { ascending: false });
    setJobs(jobsData || []);
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
            <span>Hallo, {profile?.full_name}</span>
            <button onClick={handleSignOut} style={{ padding: '8px 16px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Uitloggen</button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Mijn Vacatures</h2>
          <a href="/dashboard/employer/post-job" style={{ padding: '12px 24px', background: '#89CFF0', color: 'white', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}>+ Nieuwe Vacature</a>
        </div>

        {jobs.length === 0 ? (
          <div style={{ background: 'white', padding: '60px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '16px' }}>Je hebt nog geen vacatures geplaatst</p>
            <a href="/dashboard/employer/post-job" style={{ display: 'inline-block', padding: '12px 24px', background: '#89CFF0', color: 'white', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}>Plaats je eerste vacature</a>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {jobs.map((job) => (
              <div key={job.id} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{job.title}</h3>
                      <span style={{ fontSize: '12px', padding: '4px 12px', background: job.status === 'active' ? '#D1FAE5' : '#FEE2E2', color: job.status === 'active' ? '#065F46' : '#991B1B', borderRadius: '12px', fontWeight: '600' }}>
                        {job.status === 'active' ? 'Actief' : 'Gesloten'}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>{job.description.slice(0, 200)}...</p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6B7280' }}>
                      <span>👁️ {job.views} weergaven</span>
                      <span>📍 {job.location}</span>
                      <span>{job.remote_type === 'remote' ? '🏠 Remote' : job.remote_type === 'hybrid' ? '🔄 Hybrid' : '🏢 Onsite'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={`/dashboard/employer/jobs/${job.id}`} style={{ padding: '8px 16px', background: '#89CFF0', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Beheren</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
