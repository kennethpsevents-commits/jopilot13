'use client';

interface BoardingMilesProps {
  userId: string;
  currentMiles: number;
  tier: 'buddy' | 'coach' | 'manager' | 'recruiter';
}

export default function BoardingMiles({ userId, currentMiles, tier }: BoardingMilesProps) {
  const tierConfig = {
    buddy: { name: 'BUDDY', multiplier: 1, color: 'gray', nextReward: 500 },
    coach: { name: 'COACH', multiplier: 1.5, color: 'baby-blue', nextReward: 2000 },
    manager: { name: 'MANAGER', multiplier: 2, color: 'purple', nextReward: 5000 },
    recruiter: { name: 'RECRUITER', multiplier: 3, color: 'gold', nextReward: 10000 }
  };

  const config = tierConfig[tier];
  const progress = (currentMiles / config.nextReward) * 100;

  return (
    <div className="text-center">
      <h2 className="text-5xl font-black text-black mb-6">Boarding Miles Loyalty Program</h2>
      <p className="text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
        Verdien miles voor elke actie en unlock exclusieve beloningen
      </p>

      <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 max-w-5xl mx-auto hover:shadow-3xl transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-baby-blue to-baby-blue-dark rounded-3xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-black flex items-center gap-3">
                ✈️ Boarding Miles
              </h3>
              <p className="text-lg text-gray-600">Loyalty programma voor frequente flyers</p>
            </div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-baby-blue to-baby-blue-dark rounded-3xl flex items-center justify-center mb-3 shadow-lg">
              <span className="text-3xl font-black text-white">{currentMiles.toLocaleString()}</span>
            </div>
            <div className="text-sm font-semibold text-gray-600">Miles</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">Volgende beloning</span>
            <span className="text-lg text-gray-600">
              {currentMiles.toLocaleString()} / {config.nextReward.toLocaleString()} miles
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-baby-blue to-baby-blue-dark rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="text-sm font-semibold text-baby-blue-dark mt-3">
            🎁 {progress >= 100 ? 'Beloning beschikbaar!' : 'Priority support + custom features'}
          </div>
        </div>

        {/* Tier Badge */}
        <div className="bg-baby-blue/20 border border-baby-blue/30 rounded-2xl p-6 mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-sm font-bold text-baby-blue-dark px-4 py-2 bg-baby-blue rounded-full">{config.name}</span>
            <span className="text-sm text-gray-600">Tier Bonus</span>
          </div>
          <div className="text-lg text-gray-700">
            Verdien <span className="font-bold text-baby-blue-dark">{config.multiplier}x</span> meer miles per actie
          </div>
        </div>

        {/* How to Earn Miles */}
        <div className="bg-gradient-to-br from-gray-50 to-baby-blue-light rounded-2xl p-8">
          <h4 className="text-2xl font-bold text-black mb-8">Hoe verdien je miles?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-baby-blue/20 rounded-2xl flex items-center justify-center">
                <span className="text-sm font-bold text-baby-blue-dark">10</span>
              </div>
              <span className="text-lg text-gray-700">
                <strong>Sollicitatie versturen:</strong> 10 miles
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-baby-blue/20 rounded-2xl flex items-center justify-center">
                <span className="text-sm font-bold text-baby-blue-dark">25</span>
              </div>
              <span className="text-lg text-gray-700">
                <strong>CV uploaden:</strong> 25 miles
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-baby-blue/20 rounded-2xl flex items-center justify-center">
                <span className="text-sm font-bold text-baby-blue-dark">100</span>
              </div>
              <span className="text-lg text-gray-700">
                <strong>Referral:</strong> 100 miles
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-baby-blue/20 rounded-2xl flex items-center justify-center">
                <span className="text-sm font-bold text-baby-blue-dark">5</span>
              </div>
              <span className="text-lg text-gray-700">
                <strong>Feedback geven:</strong> 5 miles
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-baby-blue/20 rounded-2xl flex items-center justify-center">
                <span className="text-sm font-bold text-baby-blue-dark">50</span>
              </div>
              <span className="text-lg text-gray-700">
                <strong>Maandelijkse betaling:</strong> 50 miles
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-baby-blue/20 rounded-2xl flex items-center justify-center">
                <span className="text-sm font-bold text-baby-blue-dark">200</span>
              </div>
              <span className="text-lg text-gray-700">
                <strong>Job geaccepteerd:</strong> 200 miles
              </span>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="mt-12 p-8 bg-gradient-to-r from-baby-blue/10 to-baby-blue/5 border border-baby-blue/20 rounded-2xl">
          <h4 className="text-2xl font-bold text-black mb-6">Deel je referral link</h4>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={`https://wearejobpilot.com/ref/${userId}`}
              readOnly
              className="flex-1 px-6 py-4 border border-gray-300 rounded-2xl text-lg bg-white focus:border-baby-blue focus:outline-none"
            />
            <button className="px-8 py-4 bg-black text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg">
              Kopiëren
            </button>
          </div>
          <p className="text-lg text-gray-600 mt-4">
            Verdien 100 miles voor elke vriend die zich aanmeldt via jouw link!
          </p>
        </div>
      </div>
    </div>
  );
}