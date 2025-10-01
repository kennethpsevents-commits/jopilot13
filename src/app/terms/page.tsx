export default function TermsPage() {
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
          Gebruiksvoorwaarden
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '32px' }}>
          Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
        </p>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            1. Acceptatie van de voorwaarden
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Door toegang te krijgen tot en gebruik te maken van WeAreJobPilot (&quot;de Dienst&quot;), accepteert u deze gebruiksvoorwaarden. 
            Als u niet akkoord gaat met deze voorwaarden, mag u de Dienst niet gebruiken.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            2. Beschrijving van de Dienst
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            WeAreJobPilot is een AI-gedreven platform dat kandidaten helpt bij hun zoektocht naar werk door middel van 
            CV-optimalisatie, intelligente job matching, cover letter generatie en persoonlijke AI-begeleiding.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            3. Account en Registratie
          </h2>
          <ul style={{ lineHeight: '1.8', color: '#374151', marginLeft: '24px' }}>
            <li>U moet minimaal 16 jaar oud zijn om een account aan te maken</li>
            <li>U bent verantwoordelijk voor het vertrouwelijk houden van uw wachtwoord</li>
            <li>U mag geen vals of misleidend profiel aanmaken</li>
            <li>U bent verantwoordelijk voor alle activiteiten onder uw account</li>
            <li>Eén persoon mag slechts één account aanmaken</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            4. Toegestaan Gebruik
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '12px' }}>
            U stemt ermee in de Dienst alleen te gebruiken voor:
          </p>
          <ul style={{ lineHeight: '1.8', color: '#374151', marginLeft: '24px' }}>
            <li>Het zoeken naar legitieme werkgelegenheid</li>
            <li>Het plaatsen van echte vacatures (voor werkgevers)</li>
            <li>Het verbeteren van uw carrièreperspectieven</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            5. Verboden Gebruik
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '12px' }}>
            U mag de Dienst NIET gebruiken om:
          </p>
          <ul style={{ lineHeight: '1.8', color: '#374151', marginLeft: '24px' }}>
            <li>Onwettige activiteiten uit te voeren</li>
            <li>Spam, phishing of frauduleuze berichten te versturen</li>
            <li>Valse vacatures te plaatsen</li>
            <li>Andere gebruikers te misleiden of te bedriegen</li>
            <li>Geautomatiseerde systemen (bots, scrapers) te gebruiken zonder toestemming</li>
            <li>Malware, virussen of schadelijke code te verspreiden</li>
            <li>De intellectuele eigendomsrechten van anderen te schenden</li>
            <li>Persoonlijke gegevens van anderen te verzamelen zonder toestemming</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            6. AI-gegenereerde Content
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Onze AI-features (CV cleanup, cover letters, job summaries) zijn hulpmiddelen ter ondersteuning. 
            Wij garanderen niet de volledigheid of nauwkeurigheid van AI-gegenereerde content. 
            U bent verantwoordelijk voor het controleren en goedkeuren van alle door AI aangepaste documenten voordat u deze gebruikt.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            7. Intellectueel Eigendom
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '12px' }}>
            <strong>Uw content:</strong> U behoudt alle rechten op content die u uploadt (CV, profiel, etc.). 
            Door gebruik te maken van de Dienst, geeft u ons een licentie om deze content te gebruiken voor het leveren van onze diensten.
          </p>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            <strong>Onze content:</strong> Alle rechten op het platform, logo, design en software blijven eigendom van WeAreJobPilot.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            8. Disclaimer van Garanties
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            De Dienst wordt geleverd "zoals het is". Wij garanderen niet dat:
          </p>
          <ul style={{ lineHeight: '1.8', color: '#374151', marginLeft: '24px' }}>
            <li>De Dienst altijd beschikbaar, ononderbroken of foutloos zal zijn</li>
            <li>Alle vacatures legitiem of geschikt voor u zijn</li>
            <li>U een baan zult vinden door gebruik van de Dienst</li>
            <li>AI-matches altijd accuraat zijn</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            9. Beperking van Aansprakelijkheid
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Voor zover toegestaan door de wet, zijn wij niet aansprakelijk voor indirecte, incidentele of gevolgschade 
            voortvloeiend uit uw gebruik van de Dienst, inclusief maar niet beperkt tot verlies van gegevens, verlies van inkomsten of gemiste kansen.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            10. Beëindiging
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Wij behouden ons het recht voor om uw account te beëindigen of op te schorten als u deze voorwaarden schendt. 
            U kunt uw account op elk moment verwijderen via uw profielinstellingen.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            11. Wijzigingen in de Voorwaarden
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Wij kunnen deze voorwaarden van tijd tot tijd bijwerken. Belangrijke wijzigingen zullen we melden via e-mail. 
            Voortgezet gebruik na wijzigingen betekent acceptatie van de nieuwe voorwaarden.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            12. Toepasselijk Recht
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Deze voorwaarden worden beheerst door Nederlands recht. Geschillen zullen worden voorgelegd aan de bevoegde rechter in Nederland.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#89CFF0' }}>
            13. Contact
          </h2>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            Voor vragen over deze voorwaarden, neem contact op via: <a href="mailto:support@wearejobpilot.com" style={{ color: '#89CFF0' }}>support@wearejobpilot.com</a>
          </p>
        </section>

        <div style={{ marginTop: '40px', padding: '20px', background: '#E0F2FE', borderRadius: '8px', borderLeft: '4px solid #89CFF0' }}>
          <p style={{ margin: 0, color: '#1E40AF', fontSize: '14px' }}>
            <strong>Let op:</strong> Dit zijn standaard gebruiksvoorwaarden. Voor een volledig juridisch document dat specifiek is afgestemd op uw diensten, raadpleeg een advocaat.
          </p>
        </div>
      </div>
    </div>
  );
}
