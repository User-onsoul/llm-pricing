#!/usr/bin/env node
/**
 * LLM Pricing Data Updater
 * 
 * Fetches latest pricing from official sources and updates data.js
 * Run manually: node update-pricing.js
 * Or set up a cron job for automatic updates
 * 
 * Cron example (daily at 9 AM):
 * 0 9 * * * /usr/bin/node /Users/air/.qclaw/workspace/llm-pricing/update-pricing.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Color output
const log = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  success: (msg) => console.log(`[OK] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${msg}`)
};

// Fetch URL content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Extract price from text using regex patterns
function extractPrice(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return parseFloat(match[1]);
  }
  return null;
}

// Parse OpenAI pricing page
async function getOpenAIPricing() {
  try {
    log.info('Fetching OpenAI pricing...');
    const html = await fetchUrl('https://openai.com/api/pricing/');
    
    const prices = {};
    
    // GPT-4.5
    const gpt45Input = extractPrice(html, [/gpt-4\.5[\s\S]{0,500}?\$([\d.]+)\s*per\s*1m\s*input/i]);
    const gpt45Output = extractPrice(html, [/gpt-4\.5[\s\S]{0,500}?\$([\d.]+)\s*per\s*1m\s*output/i]);
    if (gpt45Input) prices['GPT-4.5'] = { input: gpt45Input, output: gpt45Output || gpt45Input * 2 };
    
    // GPT-4o
    const gpt4oInput = extractPrice(html, [/gpt-4o[\s\S]{0,500}?\$([\d.]+)\s*per\s*1m\s*input/i]);
    const gpt4oOutput = extractPrice(html, [/gpt-4o[\s\S]{0,500}?\$([\d.]+)\s*per\s*1m\s*output/i]);
    if (gpt4oInput) prices['GPT-4o'] = { input: gpt4oInput, output: gpt4oOutput || gpt4oInput * 4 };
    
    // o3
    const o3Input = extractPrice(html, [/o3[\s\S]{0,500}?\$([\d.]+)\s*per\s*1m\s*input/i]);
    const o3Output = extractPrice(html, [/o3[\s\S]{0,500}?\$([\d.]+)\s*per\s*1m\s*output/i]);
    if (o3Input) prices['o3'] = { input: o3Input, output: o3Output || o3Input * 4 };
    
    // o3-mini
    const o3MiniInput = extractPrice(html, [/o3-mini[\s\S]{0,500}?\$([\d.]+)\s*per\s*1m\s*input/i]);
    const o3MiniOutput = extractPrice(html, [/o3-mini[\s\S]{0,500}?\$([\d.]+)\s*per\s*1m\s*output/i]);
    if (o3MiniInput) prices['o3-mini'] = { input: o3MiniInput, output: o3MiniOutput || o3MiniInput * 8 };
    
    log.success(`OpenAI: ${Object.keys(prices).join(', ')}`);
    return prices;
  } catch (e) {
    log.warn(`OpenAI pricing fetch failed: ${e.message}`);
    return {};
  }
}

// Parse Anthropic pricing page
async function getAnthropicPricing() {
  try {
    log.info('Fetching Anthropic pricing...');
    const html = await fetchUrl('https://www.anthropic.com/api/pricing');
    
    const prices = {};
    const models = ['Claude 3.7 Sonnet', 'Claude 3.5 Sonnet', 'Claude 3.5 Haiku', 'Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku'];
    
    for (const model of models) {
      const inputMatch = html.match(new RegExp(`${model}[\\s\\S]{0,300}?\\$([\\d.]+)\\s*per\\s*million\\s*tokens\\s*input`, 'i'));
      const outputMatch = html.match(new RegExp(`${model}[\\s\\S]{0,300}?\\$([\\d.]+)\\s*per\\s*million\\s*tokens\\s*output`, 'i'));
      if (inputMatch) {
        prices[model] = {
          input: parseFloat(inputMatch[1]),
          output: outputMatch ? parseFloat(outputMatch[1]) : parseFloat(inputMatch[1]) * 5
        };
      }
    }
    
    log.success(`Anthropic: ${Object.keys(prices).join(', ')}`);
    return prices;
  } catch (e) {
    log.warn(`Anthropic pricing fetch failed: ${e.message}`);
    return {};
  }
}

// Parse Google Gemini pricing
async function getGooglePricing() {
  try {
    log.info('Fetching Google Gemini pricing...');
    const html = await fetchUrl('https://ai.google.dev/pricing');
    
    const prices = {};
    const models = ['Gemini 2.5 Pro', 'Gemini 2.0 Flash', 'Gemini 1.5 Pro', 'Gemini 1.5 Flash'];
    
    for (const model of models) {
      const match = html.match(new RegExp(`${model}[\\s\\S]{0,300}?\\$([\\d.]+)\\s*per\\s*1m\\s*tokens`, 'i'));
      if (match) {
        const price = parseFloat(match[1]);
        prices[model] = { input: price, output: price * 4 };
      }
    }
    
    log.success(`Google: ${Object.keys(prices).join(', ')}`);
    return prices;
  } catch (e) {
    log.warn(`Google pricing fetch failed: ${e.message}`);
    return {};
  }
}

// DeepSeek pricing (usually on their website or GitHub)
async function getDeepSeekPricing() {
  try {
    log.info('Fetching DeepSeek pricing...');
    const html = await fetchUrl('https://api.deepseek.com/pricing');
    
    const prices = {};
    const models = ['DeepSeek V3', 'DeepSeek R1'];
    
    for (const model of models) {
      const match = html.match(new RegExp(`${model}[\\s\\S]{0,300}?\\$([\\d.]+)\\s*per\\s*million\\s*tokens`, 'i'));
      if (match) {
        const price = parseFloat(match[1]);
        prices[model] = { input: price, output: price * 4 };
      }
    }
    
    log.success(`DeepSeek: ${Object.keys(prices).join(', ')}`);
    return prices;
  } catch (e) {
    log.warn(`DeepSeek pricing fetch failed: ${e.message}`);
    return {};
  }
}

// Update the data.js file with new prices
function updateDataFile(allPrices, timestamp) {
  const dataFilePath = path.join(__dirname, 'data.js');
  let content = fs.readFileSync(dataFilePath, 'utf8');
  
  // Add metadata comment at the top
  const metadataComment = `// LLM Pricing Data
// Auto-generated on ${timestamp}
// Data sources: OpenAI API, Anthropic API, Google AI, DeepSeek API
// Last fetched prices:\n`;
  
  // Update each provider's prices
  for (const [provider, prices] of Object.entries(allPrices)) {
    if (Object.keys(prices).length === 0) continue;
    
    for (const [model, priceData] of Object.entries(prices)) {
      const searchPattern = new RegExp(`(\\{ provider:'${provider}', model:'${model}'[^}]*input:)[\\d.]+`, 'i');
      const replacement = `$1${priceData.input}`;
      
      if (searchPattern.test(content)) {
        content = content.replace(searchPattern, replacement);
        log.success(`Updated ${provider} ${model}: input=$${priceData.input}`);
      }
    }
  }
  
  fs.writeFileSync(dataFilePath, content);
  log.success('data.js updated successfully');
}

// Main update process
async function update() {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  log.info(`Starting LLM pricing update at ${timestamp}`);
  
  try {
    // Fetch from all sources
    const [openai, anthropic, google, deepseek] = await Promise.all([
      getOpenAIPricing(),
      getAnthropicPricing(),
      getGooglePricing(),
      getDeepSeekPricing()
    ]);
    
    const allPrices = { openai, anthropic, google, deepseek };
    
    // Update the data file
    updateDataFile(allPrices, timestamp);
    
    // Also save a backup with timestamp
    const backupPath = path.join(__dirname, `data-backup-${Date.now()}.js`);
    fs.copyFileSync(path.join(__dirname, 'data.js'), backupPath);
    log.info(`Backup saved to ${path.basename(backupPath)}`);
    
    log.success('Update complete!');
    return true;
  } catch (e) {
    log.error(`Update failed: ${e.message}`);
    return false;
  }
}

// Run if called directly
if (require.main === module) {
  update().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { update, fetchUrl };
