import { Reservation } from '@/lib/types/reservation';
import { SeoulReservationRawRow } from '../types/reservation.types';

export function mapSeoulRowToReservation(
  r: SeoulReservationRawRow,
  idx: number
): Reservation | null {
  const name = (r.SVCNM ?? '').trim();
  if (!name) return null;

  const imgUrl = (r.IMGURL ?? '').trim();
  const imageUrl = imgUrl
    ? imgUrl.startsWith('http')
      ? imgUrl
      : `https://yeyak.seoul.go.kr${imgUrl}`
    : undefined;

  return {
    id: r.SVCID ?? `rsv-${name}-${idx}`,
    name,
    category: r.MAXCLASSNM ?? undefined,
    subCategory: r.MINCLASSNM ?? undefined,
    status: r.SVCSTATNM ?? undefined,
    payType: r.PAYATNM ?? undefined,
    place: r.PLACENM ?? undefined,
    target: r.USETGTINFO ?? undefined,
    url: r.SVCURL ?? undefined,
    area: r.AREANM ?? undefined,
    imageUrl,
    description: r.DTLCONT ?? undefined,
    phone: r.TELNO ?? undefined,
    registerStart: r.SVCOPNBGNDT ?? undefined,
    registerEnd: r.SVCOPNENDDT ?? undefined,
    useStart: r.RCPTBGNDT ?? undefined,
    useEnd: r.RCPTENDDT ?? undefined,
    minPrice: r.V_MIN ? Number(r.V_MIN) : undefined,
    maxPrice: r.V_MAX ? Number(r.V_MAX) : undefined,
    lat: r.Y ? Number(r.Y) : undefined,
    lng: r.X ? Number(r.X) : undefined,
  };
}
