'use client';
import { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import NotificationSystem from '@/components/NotificationSystem';

export default function CandidateDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const user = getCurrentUser();
    setUser(user);
    setProfile({ id: 'demo-profile' });
    setMatches([]);
    setApplications([]);
  }

  async function handleSignOut() {
    await signOut();
    router.push('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NotificationSystem />
      
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Candidate Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">AI Features</h2>
            <div className="space-y-3">
              <a href="/dashboard/candidate/cv" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                📄 CV Cleanup
              </a>
              <a href="/dashboard/candidate/cover-letter" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100">
                ✉️ Cover Letter
              </a>
              <a href="/dashboard/candidate/job-summary" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100">
                📋 Job Summary
              </a>
              <a href="/dashboard/candidate/ai-buddy" className="block p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100">
                🤖 AI Job Hunter
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Job Matches</h2>
            <p className="text-gray-600">AI zoekt naar perfecte matches...</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Applications</h2>
            <p className="text-gray-600">Geen recente sollicitaties</p>
          </div>
        </div>
      </main>
    </div>
  );
}