'use client';

import { CulturalEvent } from '@/lib/types/culturalEvent';
import { useState, useEffect, useRef, useCallback } from 'react';
import { CODENAME_TO_SLUG, CodenameTab } from '@/lib/constants/codenames';

type EventsResponse = {
  data: CulturalEvent[];
  meta: { total: number; page: number; pageSize: number; count: number };
};

export function useEvents(
  initialPage = 1,
  initialPageSize = 20,
  codename: CodenameTab | '' = '',
  title = ''
) {
  const [items, setItems] = useState<CulturalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const pageRef = useRef(initialPage);
  const fetchIdRef = useRef(0);
  const hasFetchedRef = useRef(false);

  const hasMore = items.length < total;

  const fetchData = useCallback(
    async (page: number, append: boolean) => {
      const id = ++fetchIdRef.current;
      setError(null);

      try {
        const slug = codename ? (CODENAME_TO_SLUG[codename as CodenameTab] ?? '') : '';

        const qs = new URLSearchParams({
          page: String(page),
          pageSize: String(initialPageSize),
        });
        if (slug) qs.set('codename', slug);
        if (title) qs.set('title', title);

        const res = await fetch(`/api/events?${qs.toString()}`);
        if (id !== fetchIdRef.current) return;

        if (!res.ok) {
          if (res.status === 404) throw new Error('현재 수집된 정보가 없습니다.');
          if (res.status === 503)
            throw new Error('서비스가 일시적으로 불가능합니다. 잠시 후 다시 시도해주세요.');
          throw new Error('정보를 불러오는데 실패했습니다.');
        }

        const { data, meta } = (await res.json()) as EventsResponse;
        if (id !== fetchIdRef.current) return;

        setItems((prev) => (append ? [...prev, ...data] : data));
        setTotal(meta.total);
      } catch (err) {
        if (id !== fetchIdRef.current) return;
        setItems([]);
        setTotal(0);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        if (id === fetchIdRef.current) {
          if (!hasFetchedRef.current) {
            hasFetchedRef.current = true;
            setInitialLoading(false);
          }
        }
      }
    },
    [codename, title, initialPageSize]
  );

  useEffect(() => {
    pageRef.current = initialPage;
    fetchData(initialPage, false);
  }, [fetchData, initialPage]);

  return {
    items,
    initialLoading,
    error,
    total,
    hasMore,
    loadNext: () => {
      if (hasMore) {
        pageRef.current += 1;
        fetchData(pageRef.current, true);
      }
    },
  };
}
