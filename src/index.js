/**
 * 项目入口文件
 */

const express = require('express');
const apiRouter = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());
app.use(express.static('public'));

// 路由
app.use('/api', apiRouter);

// 启动服务器
app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
  console.log('[Orchestrator] Multi-Agent system initialized');
});

module.exports = app;
