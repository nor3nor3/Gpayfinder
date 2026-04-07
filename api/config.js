// api/config.js — 브라우저에 안전하게 노출할 공개 설정값 반환
// KAKAO_REST_API_KEY, GGDATA_API_KEY 는 절대 여기서 반환하지 않음

module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=3600');

  const clientId = process.env.NAVER_MAP_CLIENT_ID;
  const defaultSigun = process.env.DEFAULT_SIGUN || '수원시';

  if (!clientId) {
    return res.status(500).json({ error: 'NAVER_MAP_CLIENT_ID 환경변수가 설정되지 않았습니다.' });
  }

  res.json({ naverMapClientId: clientId, defaultSigun });
};
