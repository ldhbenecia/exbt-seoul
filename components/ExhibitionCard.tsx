import { Exhibition } from '../types/exhibition';
import { Badge } from './ui/badge';
import { Calendar, MapPin } from 'lucide-react';

interface ExhibitionCardProps {
  exhibition: Exhibition;
  onClick: () => void;
}

// 카드마다 랜덤한 높이를 위한 aspect ratio 배열
const aspectRatios = ['3/4', '4/5', '1/1', '4/3', '5/4', '3/2'];

export function ExhibitionCard({ exhibition, onClick }: ExhibitionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}.${date.getDate()}`;
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

  // 전시회 ID를 기반으로 일관된 aspect ratio 선택
  const aspectRatio = aspectRatios[parseInt(exhibition.id) % aspectRatios.length];

  return (
    <div 
      className="group overflow-hidden bg-card hover:bg-accent/50 transition-all cursor-pointer border-transparent rounded-xl mb-4"
      onClick={onClick}
    >
      <div className={`overflow-hidden aspect-[${aspectRatio}]`} style={{ aspectRatio }}>
        <img
          src={exhibition.imageUrl}
          alt={exhibition.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {exhibition.title}
            </h3>
            <p className="text-muted-foreground mt-1">{exhibition.artist}</p>
          </div>
          {exhibition.isFree && (
            <Badge variant="secondary" className="shrink-0">무료</Badge>
          )}
        </div>
        
        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="line-clamp-1">{exhibition.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>
              {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
