'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, DollarSign, ExternalLink, User } from 'lucide-react';
import { CulturalEvent } from '@/lib/types/culturalEvent';
import { formatFullDate, getCodenameLabel } from '@/lib/utils/dateUtils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface CulturalEventDetailProps {
  culturalEvent: CulturalEvent | null;
  open: boolean;
  onClose: () => void;
}

export function CulturalEventDetail({ culturalEvent, open, onClose }: CulturalEventDetailProps) {
  if (!culturalEvent) return null;

  const title = culturalEvent.title || '제목 없음';
  const imageSrc = culturalEvent.imageUrl;
  const venue = culturalEvent.place || '장소 정보 없음';
  const gu = culturalEvent.guname || '';
  const description =
    culturalEvent.description && culturalEvent.description.trim().length > 0
      ? culturalEvent.description
      : null;
  const actorOrOrg = ((culturalEvent.player || '') + ' ' + (culturalEvent.orgName || '')).trim();
  const hours = culturalEvent.proTime || culturalEvent.date || '';
  const price = culturalEvent.useFee || '';
  const website = culturalEvent.website || culturalEvent.hmpgAddr || culturalEvent.orgLink || '';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden gap-0">
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <div className="flex flex-col sm:flex-row max-h-[90vh]">
          <div className="relative w-full sm:w-2/5 aspect-[3/4] sm:aspect-auto sm:min-h-full shrink-0 bg-muted">
            <ImageWithFallback src={imageSrc} alt={title} />
          </div>
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 scrollbar-hide">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge>{getCodenameLabel(culturalEvent.codename)}</Badge>
              {culturalEvent.isFree && <Badge variant="secondary">무료</Badge>}
            </div>
            <h2 className="text-lg sm:text-xl font-bold leading-snug break-keep">{title}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p>{venue}</p>
                  {gu && <p className="text-muted-foreground text-xs">{gu}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <p>
                  {formatFullDate(culturalEvent.startDate)} —{' '}
                  {formatFullDate(culturalEvent.endDate)}
                </p>
              </div>

              {hours && (
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                  <p>{hours}</p>
                </div>
              )}

              {price && (
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-muted-foreground shrink-0" />
                  <p>{price}</p>
                </div>
              )}

              {actorOrOrg && (
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-muted-foreground shrink-0" />
                  <p>{actorOrOrg}</p>
                </div>
              )}
            </div>

            {description && (
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                  소개
                </p>
                <p className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            {website && (
              <Button asChild className="w-full" size="lg">
                <a href={website} target="_blank" rel="noopener noreferrer">
                  상세 페이지
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
