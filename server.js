#!/usr/bin/env node
/**
 * LLM Pricing API Server
 * 
 * Serves:
 *   GET /              - Static HTML page
 *   GET /data.js       - Pricing data
 *   GET /api/status    - Last update status
 *   POST /api/update   - Trigger data update (runs update-pricing.js)
 *   GET /api/data      - Latest pricing data as JSON
 */

const express = require('express');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_DIR = __dirname;

// Middleware
app.use(express.json());
app.use(express.static(DATA_DIR));

// CORS for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Load current data metadata
function getDataMeta() {
  try {
    const stats = fs.statSync(path.join(DATA_DIR, 'data.js'));
    return {
      lastModified: stats.mtime.toISOString(),
      lastModifiedLocal: stats.mtime.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    };
  } catch (e) {
    return { lastModified: null, lastModifiedLocal: '未知' };
  }
}

// API: Get status
app.get('/api/status', (req, res) => {
  const meta = getDataMeta();
  
  // Try to load update log
  let logContent = '';
  try {
    const logPath = path.join(DATA_DIR, 'update.log');
    if (fs.existsSync(logPath)) {
      const lines = fs.readFileSync(logPath, 'utf8').trim().split('\n').slice(-5);
      logContent = lines.join('\n');
    }
  } catch (e) {}
  
  res.json({
    status: 'ok',
    lastUpdate: meta.lastModifiedLocal,
    lastUpdateISO: meta.lastModified,
    canUpdate: true,
    log: logContent
  });
});

// API: Trigger update
app.post('/api/update', (req, res) => {
  console.log('[API] Triggering pricing update...');
  
  const updateLog = [];
  const logFile = path.join(DATA_DIR, 'update.log');
  
  function log(msg) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${msg}`;
    updateLog.push(line);
    console.log(msg);
  }
  
  // Run the update script
  const updateProcess = spawn('node', ['update-pricing.js'], {
    cwd: DATA_DIR,
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  let output = '';
  updateProcess.stdout.on('data', (data) => {
    const text = data.toString();
    output += text;
    text.split('\n').forEach(line => {
      if (line.trim()) log(line.trim());
    }
    );
  });
  
  updateProcess.stderr.on('data', (data) => {
    const text = data.toString();
    output += text;
    text.split('\n').forEach(line => {
      if (line.trim() && !line.includes('[INFO]') && !line.includes('[OK]') && !line.includes('[WARN]')) {
        log('[ERR] ' + line.trim());
      }
    });
  });
  
  updateProcess.on('close', (code) => {
    // Save log
    if (output) {
      fs.appendFileSync(logFile, updateLog.join('\n') + '\n');
    }
    
    const meta = getDataMeta();
    res.json({
      success: code === 0,
      exitCode: code,
      lastUpdate: meta.lastModifiedLocal,
      message: code === 0 ? '数据更新成功' : '部分数据更新失败，请查看日志',
      details: output.substring(0, 500)
    });
  });
  
  updateProcess.on('error', (err) => {
    res.status(500).json({
      success: false,
      error: err.message
    });
  });
  
  // Timeout after 60 seconds
  setTimeout(() => {
    if (!updateProcess.killed) {
      updateProcess.kill();
      res.json({
        success: false,
        message: '更新超时（60秒）',
        partial: output.substring(0, 500)
      });
    }
  }, 60000);
});

// API: Get data as JSON (for debugging)
app.get('/api/data', (req, res) => {
  const dataFile = path.join(DATA_DIR, 'data.js');
  try {
    // Extract DATA array from data.js
    const content = fs.readFileSync(dataFile, 'utf8');
    const match = content.match(/const DATA = (\[[\s\S]*?\]);/);
    if (match) {
      res.json({ success: true, count: JSON.parse(match[1]).length, data: JSON.parse(match[1]) });
    } else {
      res.status(500).json({ success: false, error: 'Could not parse DATA' });
    }
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`LLM Pricing Server running at http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/status`);
  console.log(`Update: POST http://localhost:${PORT}/api/update`);
});
