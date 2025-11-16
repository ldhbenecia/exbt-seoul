import puppeteer from 'puppeteer';
import { Exhibition } from '@/types/exhibition';

export async function scrapeSeoulCulturePortal(): Promise<Exhibition[]> {
  console.log('[1] 크롤러 시작');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 이미지, CSS, 폰트 요청 차단 -> 속도 향상
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  try {
    console.log('[2] 페이지 열기...');
    await page.goto(
      'https://culture.seoul.go.kr/culture/culture/cultureEvent/list.do?searchCate=EXHIBITION&menuNo=200009',
      { waitUntil: 'domcontentloaded', timeout: 30000 }
    );

    console.log('[3] 페이지 로드 완료, li 등장 대기...');
    await page.waitForSelector('#dataList li', { timeout: 10000 });

    const exhibitions: Exhibition[] = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('#dataList li')).map((el, i) => {
        // 필수 요소 선택
        const titleEl = el.querySelector('.txt2 .tit');
        const venueEl = el.querySelector('.txt2 .place');
        const linkEl = el.querySelector('a');
        const imgEl = el.querySelector('.img img');
        const artistEl = el.querySelector('.txt2 .artist');

        // 항상 string으로 보장
        const title = titleEl?.textContent?.trim() ?? '';
        const venue = venueEl?.textContent?.trim() ?? '';
        const linkAttr = linkEl?.getAttribute('href');
        const link = linkAttr ? 'https://culture.seoul.go.kr' + linkAttr : '';
        const image = imgEl?.getAttribute('src') ?? '';
        const startDate = el.querySelector('.date span:first-child')?.textContent?.trim() ?? '';
        const endDate = el.querySelector('.date span:last-child')?.textContent?.trim() ?? '';
        const artist = artistEl?.textContent?.trim() ?? '';

        return {
          id: `seoul-${i}`,
          title,
          artist,
          venue,
          location: venue,
          category: 'contemporary',
          startDate,
          endDate,
          description: `${title} 전시회입니다.`,
          imageUrl: image.startsWith('http') ? image : `https://culture.seoul.go.kr${image}`,
          price: '정보 없음',
          hours: '10:00~18:00',
          website: link,
          isFree: false,
        };
      });
    });

    console.log(`[4] 총 ${exhibitions.length}개의 전시회 수집 완료`);
    return exhibitions;
  } catch (error) {
    console.error('[ERROR] 크롤링 실패:', error);
    return [];
  } finally {
    await browser.close();
    console.log('[5] 브라우저 종료');
  }
}
