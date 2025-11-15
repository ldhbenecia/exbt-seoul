import { Exhibition } from '../types/exhibition';
import { Badge } from './ui/badge';
import { Calendar, MapPin } from 'lucide-react';

interface ExhibitionCardProps {
  exhibition: Exhibition;
  onClick: () => void;
}

// 카드마다 랜덤한 높이를 위한 aspect ratio 배열
// const aspectRatios = ['3/4', '1/1', '4/5', '4/3', '5/4', '3/2'];

const aspectRatios = [
  '1/1', // 정사각형
  '3/4', // 세로형
  '4/5', // 세로형
  '2/3', // 세로형
  '5/4', // 가로형
  '4/3', // 가로형
  '3/2', // 가로형
  // '16/9', // 와이드형
  // '9/16', // 세로 와이드
  '5/3', // 약간 와이드
  '3/5', // 약간 세로
];

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
  // const aspectRatio =
  //   aspectRatios[parseInt(exhibition.id) % aspectRatios.length];

  const aspectRatio =
    aspectRatios[Math.floor(Math.random() * aspectRatios.length)];

  return (
    <div
      className="group relative overflow-hidden bg-card transition-all cursor-pointer border-transparent mb-6"
      onClick={onClick}
    >
      <div
        className={`overflow-hidden rounded-xl aspect-[${aspectRatio}]`}
        style={{ aspectRatio }}
      >
        <img
          src={exhibition.imageUrl}
          alt={exhibition.title}
          className="w-full h-full m-auto rounded-xl object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-end p-4">
          <h3 className="text-white text-sm sm:text-lg font-semibold">
            {exhibition.title}
          </h3>
          <p className="text-white/80 text-sm mt-1">{exhibition.artist}</p>
          <div className="text-white/80 text-xs mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{exhibition.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>
                {formatDate(exhibition.startDate)} -{' '}
                {formatDate(exhibition.endDate)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
