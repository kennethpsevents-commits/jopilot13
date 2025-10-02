'use client';
import { useState } from 'react';
import { getCurrentUser, signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function EmployerDashboard() {
  const [user, setUser] = useState<any>(null);
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
            <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
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
          <h2 className="text-lg font-semibold mb-4">Employer Features</h2>
          <p className="text-gray-600">Employer dashboard coming soon...</p>
        </div>
      </main>
    </div>
  );
}