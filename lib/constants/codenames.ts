export const CODENAME_TABS = [
  '전체',
  '전시/미술',
  '클래식',
  '무용',
  '연극',
  '콘서트',
  '뮤지컬/오페라',
  '국악',
  '교육/체험',
  '영화',
  '축제-문화/예술',
  '축제-시민화합',
  '축제-자연/경관',
  '축제-전통/역사',
  '기타',
] as const;

export type CodenameTab = (typeof CODENAME_TABS)[number];
