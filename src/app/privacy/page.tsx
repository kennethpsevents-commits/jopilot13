export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7' }}>
      <header style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <a href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#89CFF0', textDecoration: 'none' }}>
            WeAreJobPilot
          </a>
        </div>
      </header>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '40px 24px', background: 'white', borderRadius: '12px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px', color: '#1F2937' }}>
          Privacybeleid
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '32px' }}>
          Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
        </p>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            1. Inleiding
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            WeAreJobPilot (&quot;wij&quot;, &quot;ons&quot; of &quot;onze&quot;) respecteert uw privacy en zet zich in voor de bescherming van uw persoonlijke gegevens. 
            Dit privacybeleid beschrijft hoe wij informatie verzamelen, gebruiken en beschermen wanneer u onze diensten gebruikt.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            2. Gegevens die wij verzamelen
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '12px' }}>
            Wij verzamelen de volgende categorieën van persoonlijke gegevens:
          </p>
          <ul style={{ lineHeight: '1.8', color: '#374151', marginLeft: '24px' }}>
            <li><strong>Accountgegevens:</strong> naam, e-mailadres, wachtwoord (versleuteld)</li>
            <li><strong>Profielgegevens:</strong> CV, vaardigheden, werkervaring, opleidingen</li>
            <li><strong>Gebruiksgegevens:</strong> hoe u onze diensten gebruikt, interacties met AI-features</li>
            <li><strong>Technische gegevens:</strong> IP-adres, browsertype, apparaatinformatie</li>
            <li><strong>Communicatiegegevens:</strong> berichten die u naar ons stuurt</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            3. Hoe wij uw gegevens gebruiken
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '12px' }}>
            Wij gebruiken uw gegevens om:
          </p>
          <ul style={{ lineHeight: '1.8', color: '#374151', marginLeft: '24px' }}>
            <li>Onze diensten te leveren en te verbeteren</li>
            <li>Uw CV te optimaliseren met AI-technologie</li>
            <li>U te matchen met relevante vacatures</li>
            <li>U te informeren over nieuwe matches en updates</li>
            <li>Analyses uit te voeren om onze diensten te verbeteren</li>
            <li>Te voldoen aan wettelijke verplichtingen</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            4. Juridische basis (AVG/GDPR)
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Wij verwerken uw gegevens op basis van:
          </p>
          <ul style={{ lineHeight: '1.8', color: '#374151', marginLeft: '24px' }}>
            <li><strong>Uw toestemming:</strong> voor marketing en nieuwsbrieven</li>
            <li><strong>Contractuele noodzaak:</strong> om onze diensten te leveren</li>
            <li><strong>Gerechtvaardigd belang:</strong> voor service-verbetering en analyses</li>
            <li><strong>Wettelijke verplichting:</strong> voor naleving van wet- en regelgeving</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            5. Gegevens delen
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Wij delen uw gegevens alleen met:
          </p>
          <ul style={{ lineHeight: '1.8', color: '#374151', marginLeft: '24px' }}>
            <li><strong>Werkgevers:</strong> wanneer u solliciteert op een vacature</li>
            <li><strong>Service providers:</strong> zoals hosting (Vercel), database (Supabase), AI (OpenAI)</li>
            <li><strong>Wettelijke verplichtingen:</strong> wanneer vereist door de wet</li>
          </ul>
          <p style={{ lineHeight: '1.8', color: '#374151', marginTop: '12px' }}>
            Wij verkopen uw gegevens <strong>nooit</strong> aan derden.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            6. Uw rechten (AVG/GDPR)
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '12px' }}>
            U heeft de volgende rechten:
          </p>
          <ul style={{ lineHeight: '1.8', color: '#374151', marginLeft: '24px' }}>
            <li><strong>Inzage:</strong> u kunt opvragen welke gegevens wij van u hebben</li>
            <li><strong>Rectificatie:</strong> u kunt onjuiste gegevens laten corrigeren</li>
            <li><strong>Verwijdering:</strong> u kunt verzoeken om verwijdering van uw gegevens</li>
            <li><strong>Beperking:</strong> u kunt de verwerking van uw gegevens beperken</li>
            <li><strong>Bezwaar:</strong> u kunt bezwaar maken tegen verwerking</li>
            <li><strong>Dataportabiliteit:</strong> u kunt uw gegevens in een gestructureerd formaat ontvangen</li>
            <li><strong>Toestemming intrekken:</strong> u kunt uw toestemming op elk moment intrekken</li>
          </ul>
          <p style={{ lineHeight: '1.8', color: '#374151', marginTop: '12px' }}>
            Om deze rechten uit te oefenen, neem contact op via: <a href="mailto:privacy@wearejobpilot.com" style={{ color: '#89CFF0' }}>privacy@wearejobpilot.com</a>
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            7. Beveiliging
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen, waaronder:
            versleuteling, toegangscontroles, regelmatige security audits, en data minimalisatie.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            8. Bewaartermijn
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Wij bewaren uw gegevens niet langer dan noodzakelijk. Actieve accounts worden bewaard zolang u onze diensten gebruikt. 
            Na verwijdering van uw account worden gegevens binnen 30 dagen permanent verwijderd, tenzij wettelijk verplicht om langer te bewaren.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            9. Cookies
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Wij gebruiken noodzakelijke cookies voor de functionaliteit van onze website en analytische cookies (met uw toestemming) 
            om onze diensten te verbeteren. U kunt uw cookie-voorkeuren aanpassen via de cookie-banner.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            10. Internationale overdrachten
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Uw gegevens kunnen worden verwerkt buiten de EER (bijvoorbeeld door OpenAI in de VS). 
            Wij zorgen ervoor dat passende waarborgen worden getroffen conform de AVG, zoals standaard contractbepalingen.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            11. Wijzigingen
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Wij kunnen dit privacybeleid van tijd tot tijd bijwerken. Belangrijke wijzigingen zullen wij u melden via e-mail of via onze website.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            12. Contact & Klachten
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '12px' }}>
            Voor vragen over dit privacybeleid of uw gegevens:
          </p>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            <strong>E-mail:</strong> <a href="mailto:privacy@wearejobpilot.com" style={{ color: '#89CFF0' }}>privacy@wearejobpilot.com</a><br />
            <strong>Adres:</strong> WeAreJobPilot, Amsterdam, Nederland
          </p>
          <p style={{ lineHeight: '1.8', color: '#374151', marginTop: '12px' }}>
            U heeft ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens (AP) als u vindt dat wij uw gegevens niet correct verwerken.
          </p>
        </section>

        <div style={{ marginTop: '40px', padding: '20px', background: '#E0F2FE', borderRadius: '8px', borderLeft: '4px solid #89CFF0' }}>
          <p style={{ margin: 0, color: '#1E40AF', fontSize: '14px' }}>
            <strong>Let op:</strong> Dit is een standaard privacybeleid template. Voor een volledig juridisch document, raadpleeg een advocaat gespecialiseerd in privacyrecht.
          </p>
        </div>
      </div>
    </div>
  );
}
