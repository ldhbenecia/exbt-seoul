import { NextResponse } from 'next/server';
import { getCachedExhibitions, setCachedExhibitions } from '@/lib/cache';
import { scrapeAllExhibitions } from '@/lib/scraper';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  try {
    const cached = getCachedExhibitions();
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=300',
          ETag: `"exbt-${cached.length}"`,
          'Last-Modified': new Date().toUTCString(),
        },
      });
    }

    const exhibitions = await scrapeAllExhibitions();

    if (!exhibitions || exhibitions.length === 0) {
      return NextResponse.json(
        { error: 'No exhibitions found' },
        {
          status: 404,
          headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' },
        }
      );
    }

    setCachedExhibitions(exhibitions);

    return NextResponse.json(exhibitions, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        ETag: `"exbt-${exhibitions.length}"`,
        'Last-Modified': new Date().toUTCString(),
      },
    });
  } catch (error) {
    console.error('Error fetching exhibitions:', error);

    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503, headers: { 'Retry-After': '300' } }
    );
  }
}
