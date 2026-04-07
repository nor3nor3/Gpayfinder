// api/merchants.js — 경기도 공공데이터 가맹점 API 프록시
// GGDATA_API_KEY 는 서버 환경변수에만 존재, 브라우저에 노출되지 않음

module.exports = async function handler(req, res) {
  const { sigunNm = '수원시', page = '1', pageSize = '1000' } = req.query;

  const key = process.env.GGDATA_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'GGDATA_API_KEY 환경변수가 설정되지 않았습니다.' });
  }

  // 입력값 검증
  const pageNum = Math.max(1, Math.min(parseInt(page, 10) || 1, 100));
  const pageSz  = Math.max(1, Math.min(parseInt(pageSize, 10) || 1000, 1000));

  const url =
    `https://openapi.gg.go.kr/RegionMnyFacltStus` +
    `?KEY=${encodeURIComponent(key)}` +
    `&Type=json` +
    `&pIndex=${pageNum}` +
    `&pSize=${pageSz}` +
    `&SIGUN_NM=${encodeURIComponent(sigunNm)}`;

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `upstream HTTP ${upstream.status}` });
    }
    const data = await upstream.json();
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1시간 캐시 (월 1회 갱신 데이터)
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: '공공데이터 API 호출 실패', detail: err.message });
  }
};
