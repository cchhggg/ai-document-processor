/**
 * API 接口层
 */

const express = require('express');
const Orchestrator = require('../services/Orchestrator');

const router = express.Router();
const orchestrator = new Orchestrator();

/**
 * 文档处理接口
 * POST /api/process
 */
router.post('/process', async (req, res) => {
  try {
    const { content, type } = req.body;
    const result = await orchestrator.process(content, type);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 健康检查接口
 */
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
