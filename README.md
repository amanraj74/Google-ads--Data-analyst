# Google Ads Performance Intelligence Dashboard

> **A comprehensive analytics platform for Google Ads campaign optimization**  
> Built for The Night Marketer Data Analyst Internship

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)

---

## 📊 Overview

This project delivers actionable insights from **90 days of Google Ads campaign data** for ToolWorld India, an industrial equipment retailer. The platform processes 1.19M impressions across multiple dimensions—campaigns, keywords, devices, networks, and time patterns—to identify optimization opportunities and drive better ROI.

### Key Results
- **₹1,37,720** total ad spend analyzed
- **33,371** clicks processed
- **4.23% average CTR** (above industry benchmark)
- **9 active campaigns** tracked
- **11 data dimensions** integrated

---

## ✨ Features

### Core Analytics
- **Performance Dashboard** — Real-time KPI tracking with trend indicators
- **Time Series Analysis** — 90-day performance trends with moving averages
- **Device Intelligence** — Mobile vs Desktop cost and engagement comparison
- **Campaign Management** — Sortable, searchable campaign overview
- **Activity Heatmap** — Hour × Day traffic pattern visualization
- **AI Insights Engine** — Automated recommendations based on performance data

### Data Capabilities
- Campaign performance ranking and budget allocation analysis
- Peak hour and day-of-week pattern detection
- Device strategy optimization (mobile-first vs desktop)
- Network distribution analysis (Search vs Display)
- Waste spend identification and reallocation opportunities

---

## 🏗️ Architecture

```
google-ads-dashboard/
├── data-processing/          # Python ETL pipeline
│   ├── process_data.py       # Excel → JSON transformation
│   ├── requirements.txt      # pandas, openpyxl, numpy
│   └── venv/                 # Virtual environment
│
├── frontend/                 # React TypeScript app
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── cards/        # MetricCard, CampaignTable
│   │   │   ├── charts/       # TimeSeriesChart, DeviceChart
│   │   │   └── layout/       # Header, Footer
│   │   ├── hooks/            # useGoogleAdsData
│   │   ├── types/            # TypeScript interfaces
│   │   ├── utils/            # Formatters, helpers
│   │   └── App.tsx           # Main application
│   ├── public/data/          # Processed JSON files
│   └── vite.config.ts
│
├── data/
│   ├── raw/                  # Source Excel files
│   └── processed/            # Generated JSON
│
└── docs/
    ├── RESEARCH_DOCUMENT.md  # Google Ads concepts
    └── INSIGHTS_REPORT.md    # Analysis & recommendations
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/amanraj74/Google-ads--Data-analyst.git
cd Google-ads--Data-analyst
```

#### 2. Process Data (Python)
```bash
cd data-processing

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies and run ETL
pip install -r requirements.txt
python process_data.py
```

#### 3. Launch Frontend
```bash
cd ../frontend

# Install dependencies
npm install

# Copy processed data
# Windows
Copy-Item -Path "..\data\processed\*.json" -Destination "public\data\" -Force
# macOS/Linux
cp ../data/processed/*.json public/data/

# Start dev server
npm run dev
```

#### 4. Access Dashboard
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Technology Stack

**Frontend**
- React 18.3 with TypeScript
- Vite 7.2 (build tool)
- Tailwind CSS 3.4 (styling)
- Recharts 3.7 (data visualization)
- Lucide React (icons)

**Data Processing**
- Python 3.12
- pandas (data manipulation)
- openpyxl (Excel parsing)
- numpy (numerical operations)

**Development**
- TypeScript strict mode
- Git version control
- npm/pip package management

---

## 📈 Key Insights

### 🎯 Campaign Performance
- **Top Performer:** Rishabh campaign (7.12% CTR) — currently paused, recommend reactivation
- **Budget Leak:** ₹52,586/month on campaigns with <2% CTR
- **Growth Star:** Fume Extractors campaign (+5829% growth)

### 📱 Device Strategy
- **Mobile:** 84% of clicks at ₹2.43 CPC
- **Desktop:** 16% of clicks at ₹13.75 CPC (5.7× higher cost)
- **Recommendation:** Increase mobile bids by 30%, optimize mobile landing pages

### ⏰ Temporal Patterns
- **Peak Hours:** 9 AM - 12 PM (281,606 impressions)
- **Best Day:** Wednesday (231,553 impressions, +23% vs average)
- **Strategy:** Implement day-parting with +40% bids during business hours

