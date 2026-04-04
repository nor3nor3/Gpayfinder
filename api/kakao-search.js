// api/kakao-search.js — 카카오 키워드 장소검색 API 프록시 (가게 상세정보)

module.exports = async function handler(req, res) {
  const { query, y, x, radius = '300', size = '1' } = req.query;

  if (!query) return res.status(400).json({ error: 'query 파라미터가 필요합니다.' });

  const key = process.env.KAKAO_REST_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'KAKAO_REST_API_KEY 환경변수가 설정되지 않았습니다.' });
  }

  const params = new URLSearchParams({ query, size });
  if (y) params.set('y', y);
  if (x) params.set('x', x);
  if (radius) params.set('radius', radius);

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?${params}`;

  try {
    const upstream = await fetch(url, {
      headers: { Authorization: `KakaoAK ${key}` },
    });
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `upstream HTTP ${upstream.status}` });
    }
    const data = await upstream.json();
    res.setHeader('Cache-Control', 'public, max-age=1800'); // 30분 캐시
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: '카카오 장소검색 API 호출 실패', detail: err.message });
  }
};
