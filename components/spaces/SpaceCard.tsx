'use client';

import { CulturalSpace } from '@/lib/types/culturalSpace';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, ExternalLink } from 'lucide-react';

interface SpaceCardProps {
  space: CulturalSpace;
}

export function SpaceCard({ space }: SpaceCardProps) {
  const homepage = space.homepage?.trim();

  return (
    <article className="overflow-hidden rounded-xl bg-card border border-border/50">
      <div className="relative aspect-[3/4] overflow-hidden">
        <ImageWithFallback src={space.imageUrl} alt={space.name} />
        {space.category && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-[11px] backdrop-blur-sm bg-background/70">
              {space.category}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold line-clamp-2 leading-snug">{space.name}</h3>
        <div className="text-xs text-muted-foreground space-y-1">
          {space.address && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="line-clamp-1">{space.address}</span>
            </div>
          )}
          {space.openHours && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="line-clamp-1">{space.openHours}</span>
            </div>
          )}
          {space.entranceFee && <p className="line-clamp-1">입장료: {space.entranceFee}</p>}
        </div>
        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            홈페이지
          </a>
        )}
      </div>
    </article>
  );
}
