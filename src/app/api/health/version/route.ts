import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Get build info from environment or generate fallback
  const sha = process.env.VERCEL_GIT_COMMIT_SHA || 'local-dev';
  const branch = process.env.VERCEL_GIT_COMMIT_REF || 'main';
  const builtAt = process.env.VERCEL_BUILD_TIME || new Date().toISOString();
  
  return NextResponse.json({
    sha: sha.substring(0, 7), // Short SHA
    branch,
    builtAt,
    version: '1.0.0',
    name: 'WeAreJobPilot'
  }, {
    headers: {
      'X-Build-SHA': sha,
      'Cache-Control': 'public, max-age=3600'
    }
  });
}