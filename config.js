// ============================================================
// config.js — API 키 설정 파일
// 이 파일에 발급받은 API 키를 입력하세요.
// 절대 Git에 커밋하거나 외부에 공개하지 마세요.
// ============================================================

const CONFIG = {
  // ── 네이버 지도 JS SDK Client ID ──────────────────────────
  // NCP 콘솔: https://console.ncloud.com/
  // Application 등록 후 Web Service URL에 사용 도메인 추가 필요
  // 로컬 실행 시: http://localhost 또는 파일 경로 등록
  NAVER_MAP_CLIENT_ID: 'YOUR_NAVER_MAP_CLIENT_ID',

  // ── 카카오 REST API 키 ────────────────────────────────────
  // Kakao Developers: https://developers.kakao.com/
  // 앱 키 → REST API 키
  // 플랫폼 → Web → 사이트 도메인에 사용 URL 등록 필요
  // (로컬: http://localhost, 파일 직접 실행 시 http://localhost 로컬 서버 권장)
  KAKAO_REST_API_KEY: 'YOUR_KAKAO_REST_API_KEY',

  // ── 경기데이터드림 / 공공데이터포털 인증키 ──────────────────
  // 경기데이터드림: https://openapi.gg.go.kr/
  // 또는 공공데이터포털: https://www.data.go.kr/
  // 서비스명: 경기도_지역화폐가맹점 (RegionMnyFacltStus)
  GGDATA_API_KEY: 'YOUR_GGDATA_API_KEY',

  // ── 기본 시군 설정 ────────────────────────────────────────
  // 초기 로드할 시군명 (예: '수원시', '성남시', '용인시')
  DEFAULT_SIGUN: '수원시',

  // ── CORS 프록시 설정 ──────────────────────────────────────
  // 공공데이터 API는 브라우저에서 직접 호출 시 CORS 오류 발생.
  // 아래 중 하나를 선택하거나 빈 문자열('')로 두면 직접 호출 시도.
  //
  // [옵션 1] corsproxy.io (응답 그대로 반환):
  //   CORS_PROXY: 'https://corsproxy.io/?'
  //
  // [옵션 2] allorigins.win (응답을 {contents:"..."} 로 래핑):
  //   CORS_PROXY: 'https://api.allorigins.win/get?url='
  //
  // [옵션 3] 직접 호출 (서버 환경 또는 CORS 허용된 경우):
  //   CORS_PROXY: ''
  CORS_PROXY: 'https://corsproxy.io/?',
};
