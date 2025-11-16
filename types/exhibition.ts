export interface Exhibition {
  id: string;
  codename?: string; // CODENAME (분류)
  guname?: string; // GUNAME (자치구)
  title: string; // TITLE (공연/행사명)
  date?: string; // DATE (문자열)
  place: string; // PLACE (장소)
  orgName?: string; // ORG_NAME (기관명)
  useTarget?: string; // USE_TRGT (이용대상)
  useFee?: string; // USE_FEE (이용요금)
  inquiry?: string; // INQUIRY (문의)
  player?: string; // PLAYER (출연자정보)
  program?: string; // PROGRAM (프로그램소개)
  etcDesc?: string; // ETC_DESC (기타내용)
  orgLink?: string; // ORG_LINK (홈페이지 주소)
  mainImg?: string; // MAIN_IMG (대표이미지)
  rgstDate?: string; // RGSTDATE (신청일)
  ticket?: string; // TICKET (시민/기관)
  startDate?: string; // STRTDATE (시작일)
  endDate?: string; // END_DATE (종료일)
  themeCode?: string; // THEMECODE (테마분류)
  lot?: number; // LOT (경도 Y)
  lat?: number; // LAT (위도 X)
  isFree?: boolean; // IS_FREE (무료/유료)
  hmpgAddr?: string; // HMPG_ADDR (문화포털상세URL)
  proTime?: string; // PRO_TIME (행사시간)

  // UI 표시용 파생 필드
  imageUrl?: string; // 절대 URL로 보정된 이미지
  website?: string; // 상세/기관 링크 통합
  description?: string; // program + etcDesc 결합
}
