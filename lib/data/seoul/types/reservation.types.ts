export type SeoulReservationRawRow = {
  SVCID?: string; // 서비스ID
  MAXCLASSNM?: string; // 대분류명
  MINCLASSNM?: string; // 소분류명
  SVCSTATNM?: string; // 서비스상태 (접수중, 마감 등)
  SVCNM?: string; // 서비스명
  PAYATNM?: string; // 결제방법 (유료/무료)
  PLACENM?: string; // 장소명
  USETGTINFO?: string; // 이용대상
  SVCURL?: string; // 바로가기URL
  X?: string; // 경도
  Y?: string; // 위도
  SVCOPNBGNDT?: string; // 접수시작일시
  SVCOPNENDDT?: string; // 접수종료일시
  RCPTBGNDT?: string; // 이용시작일
  RCPTENDDT?: string; // 이용종료일
  AREANM?: string; // 지역명
  IMGURL?: string; // 이미지URL
  DTLCONT?: string; // 상세내용
  TELNO?: string; // 전화번호
  V_MIN?: string; // 이용요금(최소)
  V_MAX?: string; // 이용요금(최대)
};
