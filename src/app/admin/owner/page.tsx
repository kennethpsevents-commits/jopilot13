'use client';
import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalJobs: number;
  minedJobs: number;
  applications: number;
  revenue: number;
  conversionRate: number;
  aiInteractions: number;
  emailSent: number;
  whatsappSent: number;
}

interface UserTier {
  tier: string;
  count: number;
  revenue: number;
}

interface JobSource {
  name: string;
  jobs: number;
  lastMined: string;
  status: 'active' | 'error' | 'disabled';
}

interface EmailCampaign {
  id: string;
  name: string;
  recipients: number;
  sent: number;
  opened: number;
  clicked: number;
  status: 'draft' | 'sending' | 'sent' | 'paused';
}

export default function OwnerDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalJobs: 0,
    minedJobs: 0,
    applications: 0,
    revenue: 0,
    conversionRate: 0,
    aiInteractions: 0,
    emailSent: 0,
    whatsappSent: 0
  });

  const [userTiers, setUserTiers] = useState<UserTier[]>([]);
  const [jobSources, setJobSources] = useState<JobSource[]>([]);
  const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load stats
      const statsRes = await fetch('/api/admin/stats');
      const statsData = await statsRes.json();
      setStats(statsData);

      // Load user tiers
      const tiersRes = await fetch('/api/admin/user-tiers');
      const tiersData = await tiersRes.json();
      setUserTiers(tiersData);

      // Load job sources
      const sourcesRes = await fetch('/api/admin/job-sources');
      const sourcesData = await sourcesRes.json();
      setJobSources(sourcesData);

      // Load email campaigns
      const campaignsRes = await fetch('/api/admin/email-campaigns');
      const campaignsData = await campaignsRes.json();
      setEmailCampaigns(campaignsData);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const startJobMining = async (source?: string) => {
    try {
      const response = await fetch('/api/jobs/mine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, limit: 100 })
      });

      if (response.ok) {
        alert('Job mining gestart!');
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error starting job mining:', error);
    }
  };

  const sendEmailCampaign = async (campaignId: string) => {
    try {
      const response = await fetch('/api/admin/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId })
      });

      if (response.ok) {
        alert('Email campagne gestart!');
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error sending campaign:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overzicht', icon: '📊' },
    { id: 'mining', label: 'Job Mining', icon: '⛏️' },
    { id: 'marketing', label: 'Marketing', icon: '📧' },
    { id: 'users', label: 'Gebruikers', icon: '👥' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'ai', label: 'AI Analytics', icon: '🤖' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#1F2937' }}>
                Owner Dashboard
              </h1>
              <p style={{ color: '#6B7280', fontSize: '16px' }}>
                Volledig overzicht van WeAreJobPilot platform
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => startJobMining()}
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
                ⛏️ Start Mining
              </button>
              <button
                onClick={loadDashboardData}
                style={{
                  padding: '12px 24px',
                  background: '#89CFF0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🔄 Refresh
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
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Platform Overzicht</h3>
                
                {/* Key Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ background: '#F0F9FF', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#89CFF0', marginBottom: '8px' }}>
                      {stats.totalUsers.toLocaleString()}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>Totaal Gebruikers</div>
                  </div>
                  <div style={{ background: '#F0FDF4', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10B981', marginBottom: '8px' }}>
                      {stats.activeUsers.toLocaleString()}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>Actieve Gebruikers</div>
                  </div>
                  <div style={{ background: '#FEF3C7', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#F59E0B', marginBottom: '8px' }}>
                      {stats.totalJobs.toLocaleString()}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>Totaal Jobs</div>
                  </div>
                  <div style={{ background: '#EDE9FE', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8B5CF6', marginBottom: '8px' }}>
                      ${stats.revenue.toLocaleString()}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>Revenue</div>
                  </div>
                </div>

                {/* User Tiers */}
                <div style={{ background: '#F9FAFB', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Gebruiker Tiers</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                    {userTiers.map((tier, index) => (
                      <div key={index} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937' }}>
                          {tier.count}
                        </div>
                        <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '4px' }}>
                          {tier.tier}
                        </div>
                        <div style={{ color: '#10B981', fontSize: '12px', fontWeight: '600' }}>
                          ${tier.revenue}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={{ background: '#F9FAFB', padding: '20px', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Recente Activiteit</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>
                        {stats.aiInteractions}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>AI Interacties</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>
                        {stats.emailSent}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>Emails Verzonden</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>
                        {stats.whatsappSent}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>WhatsApp Berichten</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>
                        {stats.conversionRate}%
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>Conversie Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mining' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Job Mining Systeem</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  {jobSources.map((source, index) => (
                    <div key={index} style={{ background: '#F9FAFB', padding: '20px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold' }}>{source.name}</h4>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: source.status === 'active' ? '#D1FAE5' : source.status === 'error' ? '#FEE2E2' : '#F3F4F6',
                          color: source.status === 'active' ? '#065F46' : source.status === 'error' ? '#991B1B' : '#6B7280'
                        }}>
                          {source.status}
                        </span>
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>
                        Jobs: {source.jobs.toLocaleString()}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '16px' }}>
                        Laatst gemined: {source.lastMined}
                      </div>
                      <button
                        onClick={() => startJobMining(source.name)}
                        style={{
                          width: '100%',
                          padding: '8px 16px',
                          background: '#10B981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Start Mining
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#F0F9FF', padding: '20px', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Mining Statistieken</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#89CFF0' }}>
                        {stats.minedJobs.toLocaleString()}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>Gemined Jobs</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#89CFF0' }}>
                        {jobSources.length}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>Actieve Sources</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'marketing' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Email Marketing</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  {emailCampaigns.map((campaign, index) => (
                    <div key={index} style={{ background: '#F9FAFB', padding: '20px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold' }}>{campaign.name}</h4>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: campaign.status === 'sent' ? '#D1FAE5' : campaign.status === 'sending' ? '#FEF3C7' : '#F3F4F6',
                          color: campaign.status === 'sent' ? '#065F46' : campaign.status === 'sending' ? '#92400E' : '#6B7280'
                        }}>
                          {campaign.status}
                        </span>
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>
                        Recipients: {campaign.recipients.toLocaleString()}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>
                        Sent: {campaign.sent.toLocaleString()}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '16px' }}>
                        Open Rate: {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                      </div>
                      <button
                        onClick={() => sendEmailCampaign(campaign.id)}
                        disabled={campaign.status === 'sending' || campaign.status === 'sent'}
                        style={{
                          width: '100%',
                          padding: '8px 16px',
                          background: campaign.status === 'sending' || campaign.status === 'sent' ? '#9CA3AF' : '#89CFF0',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: campaign.status === 'sending' || campaign.status === 'sent' ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {campaign.status === 'sending' ? 'Sending...' : campaign.status === 'sent' ? 'Sent' : 'Send Campaign'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add more tabs as needed */}
            {activeTab === 'users' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Gebruikers Management</h3>
                <p style={{ color: '#6B7280' }}>Gebruikers overzicht komt hier...</p>
              </div>
            )}

            {activeTab === 'revenue' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Revenue Analytics</h3>
                <p style={{ color: '#6B7280' }}>Revenue overzicht komt hier...</p>
              </div>
            )}

            {activeTab === 'ai' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>AI Analytics</h3>
                <p style={{ color: '#6B7280' }}>AI performance overzicht komt hier...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



