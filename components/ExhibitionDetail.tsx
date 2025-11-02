import { Exhibition } from '../types/exhibition';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, Clock, DollarSign, ExternalLink } from 'lucide-react';

interface ExhibitionDetailProps {
  exhibition: Exhibition | null;
  open: boolean;
  onClose: () => void;
}

export function ExhibitionDetail({ exhibition, open, onClose }: ExhibitionDetailProps) {
  if (!exhibition) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      contemporary: '현대미술',
      photography: '사진',
      sculpture: '조각',
      digital: '디지털아트',
      traditional: '전통미술',
    };
    return labels[category] || category;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{exhibition.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={exhibition.imageUrl}
              alt={exhibition.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge>{getCategoryLabel(exhibition.category)}</Badge>
              {exhibition.isFree && <Badge variant="secondary">무료 관람</Badge>}
            </div>

            <div>
              <p className="text-muted-foreground">작가</p>
              <p className="mt-1">{exhibition.artist}</p>
            </div>

            <div>
              <p className="text-muted-foreground">전시 소개</p>
              <p className="mt-1 text-foreground/90">{exhibition.description}</p>
            </div>

            <div className="grid gap-3 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p>{exhibition.venue}</p>
                  <p className="text-muted-foreground">{exhibition.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground shrink-0" />
                <p>
                  {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
                <p>{exhibition.hours}</p>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-muted-foreground shrink-0" />
                <p>{exhibition.price}</p>
              </div>
            </div>

            {exhibition.website && (
              <Button asChild className="w-full mt-4">
                <a href={exhibition.website} target="_blank" rel="noopener noreferrer">
                  웹사이트 방문하기
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
