import { NextResponse } from 'next/server';
import { getCachedExhibitions, setCachedExhibitions } from '@/lib/cache';
import { scrapeAllExhibitions } from '@/lib/scraper';
import { mockExhibitions } from '@/data/mockExhibitions';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1시간마다 재검증

export async function GET() {
  try {
    // 캐시 확인
    const cached = getCachedExhibitions();
    if (cached) {
      return NextResponse.json(cached);
    }

    // 크롤링 시도
    let exhibitions = await scrapeAllExhibitions();

    // 크롤링 실패 시 mock 데이터 사용 (개발/테스트용)
    if (exhibitions.length === 0) {
      console.log('No exhibitions found from scraping, using mock data');
      exhibitions = mockExhibitions;
    }

    // 캐시에 저장
    setCachedExhibitions(exhibitions);

    return NextResponse.json(exhibitions);
  } catch (error) {
    console.error('Error fetching exhibitions:', error);

    // 에러 발생 시 mock 데이터 반환
    return NextResponse.json(mockExhibitions);
  }
}
