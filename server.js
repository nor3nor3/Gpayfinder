require('dotenv').config({ path: '.env.local' });
const express = require('express');
const path = require('path');
const app = express();

// 정적 파일 (index.html 등)
app.use(express.static(path.join(__dirname)));

// API 라우트 — api/*.js 핸들러를 그대로 연결
const routes = ['config', 'merchants', 'geocode', 'kakao-search'];
for (const name of routes) {
  const handler = require(`./api/${name}`);
  app.get(`/api/${name}`, handler);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local dev server running at http://localhost:${PORT}`);
});
