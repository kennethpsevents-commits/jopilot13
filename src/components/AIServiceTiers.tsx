'use client';
import { useState } from 'react';

interface AIServiceTiersProps {
  currentTier?: 'buddy' | 'coach' | 'manager';
  onUpgrade?: (tier: 'buddy' | 'coach' | 'manager') => void;
}

export default function AIServiceTiers({ currentTier = 'buddy', onUpgrade }: AIServiceTiersProps) {
  const tiers = [
    {
      id: 'buddy',
      name: 'AI Buddy',
      emoji: '🤖',
      price: 'Gratis',
      description: 'Basis AI ondersteuning',
      features: [
        'CV cleanup (5x per maand)',
        'Basis job matching',
        'Eenvoudige cover letters',
        'Email notificaties',
        '3 gratis job applications'
      ],
      color: '#89CFF0',
      popular: false
    },
    {
      id: 'coach',
      name: 'AI Coach',
      emoji: '🎯',
      price: '$15/maand',
      description: 'Geavanceerde AI coaching',
      features: [
        'Onbeperkt CV cleanup',
        'Premium job matching',
        'Geavanceerde cover letters',
        'Interview training',
        'WhatsApp notificaties',
        'Salaris onderhandeling tips',
        'Job GPT (basis)',
        'Onbeperkt applications'
      ],
      color: '#10B981',
      popular: true
    },
    {
      id: 'manager',
      name: 'AI Manager',
      emoji: '👔',
      price: '$20/maand',
      description: 'Volledige AI job management',
      features: [
        'Alles van AI Coach',
        'Automatische sollicitaties',
        'Premium Job GPT (volledige info)',
        'CV design templates',
        'Priority support',
        'Markt insights',
        'Referral programma',
        '1-op-1 AI sessies'
      ],
      color: '#8B5CF6',
      popular: false
    },
    {
      id: 'recruiter',
      name: 'Recruiter',
      emoji: '🏢',
      price: '$35/maand',
      description: 'Voor werkgevers en recruiters',
      features: [
        '3 gratis vacature plaatsingen',
        'Premium kandidaat toegang',
        'AI-powered matching',
        'Bulk email tools',
        'Analytics dashboard',
        'ATS integratie',
        'Priority support',
        'Custom branding'
      ],
      color: '#F59E0B',
      popular: false
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', margin: '32px 0' }}>
      {tiers.map((tier) => (
        <div
          key={tier.id}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px 24px',
            border: currentTier === tier.id ? `3px solid ${tier.color}` : '2px solid #E5E7EB',
            position: 'relative',
            boxShadow: tier.popular ? '0 8px 25px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)',
            transform: tier.popular ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }}
        >
          {tier.popular && (
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: tier.color,
              color: 'white',
              padding: '6px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Meest Populair
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{tier.emoji}</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: tier.color }}>
              {tier.name}
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '16px' }}>{tier.description}</p>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: tier.color, marginBottom: '8px' }}>
              {tier.price}
            </div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
            {tier.features.map((feature, index) => (
              <li key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '12px',
                fontSize: '14px',
                color: '#374151'
              }}>
                <span style={{ 
                  color: tier.color, 
                  marginRight: '8px', 
                  fontSize: '16px' 
                }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={() => onUpgrade?.(tier.id as 'buddy' | 'coach' | 'manager')}
            disabled={currentTier === tier.id}
            style={{
              width: '100%',
              padding: '12px 24px',
              background: currentTier === tier.id ? '#F3F4F6' : tier.color,
              color: currentTier === tier.id ? '#6B7280' : 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: currentTier === tier.id ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {currentTier === tier.id ? 'Huidige Plan' : tier.id === 'buddy' ? 'Start Gratis' : 'Upgrade Nu'}
          </button>
        </div>
      ))}
    </div>
  );
}
