import { getPaginatedSpaces } from '@/lib/services/spaceService';
import { NextResponse } from 'next/server';

export const revalidate = 300;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '20');

    const { data, meta } = await getPaginatedSpaces({ page, pageSize });

    return NextResponse.json({ data, meta });
  } catch (error) {
    console.error('Error fetching spaces:', error);
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503, headers: { 'Retry-After': '120' } }
    );
  }
}
