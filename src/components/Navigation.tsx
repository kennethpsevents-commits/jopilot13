'use client';
import { useState } from 'react';
// import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Search, User, Briefcase } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTalentDropdownOpen, setIsTalentDropdownOpen] = useState(false);
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);

  const talentMenuItems = [
    { name: 'Browse Jobs', href: '/jobs', description: 'Find your next opportunity' },
    { name: 'AI Job Matching', href: '/ai-matching', description: 'Get personalized recommendations' },
    { name: 'Career Resources', href: '/resources', description: 'Grow your career' },
    { name: 'Salary Insights', href: '/salaries', description: 'Know your worth' },
  ];

  const workMenuItems = [
    { name: 'Post a Job', href: '/post-job', description: 'Hire top talent' },
    { name: 'Find Talent', href: '/talent', description: 'Browse profiles' },
    { name: 'Enterprise', href: '/enterprise', description: 'Scale your team' },
    { name: 'Pricing', href: '/pricing', description: 'Transparent pricing' },
  ];

  return (
    <nav className="bg-white border-b border-secondary-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">✈️</span>
            </div>
            <span className="text-xl font-bold text-secondary-900">WeAreJobPilot</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Find Talent Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 text-secondary-700 hover:text-primary-600 font-medium transition-colors"
                onMouseEnter={() => setIsTalentDropdownOpen(true)}
                onMouseLeave={() => setIsTalentDropdownOpen(false)}
              >
                <Briefcase className="w-4 h-4" />
                <span>Find Talent</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isTalentDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-secondary-200 py-2 z-50"
                  onMouseEnter={() => setIsTalentDropdownOpen(true)}
                  onMouseLeave={() => setIsTalentDropdownOpen(false)}
                >
                  {talentMenuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 hover:bg-primary/5 transition-colors"
                    >
                      <div className="font-medium text-secondary-900">{item.name}</div>
                      <div className="text-sm text-secondary-500">{item.description}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Find Work Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 text-secondary-700 hover:text-primary-600 font-medium transition-colors"
                onMouseEnter={() => setIsWorkDropdownOpen(true)}
                onMouseLeave={() => setIsWorkDropdownOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Find Work</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isWorkDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-secondary-200 py-2 z-50"
                  onMouseEnter={() => setIsWorkDropdownOpen(true)}
                  onMouseLeave={() => setIsWorkDropdownOpen(false)}
                >
                  {workMenuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 hover:bg-primary/5 transition-colors"
                    >
                      <div className="font-medium text-secondary-900">{item.name}</div>
                      <div className="text-sm text-secondary-500">{item.description}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/how-it-works" className="text-secondary-700 hover:text-primary-600 font-medium transition-colors">
              How it Works
            </a>
            <a href="/pricing" className="text-secondary-700 hover:text-primary-600 font-medium transition-colors">
              Pricing
            </a>
            <a href="/resources" className="text-secondary-700 hover:text-primary-600 font-medium transition-colors">
              Resources
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 px-4 py-2">
              Log In
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-secondary-700 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-secondary-200 py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 mb-2">For Talent</h3>
                <div className="space-y-2 pl-4">
                  {talentMenuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 mb-2">For Clients</h3>
                <div className="space-y-2 pl-4">
                  {workMenuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-secondary-200">
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Log In
                  </button>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

