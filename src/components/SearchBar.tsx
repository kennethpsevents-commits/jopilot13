'use client';
import { useState } from 'react';
// import { Button } from '@/components/ui/button';
import { Search, MapPin, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string, location: string) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: '',
    salaryRange: '',
    experience: '',
    remote: false,
  });

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, location);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({
      jobType: '',
      salaryRange: '',
      experience: '',
      remote: false,
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== false);

  return (
    <div className={`w-full ${className}`}>
      {/* Main Search Bar */}
      <div className="bg-white rounded-2xl shadow-card border border-secondary-200 p-2 flex flex-col lg:flex-row gap-2">
        {/* Job Search Input */}
        <div className="flex-1 flex items-center px-4 py-3">
          <Search className="w-5 h-5 text-secondary-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="What is your dream job?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 text-lg border-none outline-none placeholder-secondary-400 text-secondary-900"
          />
        </div>

        {/* Location Input */}
        <div className="flex items-center px-4 py-3 border-l border-secondary-200 lg:border-l lg:border-t-0 border-t">
          <MapPin className="w-5 h-5 text-secondary-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-lg border-none outline-none placeholder-secondary-400 text-secondary-900"
          />
        </div>

        {/* Filter Button */}
        <div className="flex items-center px-4 py-3 border-l border-secondary-200 lg:border-l lg:border-t-0 border-t">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              hasActiveFilters 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'text-secondary-600 hover:text-primary hover:bg-primary/5'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {Object.values(filters).filter(v => v !== '' && v !== false).length}
              </span>
            )}
          </button>
        </div>

        {/* Search Button */}
        <div className="px-4 py-3 lg:px-2">
          <button 
            onClick={handleSearch}
            className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Jobs
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 bg-white rounded-xl border border-secondary-200 p-6 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-secondary-900">Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-secondary-500 hover:text-primary transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Job Type</label>
              <select
                value={filters.jobType}
                onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Any Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Salary Range</label>
              <select
                value={filters.salaryRange}
                onChange={(e) => setFilters({ ...filters, salaryRange: e.target.value })}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Any Salary</option>
                <option value="0-30k">€0 - €30,000</option>
                <option value="30k-50k">€30,000 - €50,000</option>
                <option value="50k-70k">€50,000 - €70,000</option>
                <option value="70k-100k">€70,000 - €100,000</option>
                <option value="100k+">€100,000+</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Experience</label>
              <select
                value={filters.experience}
                onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Any Level</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead/Principal</option>
              </select>
            </div>

            {/* Remote Work */}
            <div className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.remote}
                  onChange={(e) => setFilters({ ...filters, remote: e.target.checked })}
                  className="w-4 h-4 text-primary border-secondary-300 rounded focus:ring-primary"
                />
                <span className="text-sm font-medium text-secondary-700">Remote Only</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowFilters(false)}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

