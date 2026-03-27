export const CODENAME_TABS = [
  '전체',
  '전시/미술',
  '연극',
  '콘서트',
  '뮤지컬/오페라',
  '클래식',
  '축제',
  '교육/체험',
] as const;

export type CodenameTab = (typeof CODENAME_TABS)[number];

export const FESTIVAL_CODENAMES = [
  '축제-문화/예술',
  '축제-시민화합',
  '축제-자연/경관',
  '축제-전통/역사',
];

export const CODENAME_TO_SLUG: Record<CodenameTab, string> = {
  전체: '',
  '전시/미술': 'exhibition',
  연극: 'theater',
  콘서트: 'concert',
  '뮤지컬/오페라': 'musical',
  클래식: 'classic',
  축제: '',
  '교육/체험': 'education',
};

export const SLUG_TO_CODENAME: Record<string, string> = {
  exhibition: '전시/미술',
  theater: '연극',
  concert: '콘서트',
  musical: '뮤지컬/오페라',
  classic: '클래식',

  education: '교육/체험',
};
