# Google Ads Performance Intelligence
## Research Document

**ToolWorld India Campaign Analysis**

---

| **Prepared for:**     | The Night Marketer Data Analyst Internship          |
|-----------------------|-----------------------------------------------------|
| **Campaign Period:**  | November 3, 2025 - February 3, 2026 (90 Days)      |
| **Date Prepared:**    | February 6, 2026                                    |

---

## Executive Summary

This comprehensive research document provides foundational knowledge of Google Ads concepts, metrics, and optimization strategies required to interpret the 90-day campaign data for ToolWorld India. The analysis covers ₹1,37,720 in ad spend across 9 active campaigns, generating 33,371 clicks and reaching 1,191,997 impressions.

**Key Performance Highlights:**
- Average CTR of 4.23% (above industry average of 2-3%)
- Quality Scores ranging from 78-94% across campaigns
- Mobile devices driving 84% of all clicks at ₹2.43 per click
- Critical opportunity: Zero conversions recorded (conversion tracking issue)

---

## 1. Understanding Google Ads: The Basics

### What is Google Ads?

Google Ads is an online advertising platform where businesses bid to display ads to users searching on Google. Advertisers only pay when someone clicks their ad, following the **Pay-Per-Click (PPC)** model. This makes it a cost-effective advertising solution where you control your budget and only pay for actual engagement.

### How Google Ads Works

When a user searches for something (e.g., 'multimeter price'), Google runs an instant auction:

1. Google identifies all ads targeting that keyword
2. Checks advertiser bid amounts and ad quality
3. Displays the most relevant, highest-value ads
4. Advertiser pays only when someone clicks

**Key Principle:** It's not just about who pays the most—ad quality and relevance matter significantly.

---

## 2. Google Ads Campaign Structure

Google Ads follows a hierarchical organization that allows for organized campaign management:

```
Account (ToolWorld India)
    ↓
Campaign (Power Supply all, Oscilloscope, UNI-T, etc.)
    ↓
Ad Group (Product categories or themes)
    ↓
Keywords (Terms you bid on: 'uni t multimeter')
    ↓
Ads (What users see and click)
```

### Understanding Each Level:

**Account Level:** The top-level container holding all campaigns, billing information, and account-wide settings.

**Campaign Level:** Defines budget, targeting locations, bidding strategy, and ad schedule. In our data:
- 'Power Supply all' - Budget: ₹24,532
- 'UNI-T' - Budget: ₹9,856
- 'Hantek' - Budget: ₹14,364

**Ad Group Level:** Contains related keywords and ads. Groups similar products or themes together.

**Keyword Level:** Specific search terms you're bidding on. Controls when your ads appear.

**Ad Level:** The actual advertisement users see—headline, description, and landing page URL.

---

## 3. Critical Metrics Explained

### 3.1 Click-Through Rate (CTR)

**Formula:** *CTR = (Clicks ÷ Impressions) × 100*

**What it means:** Percentage of people who click your ad after seeing it.

**Example from our data:**
- Average CTR: 4.23%
- This means for every 100 people who see our ads, about 4 click them

**Industry Context:**
- Search ads average: 2-3% CTR
- **Our 4.23% is above average ✓**

**What affects CTR:**
- Ad relevance to search query
- Ad copy quality and appeal
- Position on search results page
- Brand recognition

**Why it matters:** High CTR indicates your ads are relevant and appealing. Google rewards high CTR with better ad positions and lower costs.

---

### 3.2 Cost Per Click (CPC)

**Formula:** *CPC = Total Cost ÷ Total Clicks*

**What it means:** Average amount paid each time someone clicks your ad.

**Example from our data:**
- Average CPC ranges from ₹2.07 to ₹7.50 across different days
- Device variation: Mobile ₹2.43/click vs Desktop ₹13.75/click

**What affects CPC:**
- Competition for keywords
- Ad Quality Score
- Bidding strategy
- Time of day/day of week

