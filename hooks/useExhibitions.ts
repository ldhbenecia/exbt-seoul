'use client';

import { useState, useEffect } from 'react';
import { Exhibition } from '@/types/exhibition';

export function useExhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  useEffect(() => {
    async function fetchExhibitions() {
      try {
        setIsLoading(true);
        setError(null);
        setStatusCode(null);

        const response = await fetch('/api/exhibitions');

        if (!response.ok) {
          setStatusCode(response.status);
          if (response.status === 404) {
            throw new Error('현재 수집된 전시 정보가 없습니다.');
          }
          if (response.status === 503) {
            throw new Error('서비스가 일시적으로 불가능합니다. 잠시 후 다시 시도해주세요.');
          }
          throw new Error('전시회 정보를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        setExhibitions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        console.error('Error fetching exhibitions:', err);
        setExhibitions(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchExhibitions();
  }, []);

  return { exhibitions, isLoading, error, statusCode };
}
