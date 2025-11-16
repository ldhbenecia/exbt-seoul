import { Exhibition } from '../types/exhibition';
import { Calendar, MapPin } from 'lucide-react';

interface ExhibitionCardProps {
  exhibition: Exhibition;
  onClick: () => void;
}

// ID 기반 일관된 ratio 선택(랜덤 제거로 레이아웃 안정)
const aspectRatios = ['1/1', '3/4', '4/5', '2/3', '5/4', '4/3', '3/2', '5/3', '3/5'];
function pickRatio(id: string) {
  const hash = Array.from(id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return aspectRatios[hash % aspectRatios.length];
}

function formatShort(dateString?: string) {
  if (!dateString) return '-';
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? '-' : `${d.getMonth() + 1}.${d.getDate()}`;
}

function getCodenameLabel(codename?: string) {
  return codename && codename.trim().length > 0 ? codename : '분류 없음';
}

export function ExhibitionCard({ exhibition, onClick }: ExhibitionCardProps) {
  const ratio = pickRatio(exhibition.id);

  const title = exhibition.title || '제목 없음';
  // culturalEventInfo: 출연자정보는 PLAYER, 기관명은 ORG_NAME
  const actorOrOrg = (exhibition.player || exhibition.orgName || '').trim();
  const venue = exhibition.place || '장소 정보 없음';
  const start = formatShort(exhibition.startDate);
  const end = formatShort(exhibition.endDate);
  const image = exhibition.imageUrl || '/placeholder.png';

  return (
    <div
      className="group relative overflow-hidden bg-card transition-all cursor-pointer border-transparent mb-6"
      onClick={onClick}
    >
      <div
        className={`overflow-hidden rounded-xl aspect-[${ratio}]`}
        style={{ aspectRatio: ratio }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full m-auto rounded-xl object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-end p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white/90 text-[11px] px-2 py-0.5 rounded bg-white/10">
              {getCodenameLabel(exhibition.codename)}
            </span>
            {exhibition.isFree && (
              <span className="text-white/90 text-[11px] px-2 py-0.5 rounded bg-green-600/70">
                무료
              </span>
            )}
          </div>

          <h3 className="text-white text-sm sm:text-lg font-semibold line-clamp-2">{title}</h3>
          {actorOrOrg && <p className="text-white/80 text-sm mt-1 line-clamp-1">{actorOrOrg}</p>}

          <div className="text-white/80 text-xs mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="line-clamp-1">{venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>
                {start} - {end}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
