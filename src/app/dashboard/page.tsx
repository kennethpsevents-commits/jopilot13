'use client';
import { useState } from 'react';
import { getUserProfile, signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Welcome to WeAreJobPilot</h2>
          <p className="text-gray-600">Choose your dashboard:</p>
          <div className="mt-4 space-x-4">
            <a href="/dashboard/candidate" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Candidate Dashboard
            </a>
            <a href="/dashboard/employer" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Employer Dashboard
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}