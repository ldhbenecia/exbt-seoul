'use client';

import { useReservations } from '@/hooks/useReservations';
import { ReservationCard } from '@/components/reservations/ReservationCard';
import { CardGrid } from '@/components/common/CardGrid';
import { CardSkeleton } from '@/components/common/CardSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';

export function ReservationListSection() {
  const { items, initialLoading, error, total, hasMore, loadNext } = useReservations(1, 20);

  if (initialLoading) {
    return (
      <CardGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </CardGrid>
    );
  }

  return (
    <div className="space-y-6">
      {!error && items.length > 0 && (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{items.length}개</span> / 총 {total}개
        </p>
      )}

      {error && items.length === 0 && <ErrorState message={error} />}

      {!error && items.length === 0 && <EmptyState message="접수 중인 예약 프로그램이 없습니다" />}

      {items.length > 0 && (
        <>
          <CardGrid>
            {items.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </CardGrid>

          <div className="flex justify-center pt-4">
            <Button onClick={loadNext} disabled={!hasMore} variant="outline">
              {hasMore ? '더 보기' : '더 이상 결과가 없습니다'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
