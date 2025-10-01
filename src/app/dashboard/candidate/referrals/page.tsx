'use client';
import ReferralSystem from '@/components/ReferralSystem';

export const dynamic = 'force-dynamic';

export default function ReferralsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#89CFF0' }}>
          Referral Programma
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '32px' }}>
          Nodig vrienden uit en help je netwerk hun droomjob te vinden
        </p>

        <ReferralSystem />

        <div style={{ marginTop: '32px', background: 'white', padding: '32px', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#1F2937' }}>
            Hoe werkt het?
          </h2>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#89CFF0' }}>1</span>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: '#1F2937' }}>
                  Deel je unieke link
                </h3>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                  Kopieer je persoonlijke referral link en deel deze via WhatsApp, LinkedIn, email of social media.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#89CFF0' }}>2</span>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: '#1F2937' }}>
                  Je vrienden melden zich aan
                </h3>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                  Wanneer iemand zich aanmeldt via jouw link, worden zij automatisch geregistreerd als jouw referral.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#89CFF0' }}>3</span>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: '#1F2937' }}>
                  Krijg toegang tot exclusieve features
                </h3>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                  Voor elke succesvolle referral bouw je punten op voor exclusieve features en voordelen (binnenkort beschikbaar).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', background: '#FEF3C7', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#92400E' }}>
            💡 Pro Tip
          </h3>
          <p style={{ margin: 0, color: '#92400E', lineHeight: '1.6' }}>
            Deel je link in groepen waar mensen op zoek zijn naar werk (LinkedIn groepen, WhatsApp communities, studiegenoten). 
            Hoe meer mensen je helpt, hoe meer je zelf profiteert van ons platform!
          </p>
        </div>
      </div>
    </div>
  );
}
