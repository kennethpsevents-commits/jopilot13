'use client';
import { useState } from 'react';
import AIServiceTiers from '@/components/AIServiceTiers';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedTier, setSelectedTier] = useState<string>('');

  const handleUpgrade = async (tier: string) => {
    try {
      // Redirect to Paddle checkout
      const response = await fetch('/api/payments/paddle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: tier,
          userId: 'current-user-id', // In real app, get from auth
          userEmail: 'user@example.com', // In real app, get from auth
          successUrl: `${window.location.origin}/dashboard?upgrade=success`,
          cancelUrl: `${window.location.origin}/pricing?upgrade=cancelled`
        })
      });

      const data = await response.json();
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error('Error starting upgrade:', error);
      alert('Er is een fout opgetreden. Probeer het later opnieuw.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', color: '#1F2937' }}>
            Kies Jouw AI Job Hunter Tier
          </h1>
          <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Hoe meer je betaalt, hoe meer service en geavanceerde AI-ondersteuning je krijgt.
          </p>

          {/* Billing Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <span style={{ color: billingCycle === 'monthly' ? '#1F2937' : '#6B7280', fontWeight: '600' }}>
              Maandelijks
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              style={{
                width: '60px',
                height: '30px',
                background: billingCycle === 'yearly' ? '#89CFF0' : '#E5E7EB',
                border: 'none',
                borderRadius: '15px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '26px',
                height: '26px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: billingCycle === 'yearly' ? '32px' : '2px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
            </button>
            <span style={{ color: billingCycle === 'yearly' ? '#1F2937' : '#6B7280', fontWeight: '600' }}>
              Jaarlijks
            </span>
            {billingCycle === 'yearly' && (
              <span style={{ background: '#10B981', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '14px', fontWeight: '600' }}>
                Bespaar 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Tiers */}
        <AIServiceTiers 
          currentTier="buddy" 
          onUpgrade={handleUpgrade}
        />

        {/* Features Comparison */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '40px', marginTop: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px', color: '#1F2937' }}>
            Vergelijk Alle Features
          </h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Feature</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#89CFF0' }}>AI Buddy</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#10B981' }}>AI Coach</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#8B5CF6' }}>AI Manager</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#F59E0B' }}>Recruiter</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>CV Cleanup</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>5x/maand</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Onbeperkt</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Onbeperkt</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Onbeperkt</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>AI Chat</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>10x/maand</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Onbeperkt</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Onbeperkt</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Onbeperkt</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>Job Applications</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>3 gratis</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Onbeperkt</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Onbeperkt</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Onbeperkt</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>Cover Letter Generator</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>Interview Training</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>WhatsApp Notificaties</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>Automatische Sollicitaties</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>Job GPT (Volledige Info)</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>Basis</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Volledig</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Volledig</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>Vacature Plaatsingen</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>3 gratis/maand</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>Kandidaat Database</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅ Premium</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>Analytics Dashboard</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>❌</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '40px', marginTop: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px', color: '#1F2937' }}>
            Veelgestelde Vragen
          </h2>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#1F2937' }}>
                Kan ik op elk moment upgraden of downgraden?
              </h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                Ja, je kunt op elk moment upgraden naar een hogere tier. Downgraden kan aan het einde van je huidige factureringsperiode.
              </p>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#1F2937' }}>
                Wat gebeurt er met mijn data als ik downgrade?
              </h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                Je data blijft behouden, maar je hebt alleen toegang tot features van je huidige tier. Upgrade opnieuw om alle features te herstellen.
              </p>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#1F2937' }}>
                Hoe werkt de 3 gratis vacature plaatsingen voor Recruiters?
              </h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                Elke maand krijg je 3 gratis vacature plaatsingen. Ongebruikte plaatsingen vervallen aan het einde van de maand. Extra plaatsingen kunnen worden gekocht.
              </p>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#1F2937' }}>
                Is er een proefperiode?
              </h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                AI Buddy is volledig gratis. Voor betaalde tiers bieden we een 14-dagen geld-terug garantie zonder vragen.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ background: 'linear-gradient(135deg, #89CFF0 0%, #10B981 100%)', borderRadius: '12px', padding: '60px 40px', marginTop: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px', color: 'white' }}>
            Klaar om je droomjob te vinden?
          </h2>
          <p style={{ fontSize: '20px', marginBottom: '40px', color: 'white', opacity: 0.9 }}>
            Start vandaag nog met AI Buddy (gratis) of upgrade direct naar AI Coach
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => window.location.href = '/dashboard/candidate'}
              style={{
                padding: '16px 32px',
                background: 'white',
                color: '#89CFF0',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              Start Gratis
            </button>
            <button
              onClick={() => handleUpgrade('coach')}
              style={{
                padding: '16px 32px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Upgrade naar Coach
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



