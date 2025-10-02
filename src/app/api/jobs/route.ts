import { NextResponse } from 'next/server';

export async function GET() {
  // Mock job data - in a real app, this would come from a database
  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Amsterdam',
      salary: '€60,000 - €80,000',
      type: 'full-time',
      description: 'We are looking for an experienced React developer...',
      postedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Utrecht',
      salary: '€45,000 - €65,000',
      type: 'full-time',
      description: 'Join our growing team as a Frontend Developer...',
      postedAt: new Date().toISOString()
    }
  ];

  return NextResponse.json({
    jobs,
    total: jobs.length,
    page: 1,
    limit: 10
  });
}

