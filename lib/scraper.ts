import * as cheerio from 'cheerio';
import { Exhibition } from '@/types/exhibition';

/**
 * 서울시 문화포털 등에서 전시회 정보를 크롤링하는 함수들
 */

// 카테고리 매핑 함수
function mapCategory(title: string, description: string): string {
  const titleLower = title.toLowerCase();
  const descLower = description.toLowerCase();
  
  if (titleLower.includes('사진') || descLower.includes('사진') || descLower.includes('photography')) {
    return 'photography';
  }
  if (titleLower.includes('조각') || descLower.includes('조각') || descLower.includes('sculpture')) {
    return 'sculpture';
  }
  if (titleLower.includes('디지털') || descLower.includes('디지털') || descLower.includes('digital') || descLower.includes('ai')) {
    return 'digital';
  }
  if (titleLower.includes('전통') || descLower.includes('전통') || descLower.includes('traditional') || descLower.includes('한국화')) {
    return 'traditional';
  }
  return 'contemporary';
}

/**
 * 서울시 문화포털 크롤링 (예시)
 * 실제 구현 시에는 해당 사이트의 HTML 구조에 맞게 수정 필요
 */
export async function scrapeSeoulCulturePortal(): Promise<Exhibition[]> {
  try {
    const response = await fetch('https://culture.seoul.go.kr/culture/cultureInfoList.do', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch Seoul Culture Portal');
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const exhibitions: Exhibition[] = [];

    // 실제 HTML 구조에 맞게 선택자 수정 필요
    $('.exhibition-item').each((index, element) => {
      try {
        const $el = $(element);
        const title = $el.find('.title').text().trim();
        const venue = $el.find('.venue').text().trim();
        const location = $el.find('.location').text().trim();
        const dateRange = $el.find('.date').text().trim();
        const imageUrl = $el.find('img').attr('src') || 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800';
        
        if (!title || !venue) return;

        // 날짜 파싱 (실제 구현 시 더 정교한 파싱 필요)
        const dateMatch = dateRange.match(/(\d{4}\.\d{2}\.\d{2})\s*-\s*(\d{4}\.\d{2}\.\d{2})/);
        const startDate = dateMatch ? dateMatch[1].replace(/\./g, '-') : new Date().toISOString().split('T')[0];
        const endDate = dateMatch ? dateMatch[2].replace(/\./g, '-') : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        exhibitions.push({
          id: `seoul-${index}-${Date.now()}`,
          title,
          artist: $el.find('.artist').text().trim() || '다양한 작가',
          venue,
          location: location || venue,
          category: mapCategory(title, $el.find('.description').text().trim()),
          startDate,
          endDate,
          description: $el.find('.description').text().trim() || `${title} 전시회입니다.`,
          imageUrl: imageUrl.startsWith('http') ? imageUrl : `https://culture.seoul.go.kr${imageUrl}`,
          price: $el.find('.price').text().trim() || '정보 없음',
          hours: $el.find('.hours').text().trim() || '화-일 10:00-18:00',
          website: $el.find('a').attr('href') || undefined,
          isFree: $el.find('.price').text().toLowerCase().includes('무료'),
        });
      } catch (err) {
        console.error('Error parsing exhibition item:', err);
      }
    });

    return exhibitions;
  } catch (error) {
    console.error('Error scraping Seoul Culture Portal:', error);
    return [];
  }
}

/**
 * 국립현대미술관 API 사용 (예시)
 */
export async function fetchMMCAExhibitions(): Promise<Exhibition[]> {
  try {
    // 국립현대미술관 API 엔드포인트 (실제 엔드포인트로 수정 필요)
    const response = await fetch('https://www.mmca.go.kr/exhibitions/progressList.do', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const exhibitions: Exhibition[] = [];

    // 실제 HTML 구조에 맞게 선택자 수정 필요
    $('.exhibition-list-item').each((index, element) => {
      try {
        const $el = $(element);
        const title = $el.find('h3').text().trim();
        const link = $el.find('a').attr('href');
        
        if (!title) return;

        exhibitions.push({
          id: `mmca-${index}-${Date.now()}`,
          title,
          artist: '다양한 작가',
          venue: '국립현대미술관 서울',
          location: '종로구 삼청로 30',
          category: 'contemporary',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          description: `${title} 전시회입니다.`,
          imageUrl: $el.find('img').attr('src') || 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
          price: '10,000원',
          hours: '화-일 10:00-18:00 (월요일 휴관)',
          website: link ? `https://www.mmca.go.kr${link}` : undefined,
          isFree: false,
        });
      } catch (err) {
        console.error('Error parsing MMCA exhibition:', err);
      }
    });

    return exhibitions;
  } catch (error) {
    console.error('Error fetching MMCA exhibitions:', error);
    return [];
  }
}

/**
 * 모든 소스에서 전시회 정보 수집
 */
export async function scrapeAllExhibitions(): Promise<Exhibition[]> {
  try {
    const [seoulCulture, mmca] = await Promise.allSettled([
      scrapeSeoulCulturePortal(),
      fetchMMCAExhibitions(),
    ]);

    const exhibitions: Exhibition[] = [];
    
    if (seoulCulture.status === 'fulfilled') {
      exhibitions.push(...seoulCulture.value);
    }
    
    if (mmca.status === 'fulfilled') {
      exhibitions.push(...mmca.value);
    }

    // 중복 제거 (제목 기준)
    const uniqueExhibitions = Array.from(
      new Map(exhibitions.map((ex) => [ex.title, ex])).values()
    );

    return uniqueExhibitions;
  } catch (error) {
    console.error('Error scraping all exhibitions:', error);
    return [];
  }
}

