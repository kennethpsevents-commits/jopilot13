'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ReferralSystem() {
  const [referralCode, setReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadReferralData();
  }, []);

  async function loadReferralData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Generate or get referral code (use user ID as base)
      const code = `JOBPILOT-${user.id.slice(0, 8).toUpperCase()}`;
      setReferralCode(code);

      // Get referral count
      const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', user.id);
      
      setReferralCount(count || 0);
    } catch (err) {
      console.error('Error loading referral data:', err);
    }
  }

  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = 'Ontdek WeAreJobPilot - AI-gedreven job matching! Meld je aan met mijn link:';
    const encodedText = encodeURIComponent(text);
    const encodedLink = encodeURIComponent(referralLink);

    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedLink}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`,
      email: `mailto:?subject=Probeer%20WeAreJobPilot&body=${encodedText}%20${encodedLink}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (!referralCode) return null;

  return (
    <div style={{ background: 'linear-gradient(135deg, #89CFF0 0%, #5AB9EA 100%)', padding: '32px', borderRadius: '12px', color: 'white' }}>
      <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
        🎁 Nodig vrienden uit!
      </h3>
      <p style={{ marginBottom: '20px', opacity: 0.95 }}>
        Deel WeAreJobPilot met je netwerk en help anderen hun droomjob te vinden. 
        Je hebt al <strong>{referralCount}</strong> {referralCount === 1 ? 'persoon' : 'personen'} uitgenodigd!
      </p>

      <div style={{ background: 'white', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
          Jouw referral link:
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={referralLink}
            readOnly
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#1F2937',
              background: '#F9FAFB'
            }}
          />
          <button
            onClick={handleCopy}
            style={{
              padding: '10px 20px',
              background: copied ? '#10B981' : '#89CFF0',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            {copied ? '✓ Gekopieerd!' : '📋 Kopieer'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleShare('whatsapp')}
          style={{
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          💬 WhatsApp
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          style={{
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          in LinkedIn
        </button>
        <button
          onClick={() => handleShare('email')}
          style={{
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ✉️ Email
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.15)', borderRadius: '6px', fontSize: '14px' }}>
        <strong>💡 Tip:</strong> Elke succesvolle referral helpt je netwerk en geeft jou toegang tot exclusieve features (binnenkort beschikbaar)!
      </div>
    </div>
  );
}
