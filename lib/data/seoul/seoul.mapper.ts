import { CulturalEvent } from '@/lib/types/culturalEvent';
import { SeoulApiRawRow } from './seoul.types';

export function mapSeoulRowToEvent(r: SeoulApiRawRow, idx: number): CulturalEvent | null {
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
