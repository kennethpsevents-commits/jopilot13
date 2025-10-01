'use client';
import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

interface CandidateProfile {
  // Persoonlijke informatie
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  profilePicture: string;
  
  // Professionele informatie
  currentJobTitle: string;
  currentCompany: string;
  yearsOfExperience: number;
  desiredJobTitle: string;
  desiredSalary: number;
  currency: string;
  workLocation: 'onsite' | 'remote' | 'hybrid';
  availability: 'immediately' | '1month' | '3months' | '6months' | 'flexible';
  
  // Opleiding
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: number;
    description?: string;
  }>;
  
  // Werkervaring
  workExperience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
    salary?: number;
  }>;
  
  // Skills & Competenties
  skills: string[];
  languages: Array<{
    language: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'native';
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
  }>;
  
  // Voorkeuren
  preferredIndustries: string[];
  preferredCompanySize: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  workEnvironment: string[];
  benefits: string[];
  
  // Portfolio & Documenten
  portfolio: Array<{
    title: string;
    description: string;
    url: string;
    type: 'website' | 'github' | 'behance' | 'other';
  }>;
  resumeUrl: string;
  coverLetterTemplate: string;
  
  // Social Media & Online Presence
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  otherProfiles: Array<{
    platform: string;
    url: string;
  }>;
  
  // Privacy & Notificaties
  emailNotifications: boolean;
  smsNotifications: boolean;
  whatsappNotifications: boolean;
  profileVisibility: 'public' | 'private' | 'recruiters-only';
  
  // AI Preferences
  aiTier: 'buddy' | 'coach' | 'manager';
  aiPersonality: 'professional' | 'friendly' | 'direct' | 'supportive';
  preferredCommunication: 'email' | 'sms' | 'whatsapp' | 'in-app';
}

