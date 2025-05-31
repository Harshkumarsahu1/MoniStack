# 🌐 Lighthouse & Blackbox Monitoring with Prometheus and Grafana

This project aims to monitor website performance, accessibility, and availability by combining **Lighthouse audits** with **Prometheus**, **Grafana**, and **Blackbox Exporter**. It collects vital frontend metrics using automated Lighthouse runs and uptime/SSL/HTTP status checks using Blackbox Exporter.

---

## 📌 Project Architecture

[ChatGPT Image May 31, 2025, 01_55_43 PM](https://github.com/user-attachments/assets/6cd3950c-9ffb-4d59-8c7b-ab28d6d1df99)

---

## 📊 Metrics Collected

### 🔦 Lighthouse Metrics (for site: `https://www.redhat.com`)
These are automatically audited and exposed as Prometheus-compatible metrics:

- `lighthouse_performance` → `34`
- `lighthouse_accessibility` → `88`
- `lighthouse_best_practices` → `86`
- `lighthouse_seo` → `86`
- `lighthouse_pwa` → `38`
- `lighthouse_fcp` (First Contentful Paint) → `1819.85 ms`
- `lighthouse_si` (Speed Index) → `13116.01 ms`
- `lighthouse_tbt` (Total Blocking Time) → `14294.13 ms`
- `lighthouse_lcp` (Largest Contentful Paint) → `9117.70 ms`
- `lighthouse_tti` (Time to Interactive) → `26965.17 ms`
- `lighthouse_cls` (Cumulative Layout Shift) → `0.0015`

These metrics are exposed through a custom exporter script and scraped periodically by Prometheus.

---

### 📦 Blackbox Exporter Metrics

In addition to Lighthouse metrics, **Blackbox Exporter** is used for uptime and HTTP status monitoring. It checks:

- HTTP/HTTPS response status
- SSL certificate validity
- Response time
- DNS resolution

These metrics are useful for alerting and uptime dashboards.

---

## 📺 Grafana Dashboard

![Dashboard](./assets/d.png)

The metrics are visualized in a **Grafana dashboard**, showing real-time data and historical trends for both Lighthouse audits and Blackbox checks.

### 🔔 Alerting
Alerts are configured in Grafana using threshold values for key metrics. For example:

- ⚠️ Alert if `lighthouse_performance < 50`
- ⚠️ Alert if SSL certificate is about to expire (via Blackbox)
- ⚠️ Alert if HTTP status is not 200

This allows for proactive monitoring of frontend health and uptime.

---

## 🛠 Tech Stack

- **Lighthouse** (CLI/Node) for audits
- **Custom Exporter** to expose metrics
- **Prometheus** for metric scraping and storage
- **Grafana** for visualization and alerting
- **Blackbox Exporter** for availability and HTTP checks

---

## 🚀 How to Use

1. Install Prometheus, Grafana, and Blackbox Exporter.
2. Run Lighthouse audit via scheduled script or CI/CD.
3. Use the custom script to expose metrics at `/metrics`.
4. Configure Prometheus to scrape both Lighthouse and Blackbox metrics.
5. Import the Grafana dashboard JSON or build your own.

---

## 📷 Screenshots

- Architecture Diagram  
  *(add image: `assets/architecture.png`)*

- Grafana Dashboard  
  *(add image: `assets/dashboard.png`)*

---

## 📚 Resources

- [Lighthouse Docs](https://developer.chrome.com/docs/lighthouse/)
- [Prometheus Docs](https://prometheus.io/docs/)
- [Grafana Docs](https://grafana.com/docs/)
- [Blackbox Exporter](https://github.com/prometheus/blackbox_exporter)

---

## 📩 Contact

For questions or suggestions, feel free to reach out or raise an issue.

---

