import { Exhibition } from '@/types/exhibition';

export const mockExhibitions: Exhibition[] = [
  {
    id: '1',
    title: '빛과 공간: 현대 설치미술',
    artist: '김서연',
    venue: '국립현대미술관 서울',
    location: '종로구 삼청로 30',
    category: 'contemporary',
    startDate: '2024-10-15',
    endDate: '2025-02-28',
    description:
      '빛과 공간의 관계를 탐구하는 대규모 설치 미술 전시. 관람객이 작품 속을 직접 걷으며 경험할 수 있는 몰입형 전시입니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1723974591057-ccadada1f283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBleGhpYml0aW9ufGVufDF8fHx8MTc2MjA2NDk3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: '10,000원',
    hours: '화-일 10:00-18:00 (월요일 휴관)',
    website: 'https://mmca.go.kr',
    isFree: false,
  },
  {
    id: '2',
    title: '서울의 시간: 도시 사진 아카이브',
    artist: '박민준',
    venue: '서울시립미술관',
    location: '중구 덕수궁길 61',
    category: 'photography',
    startDate: '2024-11-01',
    endDate: '2025-01-31',
    description:
      '1970년대부터 현재까지 서울의 변화를 기록한 사진 전시. 50년 간의 도시 풍경과 사람들의 이야기를 담았습니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1584966393708-db43bab83773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGV4aGliaXRpb258ZW58MXx8fHwxNzYyMDExODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: '무료',
    hours: '화-금 10:00-20:00, 토-일 10:00-18:00',
    isFree: true,
  },
  {
    id: '3',
    title: '조각의 재해석',
    artist: '이현우',
    venue: '리움미술관',
    location: '용산구 이태원로55길 60-16',
    category: 'sculpture',
    startDate: '2024-09-20',
    endDate: '2025-03-15',
    description:
      '전통 조각 기법과 현대적 해석이 만나는 특별전. 금속, 나무, 돌 등 다양한 재료로 구현된 작품들을 만나보세요.',
    imageUrl:
      'https://images.unsplash.com/photo-1603746315292-61b22b2d5c41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmUlMjBleGhpYml0aW9ufGVufDF8fHx8MTc2MTk3NzI1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: '15,000원',
    hours: '화-일 10:00-18:00',
    website: 'https://leeum.org',
    isFree: false,
  },
  {
    id: '4',
    title: '디지털 드림스케이프',
    artist: '최지훈',
    venue: 'd/p 아트센터',
    location: '성동구 뚝섬로1나길 5',
    category: 'digital',
    startDate: '2024-12-01',
    endDate: '2025-02-15',
    description:
      'AI와 인간의 창의성이 만나는 디지털 아트 전시. 인터랙티브 미디어 작품들을 통해 미래의 예술을 경험하세요.',
    imageUrl:
      'https://images.unsplash.com/photo-1640330273669-44d7c582471c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwZXhoaWJpdGlvbnxlbnwxfHx8MTc2MjA1MzY5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: '12,000원',
    hours: '화-일 11:00-19:00',
    isFree: false,
  },
  {
    id: '5',
    title: '한국 전통 회화의 아름다움',
    artist: '정수진',
    venue: '국립중앙박물관',
    location: '용산구 서빙고로 137',
    category: 'traditional',
    startDate: '2024-10-01',
    endDate: '2025-04-30',
    description:
      '조선시대부터 근대까지의 한국 전통 회화를 한 자리에서 만나볼 수 있는 특별전. 산수화, 인물화, 민화 등 다양한 작품을 소개합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1583101214297-65c6746a7c84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBtdXNldW18ZW58MXx8fHwxNzYxOTc3MjU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: '무료',
    hours: '월-일 10:00-18:00 (수,토 10:00-21:00)',
    website: 'https://museum.go.kr',
    isFree: true,
  },
  {
    id: '6',
    title: '도시의 경계',
    artist: '윤하나',
    venue: '아라리오뮤지엄',
    location: '종로구 율곡로 83',
    category: 'contemporary',
    startDate: '2024-11-15',
    endDate: '2025-01-20',
    description:
      '도시 공간과 개인의 관계를 다루는 현대미술 전시. 회화, 설치, 영상 작품을 통해 현대인의 삶을 조명합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1713779490284-a81ff6a8ffae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NjE5OTMyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: '8,000원',
    hours: '화-일 11:00-19:00',
    isFree: false,
  },
];