export default function CandidateProfilePage() {
  const [profile, setProfile] = useState<CandidateProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Nederland',
    profilePicture: '',
    currentJobTitle: '',
    currentCompany: '',
    yearsOfExperience: 0,
    desiredJobTitle: '',
    desiredSalary: 0,
    currency: 'EUR',
    workLocation: 'hybrid',
    availability: 'flexible',
    education: [],
    workExperience: [],
    skills: [],
    languages: [],
    certifications: [],
    preferredIndustries: [],
    preferredCompanySize: 'medium',
    workEnvironment: [],
    benefits: [],
    portfolio: [],
    resumeUrl: '',
    coverLetterTemplate: '',
    linkedinUrl: '',
    githubUrl: '',
    websiteUrl: '',
    otherProfiles: [],
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true,
    profileVisibility: 'public',
    aiTier: 'buddy',
    aiPersonality: 'professional',
    preferredCommunication: 'email'
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Persoonlijk', icon: '👤' },
    { id: 'professional', label: 'Professioneel', icon: '💼' },
    { id: 'education', label: 'Opleiding', icon: '🎓' },
    { id: 'experience', label: 'Ervaring', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'preferences', label: 'Voorkeuren', icon: '⭐' },
    { id: 'portfolio', label: 'Portfolio', icon: '📁' },
    { id: 'settings', label: 'Instellingen', icon: '⚙️' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayAdd = (field: keyof CandidateProfile, item: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), item]
    }));
  };

  const handleArrayRemove = (field: keyof CandidateProfile, index: number) => {
    setProfile(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      // Save profile to backend
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      
      if (response.ok) {
        setIsEditing(false);
        alert('Profiel opgeslagen!');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Fout bij opslaan profiel');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#1F2937' }}>
                Mijn Profiel
              </h1>
              <p style={{ color: '#6B7280', fontSize: '16px' }}>
                Volledig profiel voor betere AI-matching en job opportunities
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  padding: '12px 24px',
                  background: isEditing ? '#EF4444' : '#89CFF0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {isEditing ? 'Annuleren' : 'Bewerken'}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
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
                  Opslaan
                </button>
              )}
            </div>
          </div>

          {/* Profile Picture & Basic Info */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
              👤
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                {profile.firstName} {profile.lastName}
              </h2>
              <p style={{ color: '#6B7280', marginBottom: '4px' }}>{profile.currentJobTitle}</p>
              <p style={{ color: '#6B7280', marginBottom: '4px' }}>{profile.city}, {profile.country}</p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '4px 12px', borderRadius: '12px', fontSize: '14px', fontWeight: '600' }}>
                  {profile.aiTier.toUpperCase()}
                </span>
                <span style={{ background: '#D1FAE5', color: '#065F46', padding: '4px 12px', borderRadius: '12px', fontSize: '14px', fontWeight: '600' }}>
                  {profile.yearsOfExperience} jaar ervaring
                </span>
              </div>
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
            {activeTab === 'personal' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Persoonlijke Informatie</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Voornaam *</label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Achternaam *</label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>E-mail *</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Telefoon</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Geboortedatum</label>
                    <input
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Nationaliteit</label>
                    <select
                      value={profile.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    >
                      <option value="">Selecteer nationaliteit</option>
                      <option value="Nederlandse">Nederlandse</option>
                      <option value="Belgische">Belgische</option>
                      <option value="Duitse">Duitse</option>
                      <option value="Franse">Franse</option>
                      <option value="Andere">Andere</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Adres</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Stad</label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Postcode</label>
                    <input
                      type="text"
                      value={profile.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Land</label>
                    <select
                      value={profile.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    >
                      <option value="Nederland">Nederland</option>
                      <option value="België">België</option>
                      <option value="Duitsland">Duitsland</option>
                      <option value="Frankrijk">Frankrijk</option>
                      <option value="Andere">Andere</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Professionele Informatie</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Huidige functie</label>
                    <input
                      type="text"
                      value={profile.currentJobTitle}
                      onChange={(e) => handleInputChange('currentJobTitle', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Huidige bedrijf</label>
                    <input
                      type="text"
                      value={profile.currentCompany}
                      onChange={(e) => handleInputChange('currentCompany', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Jaren ervaring</label>
                    <input
                      type="number"
                      value={profile.yearsOfExperience}
                      onChange={(e) => handleInputChange('yearsOfExperience', parseInt(e.target.value))}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Gewenste functie</label>
                    <input
                      type="text"
                      value={profile.desiredJobTitle}
                      onChange={(e) => handleInputChange('desiredJobTitle', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Gewenst salaris</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="number"
                        value={profile.desiredSalary}
                        onChange={(e) => handleInputChange('desiredSalary', parseInt(e.target.value))}
                        disabled={!isEditing}
                        style={{ flex: 1, padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                      />
                      <select
                        value={profile.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        disabled={!isEditing}
                        style={{ padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                      >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Werk locatie</label>
                    <select
                      value={profile.workLocation}
                      onChange={(e) => handleInputChange('workLocation', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    >
                      <option value="onsite">Onsite</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Beschikbaarheid</label>
                    <select
                      value={profile.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      disabled={!isEditing}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                    >
                      <option value="immediately">Onmiddellijk</option>
                      <option value="1month">Binnen 1 maand</option>
                      <option value="3months">Binnen 3 maanden</option>
                      <option value="6months">Binnen 6 maanden</option>
                      <option value="flexible">Flexibel</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Add more tab content for other sections */}
            {activeTab === 'education' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Opleiding</h3>
                <p style={{ color: '#6B7280' }}>Opleidingsgeschiedenis wordt hier getoond...</p>
              </div>
            )}

            {activeTab === 'experience' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Werkervaring</h3>
                <p style={{ color: '#6B7280' }}>Werkervaring wordt hier getoond...</p>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Skills & Competenties</h3>
                <p style={{ color: '#6B7280' }}>Skills en competenties worden hier getoond...</p>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Voorkeuren</h3>
                <p style={{ color: '#6B7280' }}>Job voorkeuren worden hier getoond...</p>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Portfolio & Documenten</h3>
                <p style={{ color: '#6B7280' }}>Portfolio en documenten worden hier getoond...</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Instellingen</h3>
                <p style={{ color: '#6B7280' }}>Account instellingen worden hier getoond...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

