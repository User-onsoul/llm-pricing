const DATA = [
  // ============ 文本对话模型 ============
  // OpenAI
  { provider:'OpenAI', model:'GPT-4.5', type:'chat', input:75, output:150, context:'200K', note:'非推理模型，主打高情商对话，2025年2月发布' },
  { provider:'OpenAI', model:'GPT-4o (2025-03)', type:'chat', input:2.5, output:10, context:'128K', note:'多模态旗舰，支持文本/语音/图像' },
  { provider:'OpenAI', model:'GPT-4o mini', type:'chat', input:0.15, output:0.6, context:'128K', note:'轻量级高速模型' },
  { provider:'OpenAI', model:'o3 (推理)', type:'reasoning', input:2.0, output:8, context:'200K', note:'推理模型，适用于复杂数学/代码问题' },
  { provider:'OpenAI', model:'o3-mini (推理)', type:'reasoning', input:0.55, output:4.4, context:'200K', note:'轻量推理模型' },
  { provider:'OpenAI', model:'o1 (推理)', type:'reasoning', input:15, output:60, context:'128K', note:'早期推理模型' },
  { provider:'OpenAI', model:'GPT-4 Turbo', type:'chat', input:10, output:30, context:'128K', note:'GPT-4 升级版' },
  { provider:'OpenAI', model:'text-embedding-3-small', type:'embedding', input:0.02, output:null, context:'8K', note:'小嵌入模型' },
  { provider:'OpenAI', model:'text-embedding-3-large', type:'embedding', input:0.13, output:null, context:'8K', note:'大嵌入模型' },
  // Anthropic
  { provider:'Anthropic', model:'Claude 3.7 Sonnet', type:'chat', input:3, output:15, context:'200K', note:'2025年2月发布，业界顶级对话模型' },
  { provider:'Anthropic', model:'Claude 3.5 Sonnet', type:'chat', input:3, output:15, context:'200K', note:'性价比旗舰，适合复杂任务' },
  { provider:'Anthropic', model:'Claude 3.5 Haiku', type:'chat', input:0.8, output:4, context:'200K', note:'极速轻量模型' },
  { provider:'Anthropic', model:'Claude 3 Opus', type:'chat', input:15, output:75, context:'200K', note:'旗舰大杯，适合高精度任务' },
  { provider:'Anthropic', model:'Claude 3 Sonnet', type:'chat', input:3, output:15, context:'200K', note:'中杯旗舰' },
  { provider:'Anthropic', model:'Claude 3 Haiku', type:'chat', input:0.25, output:1.25, context:'200K', note:'轻量模型' },
  // Google
  { provider:'Google', model:'Gemini 2.5 Pro', type:'chat', input:1.25, output:5, context:'1M', note:'2025年3月发布，上下文达1M tokens' },
  { provider:'Google', model:'Gemini 2.0 Flash', type:'chat', input:0.10, output:0.4, context:'1M', note:'超低价格，支持1M上下文' },
  { provider:'Google', model:'Gemini 2.0 Flash-Lite', type:'chat', input:0.075, output:0.3, context:'1M', note:'最便宜的Gemini模型' },
  { provider:'Google', model:'Gemini 1.5 Pro', type:'chat', input:1.25, output:5, context:'2M', note:'超长上下文（2M tokens）' },
  { provider:'Google', model:'Gemini 1.5 Flash', type:'chat', input:0.075, output:0.3, context:'1M', note:'轻量高性价比' },
  { provider:'Google', model:'Gemini 1.5 Flash-8B', type:'chat', input:0.0375, output:0.15, context:'1M', note:'最小号Flash' },
  // DeepSeek
  { provider:'DeepSeek', model:'DeepSeek V3', type:'chat', input:0.27, output:1.1, context:'64K', note:'2025年1月发布，开源模型' },
  { provider:'DeepSeek', model:'DeepSeek R1 (推理)', type:'reasoning', input:0.55, output:2.19, context:'64K', note:'推理模型，开源' },
  { provider:'DeepSeek', model:'DeepSeek R1 蒸馏版', type:'reasoning', input:0, output:0, context:'8K', note:'Qwen等蒸馏版本，开源免费' },
  { provider:'DeepSeek', model:'DeepSeek Coder', type:'chat', input:0.27, output:1.1, context:'64K', note:'代码专用模型' },
  { provider:'DeepSeek', model:'text-embedding-3', type:'embedding', input:0.11, output:null, context:'4K', note:'嵌入模型' },
  // 字节
  { provider:'字节', model:'Doubao-pro-32k', type:'chat', input:0.3, output:0.9, context:'32K', note:'火山引擎豆包，32K上下文' },
  { provider:'字节', model:'Doubao-pro-128k', type:'chat', input:0.8, output:2.4, context:'128K', note:'128K长上下文' },
  { provider:'字节', model:'Doubao-thinking-pro', type:'reasoning', input:0.8, output:2.4, context:'128K', note:'推理模型' },
  { provider:'字节', model:'Doubao-embedding', type:'embedding', input:0.1, output:null, context:'128K', note:'嵌入模型' },
  // 阿里
  { provider:'阿里', model:'Qwen2.5-72B-Instruct', type:'chat', input:0.36, output:0.72, context:'32K', note:'阿里通义千问' },
  { provider:'阿里', model:'Qwen2.5-7B-Instruct', type:'chat', input:0.09, output:0.18, context:'32K', note:'小参数，高性价比' },
  { provider:'阿里', model:'Qwen-Max', type:'chat', input:1.0, output:4.0, context:'32K', note:'旗舰模型' },
  { provider:'阿里', model:'Qwen-Coder-32B', type:'chat', input:0.36, output:0.72, context:'32K', note:'代码专用模型' },
  { provider:'阿里', model:'text-embedding-v3', type:'embedding', input:0.05, output:null, context:'8K', note:'通义 embedding' },
  // 百度
  { provider:'百度', model:'ERNIE 4.0 Turbo', type:'chat', input:0.6, output:1.2, context:'32K', note:'文心一言旗舰' },
  { provider:'百度', model:'ERNIE 3.5 Pro', type:'chat', input:0.24, output:0.48, context:'32K', note:'性价比款' },
  { provider:'百度', model:'ERNIE-Speed', type:'chat', input:0.03, output:0.06, context:'32K', note:'超低价格' },
  // 月之暗面
  { provider:'月之暗面', model:'Moonshot V2', type:'chat', input:0.6, output:1.2, context:'200K', note:'支持200K超长上下文' },
  { provider:'月之暗面', model:'Moonshot V1.5', type:'chat', input:0.9, output:1.8, context:'200K', note:'长思考版' },
  { provider:'月之暗面', model:'Moonshot V1', type:'chat', input:0.3, output:0.6, context:'200K', note:'早期版本' },
  // 智谱
  { provider:'智谱', model:'GLM-4-Plus', type:'chat', input:1.0, output:1.0, context:'128K', note:'旗舰模型，输入输出同价' },
  { provider:'智谱', model:'GLM-4V-Plus', type:'vision', input:1.0, output:1.0, context:'2K', note:'多模态视觉模型' },
  { provider:'智谱', model:'GLM-4-Flash', type:'chat', input:0.01, output:0.01, context:'128K', note:'极低价格，Flash版' },
  { provider:'智谱', model:'GLM-4', type:'chat', input:0.06, output:0.06, context:'128K', note:'标准版' },
  { provider:'智谱', model:'text-embedding-3', type:'embedding', input:0.05, output:null, context:'512K', note:'嵌入模型' },
  // MiniMax
  { provider:'MiniMax', model:'MiniMax-Text-01', type:'chat', input:0.2, output:1.1, context:'1000K', note:'支持1M上下文' },
  { provider:'MiniMax', model:'abab6.5s-chat', type:'chat', input:0.1, output:0.1, context:'32K', note:'高速对话模型' },
  // xAI
  { provider:'xAI', model:'Grok-2', type:'chat', input:5.0, output:15, context:'128K', note:'xAI Grok 2代' },
  { provider:'xAI', model:'Grok-1', type:'chat', input:5.0, output:15, context:'128K', note:'Grok 初代' },
  { provider:'xAI', model:'Grok-2-Mini', type:'chat', input:0.3, output:0.9, context:'128K', note:'轻量版 Grok' },
  // Mistral
  { provider:'Mistral', model:'Mistral Large 2', type:'chat', input:2.0, output:6.0, context:'128K', note:'Mistral 旗舰' },
  { provider:'Mistral', model:'Mistral Nemo', type:'chat', input:0.15, output:0.15, context:'128K', note:'开源中杯' },
  { provider:'Mistral', model:'Mixtral-8x7B', type:'chat', input:0.24, output:0.24, context:'32K', note:'开源MoE模型' },
  // Cohere
  { provider:'Cohere', model:'Command R+', type:'chat', input:3.0, output:15, context:'128K', note:'RAG优化模型' },
  { provider:'Cohere', model:'Command R', type:'chat', input:0.5, output:1.5, context:'128K', note:'RAG优化轻量版' },
  { provider:'Cohere', model:'Embed-v3.0', type:'embedding', input:0.05, output:null, context:'4K', note:'最新嵌入模型' },

  // ============ 视频生成模型 ============
  // OpenAI
  { provider:'OpenAI', model:'Sora 2', type:'video', input:0.10, output:null, context:'20s/次', note:'文生视频，$0.10/秒，按秒计费' },
  // Runway
  { provider:'Runway', model:'Gen-3 Alpha Turbo', type:'video', input:0.05, output:null, context:'5 credits/s', note:'$0.01/credit × 5 credits/秒' },
  { provider:'Runway', model:'Gen-3 Alpha', type:'video', input:0.15, output:null, context:'5 credits/s', note:'标准版，比Turbo更慢但质量更高' },
  // MiniMax
  { provider:'MiniMax', model:'abab-video-1', type:'video', input:0.05, output:null, context:'6s/次', note:'最高支持6秒，1280x720@25fps' },
  // 海螺 AI（字节）
  { provider:'字节', model:'Seaweed-文生视频', type:'video', input:0.10, output:null, context:'5s/次', note:'即梦/Seaweed视频生成API' },
  // 智谱
  { provider:'智谱', model:'CogVideoX', type:'video', input:0.02, output:null, context:'6s/次', note:'开源视频生成模型' },
  // 通义
  { provider:'阿里', model:'Qwen-Video-72B', type:'video', input:0.50, output:null, context:'6s/次', note:'通义千问视频生成' },
  // Pixverse
  { provider:'Pixverse', model:'PixVerse V3', type:'video', input:0.03, output:null, context:'4s/次', note:'国产视频生成，支持多种风格' },

  // ============ 音频模型 ============
  // OpenAI 语音
  { provider:'OpenAI', model:'Whisper (STT)', type:'audio', input:0.006, output:null, context:'$/分钟', note:'语音转文字，$0.006/分钟' },
  { provider:'OpenAI', model:'TTS-1 (HD)', type:'audio', input:15.0, output:null, context:'$/1M字符', note:'文字转语音，$15/百万字符' },
  { provider:'OpenAI', model:'TTS-1 (标准)', type:'audio', input:3.0, output:null, context:'$/1M字符', note:'TTS标准版，$3/百万字符' },
  // Eleven Labs
  { provider:'ElevenLabs', model:'Eleven Turbo v2', type:'audio', input:0.30, output:null, context:'$/1K字符', note:'超低延迟语音合成' },
  { provider:'ElevenLabs', model:'Eleven Multilingual v2', type:'audio', input:0.60, output:null, context:'$/1K字符', note:'多语言语音合成，专业版' },
  // 字节豆包
  { provider:'字节', model:'Doubao-TTS (极速)', type:'audio', input:0.15, output:null, context:'$/1K字符', note:'火山引擎TTS，极速版' },
  { provider:'字节', model:'Doubao-TTS (基础)', type:'audio', input:0.05, output:null, context:'$/1K字符', note:'火山引擎TTS，基础版' },
  // 阿里
  { provider:'阿里', model:'CosyVoice (开源)', type:'audio', input:0, output:null, context:'免费', note:'阿里开源语音合成，自部署免费' },
  // 海螺AI
  { provider:'MiniMax', model:'Speech-02 TTS', type:'audio', input:1.0, output:null, context:'$/1K字符', note:'MiniMax 高质量语音合成' },
  // 讯飞
  { provider:'讯飞', model:'讯飞听见 TTS', type:'audio', input:0.50, output:null, context:'$/1K字符', note:'讯飞语音合成API' },
  // 微软 Azure
  { provider:'微软', model:'Azure TTS (神经)', type:'audio', input:16.0, output:null, context:'$/1M字符', note:'Azure 神经语音' },
  // 海螺音频
  { provider:'字节', model:'Seaweed-音频生成', type:'audio', input:0.20, output:null, context:'$/秒', note:'文生音频/音效生成' },

  // ============ 图像生成模型 ============
  // OpenAI
  { provider:'OpenAI', model:'DALL-E 3 (标准)', type:'image', input:0.04, output:null, context:'$/张', note:'标准质量，1024x1024' },
  { provider:'OpenAI', model:'DALL-E 3 (高清)', type:'image', input:0.08, output:null, context:'$/张', note:'HD高清质量' },
  { provider:'OpenAI', model:'DALL-E 2', type:'image', input:0.02, output:null, context:'$/张', note:'可一次生成10张图' },
  // Midjourney
  { provider:'Midjourney', model:'Midjourney v6 (订阅)', type:'image', input:10.0, output:null, context:'$/月', note:'Basic计划，约200张图/月' },
  { provider:'Midjourney', model:'Midjourney v6 (标准)', type:'image', input:30.0, output:null, context:'$/月', note:'Standard计划，无限生成' },
  { provider:'Midjourney', model:'Midjourney v6 (专业)', type:'image', input:60.0, output:null, context:'$/月', note:'Pro计划，快3倍' },
  { provider:'Midjourney', model:'Midjourney API (三方)', type:'image', input:0.05, output:null, context:'$/张', note:'第三方平台API，约$0.05/张' },
  // Stable Diffusion
  { provider:'Stability AI', model:'Stable Diffusion 3 (API)', type:'image', input:0.003, output:null, context:'$/张', note:'SD3 Medium，按张计费' },
  { provider:'Stability AI', model:'Stable Diffusion XL', type:'image', input:0, output:null, context:'免费', note:'开源免费，自部署' },
  { provider:'Stability AI', model:'Stable Diffusion 3 (开源)', type:'image', input:0, output:null, context:'免费', note:'SD3 完全开源免费' },
  // Adobe
  { provider:'Adobe', model:'Firefly 3 (标准)', type:'image', input:4.0, output:null, context:'$/100张', note:'100 credits/月起' },
  { provider:'Adobe', model:'Firefly 3 (创意)', type:'image', input:14.99, output:null, context:'$/月', note:'月度1000 credits' },
  // Flux (Black Forest Labs)
  { provider:'Flux', model:'Flux Pro (API)', type:'image', input:0.05, output:null, context:'$/张', note:'Black Forest Labs旗舰图像模型' },
  { provider:'Flux', model:'Flux Dev (API)', type:'image', input:0.02, output:null, context:'$/张', note:'开发者版' },
  { provider:'Flux', model:'Flux Schnell (API)', type:'image', input:0.003, output:null, context:'$/张', note:'极速版，1-4步生成' },
  { provider:'Flux', model:'Flux (开源)', type:'image', input:0, output:null, context:'免费', note:'Flux 开源版本可自部署' },
  // 字节即梦
  { provider:'字节', model:'即梦 2.0 (标准)', type:'image', input:0.10, output:null, context:'$/张', note:'国内版DALL-E，支持中文' },
  { provider:'字节', model:'即梦 2.0 Pro', type:'image', input:0.30, output:null, context:'$/张', note:'高清图像生成' },
  // 通义万相
  { provider:'阿里', model:'通义万相 Wan2.1', type:'image', input:0, output:null, context:'免费', note:'阿里开源图像模型' },
  { provider:'阿里', model:'通义万相 (API)', type:'image', input:0.02, output:null, context:'$/张', note:'通过阿里云API调用' },
  // 百度文心
  { provider:'百度', model:'文心一格', type:'image', input:0.05, output:null, context:'$/张', note:'百度文生图，支持多种风格' },
  // 智谱 Cogview
  { provider:'智谱', model:'Cogview 3', type:'image', input:0.01, output:null, context:'$/张', note:'智谱图像生成模型' },
  // 海螺AI
  { provider:'MiniMax', model:'MiniMax Image-01', type:'image', input:0.02, output:null, context:'$/张', note:'MiniMax图像生成' },
  // Ideogram
  { provider:'Ideogram', model:'Ideogram 2.0', type:'image', input:0.01, output:null, context:'$/张', note:'文字生成能力强' },
  // Leonardo AI
  { provider:'Leonardo.ai', model:'Leonardo Phoenix', type:'image', input:0.006, output:null, context:'$/张', note:'约0.6分/张，每日150张免费' },
  // 堆友 (阿里)
  { provider:'阿里', model:'堆友 AI', type:'image', input:0, output:null, context:'免费', note:'阿里妈妈设计师工具，免费' },
];

