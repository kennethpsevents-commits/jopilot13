'use client';
import { useState, useEffect } from 'react';

export default function ReferralSystem() {
  const [referralCode, setReferralCode] = useState('DEMO-REF-123');
  const [referrals, setReferrals] = useState<any[]>([]);

  useEffect(() => {
    loadReferralData();
  }, []);

  async function loadReferralData() {
    // Demo data
    setReferrals([
      { id: 1, email: 'friend1@example.com', status: 'pending', created_at: '2024-01-01' },
      { id: 2, email: 'friend2@example.com', status: 'completed', created_at: '2024-01-02' }
    ]);
  }

  function copyReferralLink() {
    const link = `https://wearejobpilot.com/ref/${referralCode}`;
    navigator.clipboard.writeText(link);
    alert('Referral link gekopieerd!');
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Referral System</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Jouw Referral Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
          <button
            onClick={copyReferralLink}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Kopiëren
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Jouw Referrals</h3>
        <div className="space-y-2">
          {referrals.map((ref) => (
            <div key={ref.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm">{ref.email}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                ref.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {ref.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}