**Why it matters:** Lower CPC means more efficient spending—you get more clicks for the same budget.

---

### 3.3 Conversion Rate

**Formula:** *Conversion Rate = (Conversions ÷ Clicks) × 100*

**What it means:** Percentage of clicks that result in desired actions (purchase, signup, call, etc.).

**Critical Finding:** Our campaign data shows 0 conversions recorded across all campaigns.

**Possible reasons:**
1. Conversion tracking not properly set up
2. Products require longer consideration time (electrical equipment)
3. Users may convert through phone calls (not tracked)
4. Landing page or checkout issues

**Industry Context:**
- B2B industrial products: 2-5% typical conversion rate
- **Action needed: Verify conversion tracking implementation**

---

### 3.4 Impressions

**What it means:** Number of times your ad was displayed, regardless of whether it was clicked.

**Example from our data:**
- Total impressions: 1,191,997 over 90 days
- Peak day: November 7, 2025 with 43,428 impressions

**Why it matters:** High impressions with low clicks indicate ad relevance issues or poor ad copy.

---

### 3.5 Quality Score (Optimization Score)

**Range:** 0-100% (or 0-10 in detailed view)

**What it measures:**
- Expected CTR
- Ad relevance
- Landing page experience

**From our data:**
- 'Target All- All Products': 78.1% (Good)
- 'Function Generator': 94.3% (Excellent)
- **Average across campaigns: ~85% ✓**

**Why it matters:**
- Higher Quality Score = Lower CPC
- Better ad positions
- More efficient spending

**How to improve:**
- Make ads highly relevant to keywords
- Improve landing page speed and relevance
- Use ad extensions (sitelinks, callouts)

---

## 4. Keywords vs Search Terms: Critical Difference

### Keywords

**What you bid on:** The terms you tell Google to trigger your ads.

**Example:** You bid on keyword 'multimeter'

**Match Types:**

1. **Broad Match:** 'multimeter' → Shows for 'digital multimeter', 'how to use multimeter', 'best multimeter brand'

2. **Phrase Match:** 'multimeter price' → Shows for 'uni t multimeter price', 'multimeter price in India'

3. **Exact Match:** [multimeter] → Shows only for exact term 'multimeter'

### Search Terms

**What users actually type:** The real queries people search for that triggered your ads.

**Example from our data:**
- **Keyword:** 'multimeter'
- **Search Terms that triggered it:**
  - 'uni t multimeter' (32 clicks, ₹56)
  - 'unit multimeter' (21 clicks, ₹17)
  - 'multimeter' (5 clicks, ₹13)

### Why This Matters

**Problem:** Broad match keywords can trigger irrelevant searches.

**Example from our data:**
- Keyword 'thermal' triggered searches for:
  - 'thermal camera' ✓ (relevant)
  - 'thermal scanner for water leakage' ? (maybe irrelevant)

**Solution:** Review search term reports regularly and add negative keywords to block irrelevant traffic.

---

## 5. Campaign Types in Google Ads

### Search Campaigns (Our Data)

**Where ads appear:** Google search results when users actively search.

**Best for:**
- Capturing high-intent buyers
- Direct response marketing
- Product searches

**Our campaigns are primarily Search campaigns** based on keyword and search term data.

### Display Campaigns

**Where ads appear:** Websites, apps, YouTube (visual banner ads).

**Best for:**
- Brand awareness
- Retargeting
- Visual products

*Not present in our current data.*

### Shopping Campaigns

**Where ads appear:** Google Shopping tab with product images and prices.

**Best for:**
- E-commerce products
- Product comparison shoppers

**Consideration for ToolWorld:** Could be valuable for showcasing multimeters, oscilloscopes with images and prices.

---

## 6. How Timing, Device, and Network Affect Performance

### 6.1 Time-of-Day Analysis

