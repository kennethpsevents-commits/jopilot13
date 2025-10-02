'use client';
import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

interface RecruiterStats {
  totalCandidates: number;
  activeCandidates: number;
  jobPostings: number;
  applications: number;
  matches: number;
  interviews: number;
  hires: number;
  remainingFreeAds: number;
}

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_min: number;
  salary_max: number;
  status: 'draft' | 'active' | 'paused' | 'closed';
  views: number;
  applications: number;
  matches: number;
  posted_at: string;
  expires_at: string;
}

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: number;
  match_score: number;
  last_active: string;
  tier: 'buddy' | 'coach' | 'manager';
}

export default function RecruiterDashboard() {
  const [stats, setStats] = useState<RecruiterStats>({
    totalCandidates: 0,
    activeCandidates: 0,
    jobPostings: 0,
    applications: 0,
    matches: 0,
    interviews: 0,
    hires: 0,
    remainingFreeAds: 3
  });

  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load recruiter stats
      const statsRes = await fetch('/api/recruiter/stats');
      const statsData = await statsRes.json();
      setStats(statsData);

      // Load job postings
      const jobsRes = await fetch('/api/recruiter/jobs');
      const jobsData = await jobsRes.json();
      setJobPostings(jobsData);

      // Load candidates
      const candidatesRes = await fetch('/api/recruiter/candidates');
      const candidatesData = await candidatesRes.json();
      setCandidates(candidatesData);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const createJobPosting = async (jobData: any) => {
    try {
      const response = await fetch('/api/recruiter/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });

      if (response.ok) {
        alert('Vacature succesvol aangemaakt!');
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error creating job posting:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overzicht', icon: '📊' },
    { id: 'jobs', label: 'Vacatures', icon: '💼' },
    { id: 'candidates', label: 'Kandidaten', icon: '👥' },
    { id: 'matches', label: 'Matches', icon: '🎯' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#1F2937' }}>
                Recruiter Dashboard
              </h1>
              <p style={{ color: '#6B7280', fontSize: '16px' }}>
                Beheer je vacatures en vind de beste kandidaten
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ background: '#F0F9FF', padding: '12px 20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', color: '#6B7280' }}>Gratis Ads</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#89CFF0' }}>
                  {stats.remainingFreeAds}
                </div>
              </div>
              <button
                onClick={() => setActiveTab('jobs')}
                style={{
                  padding: '12px 24px',
                  background: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                + Nieuwe Vacature
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: 'white', borderRadius: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #E5E7EB', overflowX: 'auto' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 24px',
                  background: activeTab === tab.id ? '#F0F9FF' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid #89CFF0' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: activeTab === tab.id ? '#89CFF0' : '#6B7280',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '32px' }}>
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Recruiter Overzicht</h3>
                
                {/* Key Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ background: '#F0F9FF', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#89CFF0', marginBottom: '8px' }}>
                      {stats.totalCandidates.toLocaleString()}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>Totaal Kandidaten</div>
                  </div>
                  <div style={{ background: '#F0FDF4', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10B981', marginBottom: '8px' }}>
                      {stats.jobPostings.toLocaleString()}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>Actieve Vacatures</div>
                  </div>
                  <div style={{ background: '#FEF3C7', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#F59E0B', marginBottom: '8px' }}>
                      {stats.matches.toLocaleString()}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>AI Matches</div>
                  </div>
                  <div style={{ background: '#EDE9FE', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8B5CF6', marginBottom: '8px' }}>
                      {stats.hires.toLocaleString()}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>Succesvolle Hires</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={{ background: '#F9FAFB', padding: '20px', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Recente Activiteit</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>
                        {stats.applications}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>Nieuwe Sollicitaties</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>
                        {stats.interviews}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>Geplande Interviews</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>
                        {stats.activeCandidates}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>Actieve Kandidaten</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Mijn Vacatures</h3>
                  <button
                    onClick={() => {/* Open job creation modal */}}
                    style={{
                      padding: '12px 24px',
                      background: '#10B981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    + Nieuwe Vacature
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  {jobPostings.map((job) => (
                    <div key={job.id} style={{ background: '#F9FAFB', padding: '20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                        <div>
                          <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>{job.title}</h4>
                          <p style={{ color: '#6B7280', marginBottom: '8px' }}>{job.company} • {job.location}</p>
                          <p style={{ color: '#1F2937', fontWeight: '600' }}>
                            €{job.salary_min.toLocaleString()} - €{job.salary_max.toLocaleString()}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: job.status === 'active' ? '#D1FAE5' : job.status === 'paused' ? '#FEF3C7' : '#F3F4F6',
                            color: job.status === 'active' ? '#065F46' : job.status === 'paused' ? '#92400E' : '#6B7280'
                          }}>
                            {job.status}
                          </span>
                          <button style={{ padding: '6px 12px', background: '#89CFF0', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                            Bewerken
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '16px', marginTop: '16px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{job.views}</div>
                          <div style={{ color: '#6B7280', fontSize: '12px' }}>Views</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{job.applications}</div>
                          <div style={{ color: '#6B7280', fontSize: '12px' }}>Sollicitaties</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{job.matches}</div>
                          <div style={{ color: '#6B7280', fontSize: '12px' }}>AI Matches</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>
                            {new Date(job.posted_at).toLocaleDateString('nl-NL')}
                          </div>
                          <div style={{ color: '#6B7280', fontSize: '12px' }}>Geplaatst</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'candidates' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Kandidaten Database</h3>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  {candidates.map((candidate) => (
                    <div key={candidate.id} style={{ background: '#F9FAFB', padding: '20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                        <div>
                          <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>{candidate.name}</h4>
                          <p style={{ color: '#6B7280', marginBottom: '8px' }}>{candidate.title} • {candidate.location}</p>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {candidate.skills.slice(0, 5).map((skill, index) => (
                              <span key={index} style={{ background: '#E0F2FE', color: '#0369A1', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10B981' }}>
                              {candidate.match_score}%
                            </div>
                            <div style={{ color: '#6B7280', fontSize: '12px' }}>Match Score</div>
                          </div>
                          <button style={{ padding: '6px 12px', background: '#89CFF0', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                            Bekijk Profiel
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <span style={{ color: '#6B7280', fontSize: '14px' }}>
                            {candidate.experience} jaar ervaring
                          </span>
                          <span style={{ color: '#6B7280', fontSize: '14px' }}>
                            {candidate.tier.toUpperCase()} tier
                          </span>
                          <span style={{ color: '#6B7280', fontSize: '14px' }}>
                            Laatst actief: {new Date(candidate.last_active).toLocaleDateString('nl-NL')}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={{ padding: '6px 12px', background: '#10B981', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                            Contact
                          </button>
                          <button style={{ padding: '6px 12px', background: '#8B5CF6', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                            Interview
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add more tabs as needed */}
            {activeTab === 'matches' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>AI Matches</h3>
                <p style={{ color: '#6B7280' }}>AI-powered kandidaat matches komen hier...</p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Analytics</h3>
                <p style={{ color: '#6B7280' }}>Recruiter analytics komen hier...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



