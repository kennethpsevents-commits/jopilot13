'use client';
import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
import JobCard from '@/components/JobCard';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import { ArrowRight, Shield, Globe, TrendingUp, Star, Users, Building2, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = [
    { name: 'Web Development', jobs: '12,345', icon: '💻' },
    { name: 'Mobile Development', jobs: '8,234', icon: '📱' },
    { name: 'Data Science', jobs: '5,678', icon: '📊' },
    { name: 'Design', jobs: '9,876', icon: '🎨' },
    { name: 'Marketing', jobs: '7,543', icon: '📈' },
    { name: 'Writing', jobs: '4,321', icon: '✍️' },
    { name: 'AI & Machine Learning', jobs: '3,456', icon: '🤖' },
    { name: 'DevOps', jobs: '2,345', icon: '⚙️' }
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      salary: '€60,000 - €80,000',
      posted: '2 hours ago',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Jest'],
      rating: 4.8,
      applicants: 23,
      isUrgent: true,
      isRemote: false,
      companyLogo: undefined
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      company: 'DataFlow',
      location: 'Remote',
      type: 'Contract',
      salary: '€80 - €120/hour',
      posted: '4 hours ago',
      skills: ['Python', 'TensorFlow', 'AWS', 'PyTorch', 'Docker'],
      rating: 4.9,
      applicants: 45,
      isUrgent: false,
      isRemote: true,
      companyLogo: undefined
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'DesignStudio',
      location: 'Rotterdam, Netherlands',
      type: 'Part-time',
      salary: '€40,000 - €55,000',
      posted: '6 hours ago',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research'],
      rating: 4.7,
      applicants: 18,
      isUrgent: false,
      isRemote: false,
      companyLogo: undefined
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Utrecht, Netherlands',
      type: 'Full-time',
      salary: '€50,000 - €70,000',
      posted: '1 day ago',
      skills: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'Docker'],
      rating: 4.6,
      applicants: 31,
      isUrgent: false,
      isRemote: false,
      companyLogo: undefined
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Remote',
      type: 'Contract',
      salary: '€70 - €100/hour',
      posted: '1 day ago',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins'],
      rating: 4.8,
      applicants: 27,
      isUrgent: false,
      isRemote: true,
      companyLogo: undefined
    },
    {
      id: 6,
      title: 'Product Manager',
      company: 'InnovateCorp',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      salary: '€65,000 - €85,000',
      posted: '2 days ago',
      skills: ['Agile', 'Scrum', 'Analytics', 'Product Strategy', 'User Stories'],
      rating: 4.9,
      applicants: 42,
      isUrgent: false,
      isRemote: false,
      companyLogo: undefined
    }
  ];

  const handleSearch = (query: string, location: string) => {
    console.log('Searching for:', query, 'in', location);
    // Implement search functionality
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-primary/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-900 mb-8 leading-tight">
              Find the work you
              <span className="text-primary-600 block lg:inline"> love</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect with AI-powered job discovery. Get matched with opportunities that fit your skills and career goals.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-5xl mx-auto mb-12">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 text-secondary-600">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <span className="font-semibold">AI-Powered Matching</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <span className="font-semibold">Remote & Local Jobs</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <span className="font-semibold">Career Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-warning fill-warning" />
                  <span className="text-2xl font-bold text-secondary-900">4.9</span>
                </div>
                <span className="text-secondary-600 font-medium">AI-job matches rated by users</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Building2 className="w-6 h-6 text-primary" />
                <span className="text-2xl font-bold text-secondary-900">50,000+</span>
                <span className="text-secondary-600 font-medium">jobs live</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-6 h-6 text-success" />
                <span className="text-2xl font-bold text-secondary-900">2,500+</span>
                <span className="text-secondary-600 font-medium">active companies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Browse talent by category
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Get started by selecting a category that best describes your skills and interests
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white border-2 border-secondary-200 rounded-2xl p-8 text-center hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">{category.name}</h3>
                  <p className="text-caption text-secondary-500 font-medium">{category.jobs} jobs available</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
                Featured jobs for you
              </h2>
              <p className="text-xl text-secondary-600 max-w-2xl">
                AI-matched opportunities based on your profile and preferences
              </p>
            </div>
            <button 
              className="mt-6 lg:mt-0 flex items-center space-x-2 group hover:bg-blue-600 hover:text-white transition-all duration-200 px-6 py-3 border border-blue-200 rounded-lg"
            >
              <span>View all jobs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Enhanced Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredJobs.map((job, index) => (
              <div 
                key={job.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Why choose WeAreJobPilot?
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              We're not just another job board. We're your AI-powered career partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:shadow-card-hover transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-secondary-900 mb-4">AI-Powered Matching</h3>
              <p className="text-secondary-600 leading-relaxed">
                Our advanced AI analyzes your skills, experience, and preferences to match you with the perfect opportunities.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:shadow-card-hover transition-all duration-300">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-semibold text-secondary-900 mb-4">Quality Assured</h3>
              <p className="text-secondary-600 leading-relaxed">
                Every job posting is verified and every company is vetted to ensure you're applying to legitimate opportunities.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:shadow-card-hover transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold text-secondary-900 mb-4">Career Growth</h3>
              <p className="text-secondary-600 leading-relaxed">
                Get personalized career insights and recommendations to help you grow and advance in your field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to find your next opportunity?
          </h2>
          <p className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed">
            Join thousands of professionals who have found their dream jobs through AI-powered matching.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Browse Jobs
            </button>
            <button 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Post a Job
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}