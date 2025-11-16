import { NextResponse } from 'next/server';
import { clearCache } from '@/lib/cache';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const expectedToken = process.env.REFRESH_TOKEN;

    if (!expectedToken) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    clearCache();

    return NextResponse.json({
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error refreshing cache:', error);
    return NextResponse.json({ error: 'Failed to refresh cache' }, { status: 500 });
  }
}