**Peak Performance Hours:**
- **9 AM - 11 AM:** Highest impressions (70,878 - 116,143)
- **Business Hours:** Strong performance 8 AM - 6 PM
- **Evening Drop:** Significant decline after 8 PM

**Day-of-Week Patterns:**
- **Wednesday:** Highest traffic (231,553 impressions)
- **Sunday:** Lowest traffic (117,677 impressions)
- **Weekdays consistently outperform weekends**

**Why this happens:**
- B2B audience searches during work hours
- Engineers and procurement managers are active 9-5
- Weekend searches drop as offices are closed

**Optimization Strategy:**
- Increase bids 9 AM - 5 PM on weekdays
- Reduce or pause campaigns after 8 PM
- Lower bids on weekends unless targeting individual hobbyists

---

### 6.2 Device Performance Analysis

| **Device**     | **Cost**  | **Clicks** | **CTR** | **CPC**  |
|----------------|-----------|------------|---------|----------|
| Mobile Phones  | ₹68,136   | 28,100     | 2.78%   | ₹2.43    |
| Computers      | ₹69,031   | 5,021      | 2.99%   | ₹13.75   |
| Tablets        | ₹420      | 158        | 1.28%   | ₹2.66    |

**Key Findings:**

**Mobile Dominates Volume:**
- 84% of all clicks come from mobile
- Significantly lower CPC (₹2.43 vs ₹13.75)
- Better cost efficiency

**Desktop Has Higher Intent:**
- Higher CTR (2.99%)
- Much lower volume
- Higher CPC suggests more competitive

**Why this matters:**
- Engineers may research on mobile but purchase on desktop
- Mobile-first ad copy and landing pages are critical
- Consider mobile bid adjustments (+20% to +50%)

---

### 6.3 Network Performance

**Three Networks in Google Ads:**

**1. Google Search**
- Cost: ₹9,825
- Clicks: 2,155
- CPC: ₹4.56
- **Highest quality traffic**

**2. Search Partners**
- Cost: ₹31
- Clicks: 9
- CPC: ₹3.39
- Other search engines (minimal volume)

**3. Cross-Network (Display/Discovery)**
- Cost: ₹127,864
- Clicks: 31,207
- CPC: ₹4.10
- **93% of total budget**

**Critical Insight:** Cross-network is driving volume but consuming most budget. Monitor conversion performance closely—if conversions are low, shift budget to Google Search.

---

## 7. Common Google Ads Optimization Strategies

### 7.1 Negative Keyword Management

**What:** Block irrelevant searches from triggering your ads.

**Example from our data:**
- If 'thermal scanner' searches aren't converting, add as negative keyword
- 'toolworld india' (0 clicks despite 96 impressions) - may indicate brand search issues

**Best Practice:** Review search terms weekly and add 5-10 negative keywords.

---

### 7.2 Bid Adjustments

**Device Adjustments:**
- Given mobile's high volume and low CPC, consider +30% mobile bid modifier

**Time Adjustments:**
- Increase bids 9 AM - 5 PM weekdays
- Decrease bids 8 PM - 8 AM and weekends

**Location Adjustments:**
- Our data shows 'Targeted States' campaigns—likely high-performing regions
- Increase bids in high-conversion locations

---

### 7.3 Ad Copy Optimization

**Current CTR of 4.23% is good, but can improve:**

**Tactics:**
1. Include prices in headlines ('₹2,999 Digital Multimeter')
2. Use numbers ('50+ Models Available')
3. Highlight unique selling points ('Next-Day Delivery')
4. Add urgency ('Limited Stock')
5. Use ad extensions (sitelinks, callouts)

---

### 7.4 Landing Page Optimization

**Critical:** Even with perfect ads, poor landing pages kill conversions.

**Best Practices:**
1. **Match ad message:** If ad says 'UNI-T Multimeter', land on UNI-T page
2. **Mobile-optimized:** 84% of traffic is mobile
3. **Fast loading:** Under 3 seconds
4. **Clear CTA:** 'Add to Cart' or 'Call Now' prominent
5. **Trust signals:** Reviews, certifications, secure checkout

