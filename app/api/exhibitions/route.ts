import { NextResponse } from 'next/server';
import { fetchEventsPage } from '@/lib/clients';

export const dynamic = 'force-dynamic';
export const revalidate = 120;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '20');
    const codename = url.searchParams.get('codename') ?? '';
    const title = url.searchParams.get('title') ?? '';
    const date = url.searchParams.get('date') ?? '';

    const { data, meta } = await fetchEventsPage({ page, pageSize, codename, title, date });

    return NextResponse.json(
      { data, meta },
      {
        headers: {
          'Cache-Control': 'public, max-age=120, s-maxage=120',
          ETag: `"evt-p${meta.page}-s${meta.pageSize}-c${meta.count}"`,
          'Last-Modified': new Date().toUTCString(),
        },
      }
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503, headers: { 'Retry-After': '120' } }
    );
  }
}
