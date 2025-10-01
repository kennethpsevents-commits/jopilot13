'use client';
import { useState, useEffect } from 'react';
import ExecutiveSummary from '@/components/ExecutiveSummary';
import BoardingMiles from '@/components/BoardingMiles';

export const dynamic = 'force-dynamic';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_min: number;
  salary_max: number;
  skills: string[];
  contract_type: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    loadJobs();
    
    // Simulate AI scanning
    const scanInterval = setInterval(() => {
      setIsScanning(prev => !prev);
    }, 3000);
    
    return () => clearInterval(scanInterval);
  }, []);

  async function loadJobs() {
    try {
      const response = await fetch('/dummy-jobs.json');
      const data = await response.json();
      
      const jobsWithIds = data.slice(0, 20).map((job: any, index: number) => ({
        ...job,
        id: `job-${index + 1}`
      }));
      
      setJobs(jobsWithIds);
      
      setTimeout(() => {
        simulateJobMatch(jobsWithIds[0]);
      }, 3000);
    } catch (err) {
      console.error('Error loading jobs:', err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  async function simulateJobMatch(job: any) {
    try {
      await fetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'email',
          to: 'demo@wearejobpilot.com',
          subject: 'Nieuwe job match gevonden!',
          message: `We hebben een perfecte match voor je gevonden: ${job.title} bij ${job.company}`,
          jobTitle: job.title,
          jobId: job.id
        })
      });
    } catch (error) {
      console.log('Notification simulation:', error);
    }
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* World-Class Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 className="text-2xl font-black text-black tracking-tight">WeAreJobPilot</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 text-gray-700 font-semibold hover:text-black transition-colors duration-200">
                Inloggen
              </button>
              <button className="px-8 py-3 bg-black text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg">
                Aanmelden
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Apple-Class Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-baby-blue-light overflow-hidden">
        {/* Aviation Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-baby-blue rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-2 border-baby-blue rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/3 w-16 h-16 border-2 border-baby-blue rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 border-2 border-baby-blue rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          {/* Aviation Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-baby-blue/20 border border-baby-blue/30 rounded-full mb-12 backdrop-blur-sm">
            <svg className="w-5 h-5 text-baby-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className="text-sm font-semibold text-baby-blue-dark tracking-wide">AI-Flight Scout • Cockpit Buddy • Autopilot</span>
          </div>

          {/* North Star Headline */}
          <h1 className="text-6xl md:text-7xl font-black text-black mb-8 leading-tight tracking-tight">
            AI Job Hunter
            <br />
            <span className="bg-gradient-to-r from-baby-blue to-baby-blue-dark bg-clip-text text-transparent">
              Stressvrij jouw droombaan vinden
            </span>
          </h1>

          <p className="text-2xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            Stop met eindeloos zoeken. Laat AI jouw perfecte job vinden en automatisch solliciteren.
          </p>

          <p className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto">
            Geen meer uren zoeken • Automatisch solliciteren • Meer interviews • 90% minder stress
          </p>

          {/* Aviation Journey Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-baby-blue/30">
                <div className="w-20 h-20 mx-auto mb-6 bg-baby-blue/20 rounded-3xl flex items-center justify-center group-hover:bg-baby-blue/30 transition-colors duration-300">
                  <svg className="w-10 h-10 text-baby-blue-dark group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Boarding</h3>
                <p className="text-gray-600 leading-relaxed">Vertel je droomjob en upload je CV</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-baby-blue/30">
                <div className="w-20 h-20 mx-auto mb-6 bg-baby-blue/20 rounded-3xl flex items-center justify-center group-hover:bg-baby-blue/30 transition-colors duration-300">
                  <svg className="w-10 h-10 text-baby-blue-dark group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a10 10 0 0 1 10 10"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Radar Scan</h3>
                <p className="text-gray-600 leading-relaxed">AI ontdekt perfecte matches</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-baby-blue/30">
                <div className="w-20 h-20 mx-auto mb-6 bg-baby-blue/20 rounded-3xl flex items-center justify-center group-hover:bg-baby-blue/30 transition-colors duration-300">
                  <svg className="w-10 h-10 text-baby-blue-dark group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M7 8h10M7 12h4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Cockpit Support</h3>
                <p className="text-gray-600 leading-relaxed">CV & brief perfect optimaliseren</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-baby-blue/30">
                <div className="w-20 h-20 mx-auto mb-6 bg-baby-blue/20 rounded-3xl flex items-center justify-center group-hover:bg-baby-blue/30 transition-colors duration-300">
                  <svg className="w-10 h-10 text-baby-blue-dark group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Autopilot</h3>
                <p className="text-gray-600 leading-relaxed">Automatisch solliciteren</p>
              </div>
            </div>
          </div>

          {/* Premium Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-8 flex items-center pointer-events-none">
                <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
            <input
              type="text"
                placeholder="Wat voor job zoek je? (bijv. 'Frontend Developer Amsterdam')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-40 py-6 text-xl border-2 border-gray-200 rounded-3xl focus:border-baby-blue focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-lg hover:shadow-xl"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-8 py-4 bg-black text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg">
                {isScanning ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                ) : (
                  'Zoeken'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ExecutiveSummary
            executiveSummary="AI Job Hunter – Stressvrij jouw droombaan vinden"
            mainCopy="Stop met eindeloos solliciteren. Onze AI vindt jouw droomjob en solliciteert automatisch. 3x meer interviews, 90% minder stress."
            deepDive="De arbeidsmarkt van vandaag wordt gekenmerkt door een fundamentele asymmetrie: terwijl er 6 miljoen onvervulde vacatures zijn in de EU (Eurostat 2024), worstelen miljoenen professionals met inefficiënte sollicitatieprocessen. Traditionele job boards functioneren als passieve databases die kandidaten dwingen tot repetitieve, tijdrovende handelingen. WeAreJobPilot introduceert een paradigma-shift door het sollicitatieproces te transformeren van een reactieve naar een proactieve ervaring. Onze drie-laags AI-architectuur (Discovery, Preparation, Execution) creëert een end-to-end value chain die niet alleen efficiëntie maximaliseert, maar ook kwaliteit garandeert door middel van machine learning en feedback loops. De economische impact is significant: een gemiddelde professional besteedt 12 uur per week aan solliciteren; WeAreJobPilot reduceert dit tot 2 uur, wat neerkomt op een productiviteitswinst van €15.000 per jaar per gebruiker. Onze dubbelzijdige business model (subscription + recruiter fees) creëert een duurzame flywheel: meer kandidaten trekken meer recruiters aan, wat de waarde voor kandidaten verhoogt, wat weer meer kandidaten aantrekt. De schaalbaarheid is inherent: onze AI-infrastructuur verbetert met elke interactie, terwijl onze marginale kosten dalen door automatisering. Compliance-by-design (GDPR, EU AI Act) positioneert ons als de enige AI-job platform die volledig compatibel is met Europese regelgeving, wat cruciale voordelen biedt voor enterprise adoptie en overheidscontracten."
            title="AI Job Hunter – Stressvrij jouw droombaan vinden"
          />
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-black mb-6">
        {loading ? (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-4 h-4 bg-baby-blue rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-baby-blue rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-4 h-4 bg-baby-blue rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <span className="ml-4 text-2xl">AI zoekt jouw perfecte job...</span>
          </div>
              ) : (
                `${filteredJobs.length} perfecte jobs gevonden`
              )}
            </h2>
            <p className="text-2xl text-gray-600">
              AI matcht jouw skills met de beste vacatures
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-8 border-4 border-baby-blue/30 border-t-baby-blue rounded-full animate-spin"></div>
              <p className="text-xl text-gray-500">AI scant duizenden vacatures...</p>
          </div>
        ) : (
            <div className="space-y-8">
              {filteredJobs.slice(0, 6).map((job, index) => (
                <div key={job.id} className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-black mb-3 hover:text-baby-blue-dark transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xl text-gray-600 mb-4">
                        {job.company} • {job.location}
                      </p>
                      <p className="text-2xl font-bold text-baby-blue-dark">
                        €{job.salary_min.toLocaleString()} - €{job.salary_max.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-6 py-3 bg-baby-blue/20 text-baby-blue-dark rounded-full text-sm font-semibold border border-baby-blue/30">
                        {job.contract_type}
                  </span>
                      <button className="px-8 py-4 bg-black text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg">
                        Bekijk Job
                      </button>
                    </div>
                </div>
                  <div className="flex flex-wrap gap-3">
                    {job.skills.slice(0, 5).map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </section>

      {/* Boarding Miles Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <BoardingMiles
            userId="demo-user"
            currentMiles={1250}
            tier="coach"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-8">
            Klaar om te beginnen?
          </h2>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
            Upload je CV en laat AI je droomjob vinden. Geen gedoe, geen stress.
          </p>
          <button className="px-12 py-6 bg-baby-blue text-black font-bold text-xl rounded-3xl hover:bg-baby-blue-light transition-all duration-200 hover:scale-105 shadow-2xl">
            Gratis Starten →
          </button>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-baby-blue rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">WeAreJobPilot</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                AI vindt automatisch jouw perfecte job
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <div className="space-y-3">
                {['Home', 'Aanmelden', 'Inloggen', 'Dashboard'].map((link) => (
                  <a key={link} href="#" className="block text-gray-400 hover:text-baby-blue transition-colors duration-200">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Juridisch</h4>
              <div className="space-y-3">
                {['Privacybeleid', 'Gebruiksvoorwaarden', 'GDPR Verzoeken'].map((link) => (
                  <a key={link} href="#" className="block text-gray-400 hover:text-baby-blue transition-colors duration-200">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Contact</h4>
              <div className="space-y-3">
                <a href="mailto:info@wearejobpilot.com" className="block text-gray-400 hover:text-baby-blue transition-colors duration-200">
                  📧 info@wearejobpilot.com
                </a>
                <div className="text-gray-400">
                  📞 +48 518 318 709
                </div>
                <div className="flex gap-4 mt-6">
                  <a href="#" className="text-baby-blue hover:text-baby-blue-light transition-colors duration-200 text-xl">
                    in
                  </a>
                  <a href="#" className="text-baby-blue hover:text-baby-blue-light transition-colors duration-200 text-xl">
                    𝕏
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex justify-between items-center flex-wrap gap-4">
            <p className="text-gray-400">
              © {new Date().getFullYear()} WeAreJobPilot. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-8">
              <span className="text-gray-400 flex items-center gap-2">
                🇪🇺 AVG/GDPR Compliant
              </span>
              <span className="text-gray-400 flex items-center gap-2">
                🔒 SSL Beveiligd
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}