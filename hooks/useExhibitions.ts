'use client';

import { useState, useEffect } from 'react';
import { Exhibition } from '@/types/exhibition';

type EventsResponse = {
  data: Exhibition[];
  meta: { total: number; page: number; pageSize: number; count: number };
};

export function useExhibitions(
  initialPage = 1,
  initialPageSize = 20,
  codename = '',
  title = '',
  date = ''
) {
  const [items, setItems] = useState<Exhibition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);
  const [total, setTotal] = useState(0);

  const hasMore = items.length < total;

  useEffect(() => {
    let cancelled = false;
    async function fetchPage() {
      try {
        setIsLoading(true);
        setError(null);
        setStatusCode(null);

        const qs = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
        });
        if (codename) qs.set('codename', codename);
        if (title) qs.set('title', title);
        if (date) qs.set('date', date);

        const res = await fetch(`/api/exhibitions?${qs.toString()}`);
        if (!res.ok) {
          setStatusCode(res.status);
          if (res.status === 404) throw new Error('현재 수집된 정보가 없습니다.');
          if (res.status === 503)
            throw new Error('서비스가 일시적으로 불가능합니다. 잠시 후 다시 시도해주세요.');
          throw new Error('정보를 불러오는데 실패했습니다.');
        }

        const { data, meta } = (await res.json()) as EventsResponse;
        if (cancelled) return;

        setItems((prev) => (page === initialPage ? data : [...prev, ...data]));
        setTotal(meta.total);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        console.error('Error fetching events:', err);
        setItems((prev) => prev);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchPage();
    return () => {
      cancelled = true;
    };
  }, [page, pageSize, codename, title, date, initialPage]);

  return {
    items,
    isLoading,
    error,
    statusCode,
    total,
    page,
    pageSize,
    hasMore,
    loadNext: () => {
      if (hasMore && !isLoading) setPage((p) => p + 1);
    },
    reset: () => {
      setPage(initialPage);
      setItems([]);
      setTotal(0);
    },
  };
}
