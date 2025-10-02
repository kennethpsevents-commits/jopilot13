'use client';

export default function AdminQAPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">QA Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Cases</h3>
            <p className="text-3xl font-bold text-blue-600">156</p>
            <p className="text-sm text-gray-500">12 pending review</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pass Rate</h3>
            <p className="text-3xl font-bold text-green-600">94%</p>
            <p className="text-sm text-gray-500">+2% from last week</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bugs Found</h3>
            <p className="text-3xl font-bold text-red-600">23</p>
            <p className="text-sm text-gray-500">8 critical, 15 minor</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Test Results</h2>
          <div className="text-center py-12">
            <p className="text-gray-500">QA test results and reports will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}