const MAX_P = 150;

function pClass(v) {
  if (v === null || v === undefined) return 'price-na';
  if (v === 0) return 'price-free';
  if (v <= 0.3) return 'price-low';
  if (v <= 3) return 'price-mid';
  return 'price-high';
}

function barClass(v) {
  if (v === 0) return 'g';
  if (v <= 0.3) return 'g';
  if (v <= 3) return 'o';
  return 'r';
}

function fmt(v) {
  if (v === null || v === undefined) return '-';
  if (v === 0) return '免费';
  return '$' + v.toFixed(v < 1 ? 4 : 2);
}

function barWidth(v) {
  if (!v) return 0;
  return Math.min((v / MAX_P) * 100, 100);
}

const typeLabel = { chat:'文本', reasoning:'推理', vision:'视觉', embedding:'嵌入', image:'图像', video:'视频', audio:'音频' };
const typeBadge = { chat:'badge-chat', reasoning:'badge-reasoning', vision:'badge-vision', embedding:'badge-embedding', image:'badge-image', video:'badge-video', audio:'badge-audio' };

function getBarLabel(v) {
  if (!v) return '';
  if (v === 0) return '免';
  if (v <= 0.3) return '极低';
  if (v <= 3) return '中';
  return '高';
}

function render(data) {
  const tbody = document.getElementById('tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(function(m) {
    var b = barClass(m.input);
    var bw = barWidth(m.input);
    var outClass = m.output === null ? 'price-na' : (m.output === 0 ? 'price-free' : pClass(m.output));
    var outFmt = m.output === null ? '-' : fmt(m.output);
    var badgeClass = typeBadge[m.type] || 'badge-chat';
    var badgeText = typeLabel[m.type] || m.type;
    var barLabel = getBarLabel(m.input);

    return '<tr>' +
      '<td><strong>' + m.provider + '</strong></td>' +
      '<td class="model-cell"><strong>' + m.model + '</strong></td>' +
      '<td><span class="badge ' + badgeClass + '">' + badgeText + '</span></td>' +
      '<td class="price-cell ' + pClass(m.input) + '">' + fmt(m.input) + '</td>' +
      '<td>' +
        '<div class="bar-wrap">' +
          '<div class="bar-track"><div class="bar-fill ' + b + '" style="width:' + bw + '%"></div></div>' +
          '<span class="bar-label">' + barLabel + '</span>' +
        '</div>' +
      '</td>' +
      '<td class="price-cell ' + outClass + '">' + outFmt + '</td>' +
      '<td class="context-cell">' + m.context + '</td>' +
      '<td class="note-cell">' + m.note + '</td>' +
    '</tr>';
  }).join('');
}

