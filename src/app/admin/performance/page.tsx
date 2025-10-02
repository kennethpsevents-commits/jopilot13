'use client';

export default function AdminPerformancePage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Performance Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">12,345</p>
            <p className="text-sm text-gray-500">+12% from last month</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Jobs</h3>
            <p className="text-3xl font-bold text-green-600">8,234</p>
            <p className="text-sm text-gray-500">+8% from last month</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Applications</h3>
            <p className="text-3xl font-bold text-yellow-600">45,678</p>
            <p className="text-sm text-gray-500">+15% from last month</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Success Rate</h3>
            <p className="text-3xl font-bold text-purple-600">87%</p>
            <p className="text-sm text-gray-500">+3% from last month</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
          <div className="text-center py-12">
            <p className="text-gray-500">Performance charts and analytics will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}