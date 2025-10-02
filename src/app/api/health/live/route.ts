import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = process.uptime();
  const projectId = process.env.VERCEL_PROJECT_ID || 'local-dev';
  
  return NextResponse.json({
    status: 'ok',
    projectId,
    timestamp: new Date().toISOString(),
    uptime: Math.floor(startTime),
    environment: process.env.VERCEL_ENV || 'development'
  });
}

