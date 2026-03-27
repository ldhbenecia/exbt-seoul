'use client';

import { Reservation } from '@/lib/types/reservation';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { MapPin, ExternalLink } from 'lucide-react';

interface ReservationCardProps {
  reservation: Reservation;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  const priceLabel =
    reservation.payType === '무료'
      ? '무료'
      : reservation.minPrice != null && reservation.maxPrice != null
        ? `${reservation.minPrice.toLocaleString()} - ${reservation.maxPrice.toLocaleString()}원`
        : reservation.payType || '';

  return (
    <article className="overflow-hidden rounded-xl bg-card border border-border/50">
      <div className="relative aspect-[3/4] overflow-hidden">
        <ImageWithFallback src={reservation.imageUrl} alt={reservation.name} />
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          {reservation.category && (
            <Badge variant="secondary" className="text-[11px] backdrop-blur-sm bg-background/70">
              {reservation.category}
            </Badge>
          )}
          {reservation.status && (
            <Badge className="text-[11px] bg-blue-600/80 text-white backdrop-blur-sm">
              {reservation.status}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold line-clamp-2 leading-snug">{reservation.name}</h3>
        <div className="text-xs text-muted-foreground space-y-1">
          {reservation.place && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="line-clamp-1">{reservation.place}</span>
            </div>
          )}
          {priceLabel && <p className="line-clamp-1">{priceLabel}</p>}
        </div>
        {reservation.url && (
          <a
            href={reservation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            예약하기
          </a>
        )}
      </div>
    </article>
  );
}
