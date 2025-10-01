'use client';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    // Initialize analytics here if needed
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'white',
      borderTop: '2px solid #89CFF0',
      padding: '20px 24px',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      <div style={{ flex: '1', minWidth: '300px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
          🍪 Wij gebruiken cookies om je ervaring te verbeteren en onze service te optimaliseren. 
          Door op &quot;Accepteren&quot; te klikken, stem je in met ons{' '}
          <a href="/privacy" style={{ color: '#89CFF0', textDecoration: 'underline' }}>privacybeleid</a> en{' '}
          <a href="/terms" style={{ color: '#89CFF0', textDecoration: 'underline' }}>gebruiksvoorwaarden</a>.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={rejectCookies}
          style={{
            padding: '10px 20px',
            background: 'white',
            color: '#6B7280',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Weigeren
        </button>
        <button
          onClick={acceptCookies}
          style={{
            padding: '10px 24px',
            background: '#89CFF0',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Accepteren
        </button>
      </div>
    </div>
  );
}