---

### 7.5 Budget Reallocation

**Top Growers (Increase Budget):**
- 'Fume extractors': +5829% growth
- 'Oscilloscope- Targeted States': +₹7,728 spend increase
- 'Soldering Station- Targeted States': +₹3,819 increase

**Underperformers (Reduce Budget):**
- Campaigns with high cost, low CTR (<2%)
- Check conversion data when available

**Strategy:** Shift 20-30% of budget from low performers to proven winners.

---

## 8. Data Interpretation Framework

**When analyzing Google Ads data, ask:**

**Volume Questions:**
- Are we getting enough impressions? (Yes - 1.19M)
- Are enough people clicking? (33,371 clicks is healthy)

**Efficiency Questions:**
- Is CTR competitive? (4.23% - Above average ✓)
- Is CPC reasonable? (₹2-₹7 for B2B industrial - Good ✓)

**Outcome Questions:**
- Are we getting conversions? (0 recorded - ⚠️ Priority fix)
- What's the cost per conversion?

**Trend Questions:**
- Is performance improving or declining?
- Are there seasonal patterns?

---

## 9. Limitations and Assumptions

### Data Limitations

**1. No Conversion Data:**
- Zero conversions recorded
- Unable to calculate ROI or ROAS
- Cannot identify high-value keywords

**2. Limited Historical Context:**
- Only 90 days of data
- Cannot identify seasonal trends
- No year-over-year comparisons

**3. Missing Information:**
- Ad copy not visible
- Landing page URLs not provided
- Competitor data unavailable
- Actual keyword bids not shown

### Assumptions Made

**1. Business Model:**
- Assumed B2B e-commerce for industrial equipment
- Primary goal likely online sales or lead generation

**2. Target Audience:**
- Engineers, technicians, procurement managers
- Business hours activity pattern supports this

**3. Market Context:**
- India market (pricing in ₹)
- English-language campaigns
- Competitive industrial tools sector

---

## 10. Conclusion and Next Steps

### What We Know

- ✓ Campaign structure is sound (9 active campaigns)
- ✓ CTR is above industry average (4.23%)
- ✓ Mobile strategy is working (84% of clicks)
- ✓ Business hours targeting is appropriate
- ✓ Quality Scores are healthy (78-94%)

### Critical Gaps

- ✗ **Conversion tracking must be fixed - Top priority**
- ⚠ High cross-network spend needs conversion verification
- ⚠ Some campaigns show poor efficiency (<2% CTR)

### Recommended Actions

**Immediate (Week 1):**
1. Implement/verify conversion tracking
2. Add 20-30 negative keywords from search term report
3. Pause campaigns with CTR < 1.5%

**Short-term (Month 1):**
4. Increase mobile bid adjustments (+30%)
5. Set up time-of-day bid scheduling
6. Shift budget to top 3 performing campaigns

**Long-term (Month 2-3):**
7. Implement remarketing campaigns
8. Test Shopping campaigns for product visibility
9. A/B test landing pages for conversion improvement

---

This research document provides a comprehensive foundation for understanding and optimizing ToolWorld India's Google Ads performance. The campaign demonstrates strong fundamentals with above-average engagement metrics, while presenting clear opportunities for improvement through conversion tracking implementation and strategic budget reallocation.

---

## References

1. Google Ads Help Center: 'About Click-Through Rate (CTR)'
2. Google Ads Best Practices Guide
3. WordStream: 'Google Ads Benchmarks for Your Industry'
4. Google Ads Quality Score Guidelines
5. Search Engine Journal: 'PPC Optimization Strategies'

---

*Document prepared for The Night Marketer Data Analyst Internship*  
*Campaign: ToolWorld India Google Ads (90-day analysis) | February 6, 2026*