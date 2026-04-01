import { getPaginatedEvents } from '@/lib/services/eventService';
import { SLUG_TO_CODENAME } from '@/lib/constants/codenames';
import { NextResponse } from 'next/server';

export const revalidate = 120;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '20');
    const slug = url.searchParams.get('codename') ?? '';
    const codename = SLUG_TO_CODENAME[slug] ?? slug;
    const title = url.searchParams.get('title') ?? '';

    const { data, meta } = await getPaginatedEvents({ page, pageSize, codename, title });

    return NextResponse.json({ data, meta });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503, headers: { 'Retry-After': '120' } }
    );
  }
}
