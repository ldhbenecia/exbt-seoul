import { Exhibition } from '@/types/exhibition';

const KEY = process.env.SEOUL_OPEN_API_KEY!;
if (!KEY) throw new Error('Missing SEOUL_OPEN_API_KEY');

function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

type RawRow = {
  CODENAME?: string;
  GUNAME?: string;
  TITLE?: string;
  DATE?: string;
  PLACE?: string;
  ORG_NAME?: string;
  USE_TRGT?: string;
  USE_FEE?: string;
  INQUIRY?: string;
  PLAYER?: string;
  PROGRAM?: string;
  ETC_DESC?: string;
  ORG_LINK?: string;
  MAIN_IMG?: string;
  RGSTDATE?: string;
  TICKET?: string;
  STRTDATE?: string;
  END_DATE?: string;
  THEMECODE?: string;
  LOT?: string;
  LAT?: string;
  IS_FREE?: string;
  HMPG_ADDR?: string;
  PRO_TIME?: string;
};

function buildUrl(
  start: number,
  end: number,
  filters: { codename?: string; title?: string; date?: string }
) {
  const base = `http://openapi.seoul.go.kr:8088/${KEY}/json/culturalEventInfo/${start}/${end}`;

  if (!filters.codename && !filters.title && !filters.date) {
    return base + '/';
  }

  const codename = filters.codename ? encodeURIComponent(filters.codename) : '%20';
  const title = filters.title ? encodeURIComponent(filters.title) : '%20';
  const date = filters.date ? encodeURIComponent(filters.date) : '%20';
  return `${base}/${codename}/${title}/${date}`;
}

function toExhibition(r: RawRow, idx: number): Exhibition | null {
  const title = (r.TITLE ?? '').trim();
  const place = (r.PLACE ?? '').trim();
  if (!title || !place) return null;

  const startDate = (r.STRTDATE ?? '').trim();
  const endDate = (r.END_DATE ?? '').trim();
  if (startDate && endDate && startDate > endDate) return null;

  const mainImg = (r.MAIN_IMG ?? '').trim();
  const imageUrl = mainImg
    ? mainImg.startsWith('http')
      ? mainImg
      : `https://culture.seoul.go.kr${mainImg}`
    : undefined;

  const website = (r.HMPG_ADDR ?? r.ORG_LINK ?? '').trim() || undefined;
  const description = `${(r.PROGRAM ?? '').trim()} ${(r.ETC_DESC ?? '').trim()}`.trim();

  return {
    id: `seoul-${title}-${startDate}-${place}-${idx}`,
    codename: r.CODENAME ?? undefined,
    guname: r.GUNAME ?? undefined,
    title,
    date: r.DATE ?? undefined,
    place,
    orgName: r.ORG_NAME ?? undefined,
    useTarget: r.USE_TRGT ?? undefined,
    useFee: r.USE_FEE ?? undefined,
    inquiry: r.INQUIRY ?? undefined,
    player: r.PLAYER ?? undefined,
    program: r.PROGRAM ?? undefined,
    etcDesc: r.ETC_DESC ?? undefined,
    orgLink: r.ORG_LINK ?? undefined,
    mainImg: r.MAIN_IMG ?? undefined,
    rgstDate: r.RGSTDATE ?? undefined,
    ticket: r.TICKET ?? undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    themeCode: r.THEMECODE ?? undefined,
    lot: r.LOT ? Number(r.LOT) : undefined,
    lat: r.LAT ? Number(r.LAT) : undefined,
    isFree: r.IS_FREE === '무료' ? true : r.IS_FREE === '유료' ? false : undefined,
    hmpgAddr: r.HMPG_ADDR ?? undefined,
    proTime: r.PRO_TIME ?? undefined,
    imageUrl,
    website,
    description: description || undefined,
  };
}

export async function fetchSeoulEventsPage(params: {
  page?: number;
  pageSize?: number;
  codename?: string;
  title?: string;
  date?: string;
}): Promise<{
  data: Exhibition[];
  meta: { total: number; page: number; pageSize: number; count: number };
}> {
  const requestedPage = Math.max(1, params.page ?? 1);
  const requestedPageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));

  const dateFilter = params.date || getTodayDateString();

  const url = buildUrl(1, 1000, {
    codename: params.codename ?? '',
    title: params.title ?? '',
    date: dateFilter,
  });

  console.log('[SeoulAPI:REQ-ALL]', {
    codename: params.codename ?? '',
    title: params.title ?? '',
    date: dateFilter,
  });
  console.log('[SeoulAPI:URL-ALL]', url);

  const res = await fetch(url, { cache: 'no-store' });
  console.log('[SeoulAPI:HTTP]', res.status);

  if (!res.ok) throw new Error(`Seoul OpenAPI HTTP ${res.status}`);

  const json = await res.json();
  const box = json?.culturalEventInfo;
  const result = box?.RESULT;
  const allRows: RawRow[] = Array.isArray(box?.row) ? box.row : [];
  const apiTotal: number = box?.list_total_count ?? allRows.length ?? 0;

  console.log('[SeoulAPI:RESULT]', {
    code: result?.CODE,
    message: result?.MESSAGE,
    list_total_count: apiTotal,
  });
  console.log('[SeoulAPI:ROWS-ALL]', { count: allRows.length, total: apiTotal });

  const today = dateFilter; // 'YYYY-MM-DD'

  const filteredRows = allRows.filter((r) => {
    const startDate = (r.STRTDATE ?? '').trim();
    const endDate = (r.END_DATE ?? '').trim();

    if (!startDate || !endDate) return false;

    return startDate <= today && today <= endDate;
  });

  const correctTotal = filteredRows.length;
  console.log('[SeoulAPI:FILTERED]', { apiCount: allRows.length, filteredCount: correctTotal });

  const startIdx = (requestedPage - 1) * requestedPageSize;
  const endIdx = startIdx + requestedPageSize;

  const pagedRows = filteredRows.slice(startIdx, endIdx);

  const data: Exhibition[] = pagedRows
    .map((r: RawRow, idx: number) => toExhibition(r, idx))
    .filter((x: Exhibition | null): x is Exhibition => !!x);

  console.log('[SeoulAPI:PAGED]', { page: requestedPage, count: data.length });

  return {
    data,
    meta: {
      total: correctTotal,
      page: requestedPage,
      pageSize: requestedPageSize,
      count: data.length,
    },
  };
}
