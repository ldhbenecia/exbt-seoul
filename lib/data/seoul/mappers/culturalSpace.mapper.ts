import { CulturalSpace } from '@/lib/types/culturalSpace';
import { SeoulSpaceRawRow } from '../types/culturalSpace.types';

export function mapSeoulRowToSpace(r: SeoulSpaceRawRow, idx: number): CulturalSpace | null {
  const name = (r.FAC_NAME ?? '').trim();
  if (!name) return null;

  const mainImg = (r.MAIN_IMG ?? '').trim();
  const imageUrl = mainImg
    ? mainImg.startsWith('http')
      ? mainImg
      : `https://culture.seoul.go.kr${mainImg}`
    : undefined;

  return {
    id: `space-${name}-${idx}`,
    name,
    category: r.SUBJCODE ?? undefined,
    address: r.FAC_ADDR ?? undefined,
    guname: r.GUNAME ?? undefined,
    phone: r.PHNE ?? undefined,
    homepage: r.HOMEPAGE ?? undefined,
    openHours: r.OPNHOURR ?? undefined,
    entranceFee: r.ENTR_FEE ?? undefined,
    closedDay: r.CLOSEDAY ?? undefined,
    seatCount: r.SEAT_CNT ? Number(r.SEAT_CNT) : undefined,
    description: r.FAC_DESC ?? undefined,
    imageUrl,
    lat: r.Y_COORD ? Number(r.Y_COORD) : undefined,
    lng: r.X_COORD ? Number(r.X_COORD) : undefined,
  };
}