render(DATA);

// Filters
var curProvider = 'all';
var curType = 'all';
var curSearch = '';

document.querySelectorAll('.filter-btn[data-filter]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn[data-filter]').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    curProvider = btn.dataset.filter;
    applyFilters();
  });
});

document.querySelectorAll('.type-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.type-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    curType = btn.dataset.type;
    applyFilters();
  });
});

document.getElementById('searchInput').addEventListener('input', function(e) {
  curSearch = e.target.value.toLowerCase();
  applyFilters();
});

function applyFilters() {
  var filtered = DATA.filter(function(m) {
    var matchProv = curProvider === 'all' || m.provider === curProvider;
    var matchType = curType === 'all' || m.type === curType;
    var matchSearch = !curSearch || m.model.toLowerCase().indexOf(curSearch) !== -1 || m.provider.toLowerCase().indexOf(curSearch) !== -1;
    return matchProv && matchType && matchSearch;
  });
  render(filtered);
}

// ===== Update functionality =====
var lastUpdatedEl = document.getElementById('lastUpdated');
var refreshBtn = document.getElementById('refreshBtn');
var refreshText = refreshBtn ? refreshBtn.querySelector('.refresh-text') : null;
var refreshIcon = refreshBtn ? refreshBtn.querySelector('.refresh-icon') : null;

