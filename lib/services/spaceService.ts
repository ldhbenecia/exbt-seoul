import { CulturalSpace } from '@/lib/types/culturalSpace';
import { SeoulSpaceRawRow } from '@/lib/data/seoul/types/culturalSpace.types';
import { mapSeoulRowToSpace } from '@/lib/data/seoul/mappers/culturalSpace.mapper';
import { fetchSeoulApi } from '@/lib/data/seoul/seoul.client';

export async function getPaginatedSpaces(params: { page?: number; pageSize?: number }): Promise<{
  data: CulturalSpace[];
  meta: { total: number; page: number; pageSize: number; count: number };
}> {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));

  const start = (page - 1) * pageSize + 1;
  const end = start + pageSize - 1;

  const { rows, totalCount } = await fetchSeoulApi<SeoulSpaceRawRow>(
    'culturalSpaceInfo',
    start,
    end,
    [],
    'seoul-spaces'
  );

  const data = rows
    .map((r, idx) => mapSeoulRowToSpace(r, start - 1 + idx))
    .filter((x): x is CulturalSpace => x !== null);

  return {
    data,
    meta: { total: totalCount, page, pageSize, count: data.length },
  };
}
