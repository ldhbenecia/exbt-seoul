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

function safeFormatDate(date?: string) {
  if (!date) return '정보 없음';
  const d = new Date(date);
  return isNaN(d.getTime())
    ? '정보 없음'
    : `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function getCodenameLabel(codename?: string) {
  return codename && codename.trim().length > 0 ? codename : '분류 없음';
}

export function ExhibitionDetail({ exhibition, open, onClose }: ExhibitionDetailProps) {
  if (!exhibition) return null;

  const title = exhibition.title || '제목 없음';
  const imageSrc = exhibition.imageUrl || '/placeholder.png';
  const venue = exhibition.place || '장소 정보 없음';
  const gu = exhibition.guname || ''; // 자치구
  const description =
    exhibition.description && exhibition.description.trim().length > 0
      ? exhibition.description
      : `${title} 전시/행사입니다.`;
  const actorOrOrg = ((exhibition.player || '') + ' ' + (exhibition.orgName || '')).trim();
  const hours = exhibition.proTime || exhibition.date || '';
  const price = exhibition.useFee || '';
  const website = exhibition.website || exhibition.hmpgAddr || exhibition.orgLink || '';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-xl lg:max-w-2xl max-h-[90vh] p-8 overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl break-keep w-[90%] sm:max-w-md text-center m-auto">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-lg">
            <img
              src={imageSrc}
              alt={title}
              className="w-full sm:w-2/3 h-full m-auto rounded-lg object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge>{getCodenameLabel(exhibition.codename)}</Badge>
              {exhibition.isFree && <Badge variant="secondary">무료 관람</Badge>}
            </div>

            <div>
              <p className="text-muted-foreground">소개</p>
              <p className="mt-1 text-foreground/90 whitespace-pre-line">{description}</p>
            </div>

            {actorOrOrg && (
              <div>
                <p className="text-muted-foreground">작가/출연·기관</p>
                <p className="mt-1">{actorOrOrg}</p>
              </div>
            )}

            <div className="grid gap-3 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p>{venue}</p>
                  {gu && <p className="text-muted-foreground">{gu}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground shrink-0" />
                <p>
                  {safeFormatDate(exhibition.startDate)} - {safeFormatDate(exhibition.endDate)}
                </p>
              </div>

              {hours && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
                  <p>{hours}</p>
                </div>
              )}

              {price && (
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-muted-foreground shrink-0" />
                  <p>{price}</p>
                </div>
              )}
            </div>

            {website && (
              <Button asChild className="w-full mt-4" size="lg">
                <a href={website} target="_blank" rel="noopener noreferrer">
                  상세 페이지 이동
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
