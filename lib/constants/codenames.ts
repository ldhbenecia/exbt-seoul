export const CODENAME_TABS = [
  '전체',
  '전시/미술',
  '교육/체험',
  '클래식',
  '콘서트',
  '국악',
  '연극',
  '뮤지컬/오페라',
  '무용',
  '독주/독창회',
  '영화',
  '축제',
  '기타',
] as const;

export type CodenameTab = (typeof CODENAME_TABS)[number];

export const FESTIVAL_PREFIX = '축제-';

export const CODENAME_TO_SLUG: Record<CodenameTab, string> = {
  전체: '',
  '전시/미술': 'exhibition',
  '교육/체험': 'education',
  클래식: 'classic',
  콘서트: 'concert',
  국악: 'gugak',
  연극: 'theater',
  '뮤지컬/오페라': 'musical',
  무용: 'dance',
  '독주/독창회': 'solo',
  영화: 'film',
  축제: 'festival',
  기타: 'etc',
};

export const SLUG_TO_CODENAME: Record<string, string> = {
  exhibition: '전시/미술',
  education: '교육/체험',
  classic: '클래식',
  concert: '콘서트',
  gugak: '국악',
  theater: '연극',
  musical: '뮤지컬/오페라',
  dance: '무용',
  solo: '독주/독창회',
  film: '영화',
  festival: '__festival__',
  etc: '기타',
};
