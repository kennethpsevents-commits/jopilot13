'use client';
import { Button } from '@/components/ui/button';
import { Heart, Eye, MapPin, Clock, Star, Users } from 'lucide-react';

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    skills: string[];
    rating: number;
    applicants: number;
    isUrgent?: boolean;
    isRemote?: boolean;
    companyLogo?: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-success/10 text-success-dark border-success/20';
      case 'part-time':
        return 'bg-warning/10 text-warning-dark border-warning/20';
      case 'contract':
        return 'bg-accent/10 text-accent-dark border-accent/20';
      default:
        return 'bg-primary/10 text-primary-dark border-primary/20';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-secondary-200 p-6 hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] hover:border-primary/30">
      {/* Urgent Badge */}
      {job.isUrgent && (
        <div className="absolute -top-2 -right-2 bg-error text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce-subtle">
          URGENT
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            {job.companyLogo ? (
              <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center overflow-hidden">
                <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">{job.company.charAt(0)}</span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-h4 font-semibold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors truncate">
                {job.title}
              </h3>
              <p className="text-bodySmall font-medium text-secondary-600 truncate">{job.company}</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-1 ml-2">
          <button className="p-2 text-secondary-400 hover:text-error transition-colors rounded-lg hover:bg-error/5">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 text-secondary-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Location & Type */}
      <div className="flex items-center space-x-4 text-caption text-secondary-500 mb-4">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{job.location}</span>
          {job.isRemote && (
            <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
              Remote
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(job.type)}`}>
            {job.type}
          </span>
        </div>
      </div>
      
      {/* Salary & Posted */}
      <div className="mb-4">
        <p className="text-xl font-bold text-secondary-900 mb-1">{job.salary}</p>
        <p className="text-caption text-secondary-500">Posted {job.posted}</p>
      </div>
      
      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.skills.slice(0, 3).map((skill, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-primary/10 text-primary-700 text-sm rounded-full font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-3 py-1 bg-secondary-100 text-secondary-600 text-sm rounded-full font-medium">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>
      
      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span className="text-sm font-semibold text-secondary-700">{job.rating}</span>
          </div>
          <div className="flex items-center space-x-1 text-secondary-500">
            <Users className="w-4 h-4" />
            <span className="text-sm">{job.applicants} applicants</span>
          </div>
        </div>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 text-sm"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

