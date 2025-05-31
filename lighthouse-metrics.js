const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const METRIC_DIR = path.join(__dirname, 'metrics');
if (!fs.existsSync(METRIC_DIR)) {
  fs.mkdirSync(METRIC_DIR);
}

const websites = [
  'https://github.com',
  'https://stackoverflow.com',
  'https://kubernetes.io',
  'https://www.redhat.com'
];

websites.forEach((url) => {
  console.log(`🚀 Running Lighthouse for ${url}...`);

  const siteLabel = url; // full URL as label
  const domain = new URL(url).hostname;
  const tmpJson = path.join(os.tmpdir(), `lh-${domain}.json`);

  exec(`lighthouse ${url} --quiet --disable-storage-reset --chrome-flags="--headless --disable-gpu --no-sandbox --disable-dev-shm-usage" --output=json --output-path="${tmpJson}"`, (err) => {
    if (err) {
      console.error(`❌ Lighthouse failed for ${url}: ${err.message}`);
      return;
    }

    let report;
    try {
      report = JSON.parse(fs.readFileSync(tmpJson, 'utf8'));
    } catch (jsonErr) {
      console.error(`❌ Failed to read or parse Lighthouse JSON for ${url}: ${jsonErr.message}`);
      return;
    }

    const metrics = {
      performance: report.categories.performance.score * 100,
      accessibility: report.categories.accessibility.score * 100,
      best_practices: report.categories['best-practices'].score * 100,
      seo: report.categories.seo.score * 100,
      pwa: report.categories.pwa ? report.categories.pwa.score * 100 : 0,
      fcp: report.audits['first-contentful-paint'].numericValue,
      si: report.audits['speed-index'].numericValue,
      tbt: report.audits['total-blocking-time'].numericValue,
      lcp: report.audits['largest-contentful-paint'].numericValue,
      tti: report.audits['interactive'].numericValue,
      cls: report.audits['cumulative-layout-shift'].numericValue
    };

    let data = '';
    Object.entries(metrics).forEach(([key, value]) => {
      data += `lighthouse_${key}{site="${siteLabel}"} ${value}\n`;
    });

    const filePath = path.join(METRIC_DIR, `lighthouse_${domain}.prom`);
    fs.writeFileSync(filePath, data);
    console.log(`✅ Metrics saved to ${filePath}`);
  });
});
