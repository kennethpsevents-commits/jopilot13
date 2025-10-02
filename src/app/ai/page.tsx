'use client';

export default function AIPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">AI Job Matching</h1>
        
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI-Powered Job Discovery</h2>
          <p className="text-gray-600 mb-6">
            Our advanced AI analyzes your skills, experience, and preferences to match you with the perfect job opportunities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Smart Matching</h3>
              <p className="text-gray-600">
                Our AI considers your skills, location preferences, salary expectations, and career goals to find the best matches.
              </p>
            </div>
            
            <div className="p-6 bg-green-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-600">
                Get notified instantly when new jobs that match your profile are posted.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Chat Assistant</h2>
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">AI chat functionality will be available here.</p>
            <p className="text-sm text-gray-400">Coming soon: Interactive AI assistant for job search guidance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}