### 🚨 Critical Issues
- **No Conversion Tracking:** 0 conversions recorded — immediate fix required
- **Network Imbalance:** 93% budget on Display/Discovery vs Search
- **Paused Winners:** Top 2 high-CTR campaigns currently inactive

---

## 📊 Data Pipeline

```
Excel Reports (11 sources)
         ↓
Python ETL (process_data.py)
         ↓
Data Cleaning & Validation
         ↓
Feature Engineering (CTR, CPC)
         ↓
JSON Export
         ↓
React Frontend
         ↓
Interactive Visualizations
```

### Data Sources
- Campaigns performance
- Daily time series
- Search words/queries
- Device breakdowns
- Network distribution
- Hour × Day heatmap
- Period-over-period changes
- Optimization scores
- Weekly patterns

---

## 📚 Documentation

**Comprehensive Guides:**
- [`RESEARCH_DOCUMENT.md`](docs/RESEARCH_DOCUMENT.md) — Google Ads concepts, metrics, and best practices (2,500+ words)
- [`INSIGHTS_REPORT.md`](docs/INSIGHTS_REPORT.md) — Detailed analysis and action plans (4,000+ words)

**Topics Covered:**
- Campaign structure and hierarchy
- CTR, CPC, Quality Score, Conversion Rate
- Keywords vs Search Terms
- Device, network, and timing optimization
- Budget allocation frameworks
- Competitive analysis strategies

---

## 🎨 Screenshots

**Dashboard Overview**  
Real-time metrics with trend indicators

**Performance Trends**  
90-day time series with moving averages

**Device Analysis**  
Mobile vs Desktop comparison with detailed breakdowns

**Activity Heatmap**  
Traffic patterns across days and hours

**Campaign Table**  
Sortable, searchable campaign management

---

## 🔬 Methodology

### Analysis Approach
1. **Data Understanding** — Explored 11 dimensions and 50+ metrics
2. **Exploratory Analysis** — Identified outliers, patterns, and trends
3. **Insight Generation** — Applied Google Ads best practices and industry benchmarks
4. **Recommendation Framework** — Prioritized actionable findings with risk-reward analysis

---

## ⚠️ Known Limitations

**Data Constraints:**
- No conversion tracking (prevents ROI calculation)
- 90-day window only (no seasonal trends)
- Missing ad copy and competitor data

**Technical:**
- Client-side processing (may impact performance with large datasets)
- Static snapshot from Feb 3, 2026
- No real-time API integration

---

## 🚧 Future Roadmap

### Phase 1 (Next 30 Days)
- [ ] Conversion tracking integration
- [ ] Keyword-level analysis dashboard
- [ ] A/B test comparison tool
- [ ] Budget forecasting model

### Phase 2 (Next 60 Days)
- [ ] Real-time Google Ads API connection
- [ ] Automated anomaly alerts
- [ ] Competitor benchmarking
- [ ] Mobile app (React Native)

### Phase 3 (Next 90 Days)
- [ ] ML-based bid optimization
- [ ] Predictive analytics engine
- [ ] Multi-account management
- [ ] White-label agency solution

---

## 🤝 Contributing

This is an internship project submission. To suggest improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 👤 Author

**Aman Raj**  
- GitHub: [@amanraj74](https://github.com/amanraj74)
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]

---

## 🎓 Project Context

**Assignment:** Data Analyst Intern — The Night Marketer  
**Duration:** 3 days development  
**Submission:** February 6, 2026  
**Campaign Period:** November 3, 2025 - February 3, 2026 (90 days)

---

## 📄 License

Created for educational and internship evaluation purposes.  
Data is proprietary to ToolWorld India and The Night Marketer.

---

## 🙏 Acknowledgments

- **The Night Marketer** — Real-world campaign data and internship opportunity
- **ToolWorld India** — Campaign data source
- **Google Ads Documentation** — Best practices and metrics
- **React & TypeScript Communities** — Technical resources

---

## 📞 Contact

For questions about this project or internship evaluation:
- **Email:** raghav@thenightmarketer.com, kavya@thenightmarketer.com
- **Company:** The Night Marketer

---

<div align="center">

**Built with ❤️ for The Night Marketer Data Analyst Internship**

⭐ Star this repo if you found it helpful!

</div>