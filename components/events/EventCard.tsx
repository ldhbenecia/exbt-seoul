'use client';

import { CulturalEvent } from '@/lib/types/culturalEvent';
import { formatShortDate, getCodenameLabel } from '@/lib/utils/dateUtils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  event: CulturalEvent;
  priority?: boolean;
  onClick: () => void;
}

export function EventCard({ event, priority = false, onClick }: EventCardProps) {
  const title = event.title || '제목 없음';
  const venue = event.place || '장소 정보 없음';
  const start = formatShortDate(event.startDate);
  const end = formatShortDate(event.endDate);

  return (
    <article className="overflow-hidden rounded-xl bg-card border border-border/50">
      <div className="relative aspect-[3/4] overflow-hidden cursor-pointer group" onClick={onClick}>
        <ImageWithFallback
          src={event.imageUrl}
          alt={title}
          priority={priority}
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <Badge variant="secondary" className="text-[11px] backdrop-blur-sm bg-background/70">
            {getCodenameLabel(event.codename)}
          </Badge>
          {event.isFree && (
            <Badge className="text-[11px] bg-green-600/80 text-white backdrop-blur-sm">무료</Badge>
          )}
        </div>
      </div>

      <div className="p-3 space-y-1.5">
        <h3 className="text-sm font-semibold line-clamp-2 leading-snug">{title}</h3>
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{venue}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>
              {start} - {end}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