// Display last updated time
function updateLastUpdatedDisplay(timestamp) {
  if (lastUpdatedEl && timestamp) {
    var date = new Date(timestamp);
    var local = date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    lastUpdatedEl.innerHTML = '<span style="color:var(--green)">●</span> 数据更新于 ' + local + ' · <a href="http://localhost:3000/api/update" target="_blank" style="color:var(--accent)">API</a>';
  }
}

// Load saved timestamp from localStorage
var savedTimestamp = localStorage.getItem('llm-pricing-updated');
if (savedTimestamp) {
  updateLastUpdatedDisplay(savedTimestamp);
} else {
  // Try to fetch from API
  fetch('http://localhost:3000/api/status', { method: 'GET', cache: 'no-cache' })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.lastUpdateISO) {
        localStorage.setItem('llm-pricing-updated', data.lastUpdateISO);
        updateLastUpdatedDisplay(data.lastUpdateISO);
      }
    })
    .catch(function() {});
}

// Refresh button handler
if (refreshBtn) {
  refreshBtn.addEventListener('click', function() {
    if (refreshBtn.classList.contains('loading')) return;

    refreshBtn.classList.add('loading');
    if (refreshText) refreshText.textContent = '更新中...';

    fetch('http://localhost:3000/api/update', { method: 'POST' })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.success) {
          localStorage.setItem('llm-pricing-updated', new Date().toISOString());
          updateLastUpdatedDisplay(new Date().toISOString());

          // Reload the page to get new data
          setTimeout(function() { location.reload(); }, 500);
        } else {
          if (lastUpdatedEl) {
            lastUpdatedEl.innerHTML = '<span style="color:var(--red)">●</span> 更新失败: ' + (data.message || data.error) + ' · <a href="http://localhost:3000/api/update" target="_blank" style="color:var(--accent)">查看详情</a>';
          }
        }
      })
      .catch(function(err) {
        if (lastUpdatedEl) {
          lastUpdatedEl.innerHTML = '<span style="color:var(--orange)">●</span> 更新服务未启动（请运行 node server.js） · <a href="http://localhost:3000/api/update" target="_blank" style="color:var(--accent)">手动更新</a>';
        }
      })
      .finally(function() {
        refreshBtn.classList.remove('loading');
        if (refreshText) refreshText.textContent = '刷新数据';
      });
  });
}
