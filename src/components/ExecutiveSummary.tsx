'use client';
import { useState } from 'react';

interface ExecutiveSummaryProps {
  executiveSummary: string;
  mainCopy: string;
  deepDive: string;
  title: string;
}

export default function ExecutiveSummary({ 
  executiveSummary, 
  mainCopy, 
  deepDive, 
  title 
}: ExecutiveSummaryProps) {
  const [showDeepDive, setShowDeepDive] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
      {/* Executive Summary Badge */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-baby-blue rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-black">Executive Summary</h3>
      </div>
      
      {/* Executive Summary Text */}
      <p className="text-xl font-semibold text-gray-800 mb-8 leading-relaxed">
        {executiveSummary}
      </p>

      {/* Main Copy */}
      <div className="mb-8">
        <h2 className="text-4xl font-black text-black mb-6 leading-tight">{title}</h2>
        <div className="text-lg text-gray-700 leading-relaxed">
          {mainCopy}
        </div>
      </div>

      {/* Toggle Button */}
      <div className="border-t border-gray-200 pt-8">
        <button 
          onClick={() => setShowDeepDive(!showDeepDive)}
          className="group flex items-center gap-3 px-8 py-4 bg-gray-50 hover:bg-baby-blue/20 text-gray-700 hover:text-black font-semibold rounded-2xl transition-all duration-200 hover:scale-105"
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${showDeepDive ? 'rotate-180' : ''}`} 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
          {showDeepDive ? 'Verberg Academische Diepgang' : 'Toon Academische Diepgang'}
        </button>
      </div>

      {/* Deep Dive Content */}
      {showDeepDive && (
        <div className="mt-8 p-8 bg-gradient-to-br from-gray-50 to-baby-blue-light rounded-2xl border border-baby-blue/30">
          <h4 className="text-xl font-bold text-black mb-6">Academische Uitweiding</h4>
          <div className="text-base text-gray-600 leading-relaxed space-y-6">
            {deepDive.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-justify">{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}