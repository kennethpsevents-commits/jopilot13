export default function Footer() {
  return (
    <footer style={{ background: '#1F2937', color: 'white', padding: '40px 24px', marginTop: '60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          {/* Company */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#89CFF0' }}>
              WeAreJobPilot
            </h4>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#D1D5DB' }}>
              AI-gedreven job matching platform. Vind je droomjob sneller met slimme technologie.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="/" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '14px' }}>
                  Home
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/register" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '14px' }}>
                  Aanmelden
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/login" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '14px' }}>
                  Inloggen
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/dashboard" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '14px' }}>
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Juridisch
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="/privacy" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '14px' }}>
                  Privacybeleid
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/terms" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '14px' }}>
                  Gebruiksvoorwaarden
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="mailto:privacy@wearejobpilot.com" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '14px' }}>
                  GDPR Verzoeken
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="mailto:info@wearejobpilot.com" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '14px' }}>
                  📧 info@wearejobpilot.com
                </a>
              </li>
              <li style={{ marginBottom: '8px', color: '#D1D5DB', fontSize: '14px' }}>
                📞 +48 518 318 709
              </li>
              <li style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <a href="https://linkedin.com/company/wearejobpilot" target="_blank" rel="noopener noreferrer" style={{ color: '#89CFF0', fontSize: '20px' }}>
                  in
                </a>
                <a href="https://twitter.com/wearejobpilot" target="_blank" rel="noopener noreferrer" style={{ color: '#89CFF0', fontSize: '20px' }}>
                  𝕏
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #374151', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#9CA3AF' }}>
            © {new Date().getFullYear()} WeAreJobPilot. Alle rechten voorbehouden.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '14px', color: '#9CA3AF' }}>🇪🇺 AVG/GDPR Compliant</span>
            <span style={{ fontSize: '14px', color: '#9CA3AF' }}>🔒 SSL Beveiligd</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
