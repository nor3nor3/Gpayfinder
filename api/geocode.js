// api/geocode.js — 카카오 주소검색 API 프록시 (주소 → 좌표)

module.exports = async function handler(req, res) {
  const { query } = req.query;

  if (!query) return res.status(400).json({ error: 'query 파라미터가 필요합니다.' });

  const key = process.env.KAKAO_REST_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'KAKAO_REST_API_KEY 환경변수가 설정되지 않았습니다.' });
  }

  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`;

  try {
    const upstream = await fetch(url, {
      headers: { Authorization: `KakaoAK ${key}` },
    });
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `upstream HTTP ${upstream.status}` });
    }
    const data = await upstream.json();
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 24시간 캐시 (주소-좌표는 잘 안 바뀜)
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: '카카오 geocoding API 호출 실패', detail: err.message });
  }
};
