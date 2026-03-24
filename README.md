# LLM API Pricing Dashboard

> 🆓 主流大模型 API 价格汇总对比表，支持搜索、筛选、每日自动更新

## ✨ Features

- 📊 **60+ 模型覆盖** - OpenAI / Anthropic / Google / DeepSeek / 字节豆包 / 阿里通义 / 百度文心 / 月之暗面 / 智谱GLM / MiniMax / xAI / Mistral
- 🔍 **快速搜索** - 按模型名或厂商搜索
- 🏷️ **多维筛选** - 按厂商、按类型（对话/推理/多模态/嵌入）
- 📈 **价格可视化** - 绿色/橙色/红色价格等级条
- ⏰ **自动更新** - 每日定时抓取最新价格
- 🌙 **暗黑主题** - 护眼设计

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/llm-pricing.git
cd llm-pricing

# Install dependencies
npm install

# Start the server
node server.js

# Open in browser
open http://localhost:3000
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Main dashboard |
| GET | `/api/status` | Update status |
| POST | `/api/update` | Trigger data refresh |
| GET | `/api/data` | Full data as JSON |

## 🔄 Data Update

### Manual Update
```bash
node update-pricing.js
```

### Auto Update (Cron)
每天 09:00 (Asia/Shanghai) 自动更新：
```bash
# Already configured via cron job
0 9 * * * /usr/bin/node /path/to/llm-pricing/update-pricing.js
```

## 📁 Project Structure

```
llm-pricing/
├── index.html          # Main page
├── data.js             # Pricing data + frontend logic
├── server.js           # Express API server
├── update-pricing.js   # Data fetcher script
├── package.json
├── .gitignore
└── README.md
```

## 🌐 Live Demo

> Coming soon...

## 📝 License

MIT
