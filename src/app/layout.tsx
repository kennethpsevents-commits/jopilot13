import CookieConsent from '@/components/CookieConsent';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
