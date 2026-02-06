import { useMemo } from 'react';
import { Header } from './components/layout/Header';
import { MetricCard } from './components/cards/MetricCard';
import { TimeSeriesChart } from './components/charts/TimeSeriesChart';
import { DevicePerformanceChart } from './components/charts/DevicePerformanceChart';
import { PerformanceHeatmap } from './components/charts/PerformanceHeatmap';
import { CampaignTable } from './components/cards/CampaignTable';
import { InsightsPanel } from './components/cards/InsightsPanel';
import { useGoogleAdsData } from './hooks/useGoogleAdsData';
import {
  IndianRupee,
  MousePointerClick,
  TrendingUp,
  Target,
} from 'lucide-react';

type Insight = {
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  recommendation: string;
};

function App() {
  const {
    campaigns,
    timeSeriesData,
    devices,
    heatmapData,
    biggestChanges,
    loading,
    error,
  } = useGoogleAdsData();

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalCost = campaigns.reduce((sum, c) => sum + c.Cost, 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + c.Clicks, 0);
    const avgCTR = campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + c.CTR, 0) / campaigns.length
      : 0;
    const enabledCampaigns = campaigns.filter(c => c['Campaign Status'] === 'Enabled').length;

    // Calculate changes from biggestChanges data
    const totalCostPrevious = biggestChanges.reduce((sum, c) => sum + c['Cost (Comparison)'], 0);
    const costChange = totalCostPrevious > 0 
      ? ((totalCost - totalCostPrevious) / totalCostPrevious) * 100 
      : 0;

    return {
      totalCost,
      totalClicks,
      avgCTR,
      enabledCampaigns,
      costChange,
    };
  }, [campaigns, biggestChanges]);

  // Generate insights
  const insights = useMemo(() => {
    const insightsList: Array<Insight> = [];

    // Mobile vs Desktop analysis
    const mobileDevice = devices.find(d => d.Device === 'Mobile Phones');
    const computerDevice = devices.find(d => d.Device === 'Computers');
    
    if (mobileDevice && computerDevice) {
      const mobileCTR = mobileDevice.CTR * 100;
      const desktopCTR = computerDevice.CTR * 100;
      
      if (mobileCTR > desktopCTR * 1.2) {
        insightsList.push({
          type: 'success',
          title: 'Mobile Performance Leading',
          description: `Mobile ads have ${mobileCTR.toFixed(2)}% CTR compared to ${desktopCTR.toFixed(2)}% on desktop. Mobile generates ${mobileDevice.Clicks.toLocaleString()} clicks.`,
          recommendation: 'Consider increasing mobile ad budget by 15-20% and optimize landing pages for mobile users.',
        });
      }
    }

    // Top performing campaigns
    const topCampaigns = [...campaigns]
      .sort((a, b) => b.CTR - a.CTR)
      .slice(0, 3)
      .filter(c => c['Campaign Status'] === 'Enabled');
    
    if (topCampaigns.length > 0) {
      insightsList.push({
        type: 'info',
        title: 'High-Performing Campaigns Identified',
        description: `"${topCampaigns[0]['Campaign Name']}" leads with ${(topCampaigns[0].CTR * 100).toFixed(2)}% CTR. These campaigns are driving quality traffic.`,
        recommendation: 'Allocate more budget to top 3 performing campaigns and analyze their keywords for expansion opportunities.',
      });
    }

    // Budget efficiency
    const lowCTRCampaigns = campaigns.filter(c => c.CTR < 0.02 && c.Cost > 1000);
    if (lowCTRCampaigns.length > 0) {
      const wastedBudget = lowCTRCampaigns.reduce((sum, c) => sum + c.Cost, 0);
      insightsList.push({
        type: 'warning',
        title: 'Budget Optimization Opportunity',
        description: `${lowCTRCampaigns.length} campaigns have CTR below 2% and spent ₹${wastedBudget.toLocaleString()}. This indicates poor ad relevance or targeting.`,
        recommendation: 'Pause or restructure low-performing campaigns. Review keyword match types and ad copy quality.',
      });
    }

    // Time-based insights
    if (timeSeriesData.length > 0) {
      const recentData = timeSeriesData.slice(-7);
      const avgRecentCTR = recentData.reduce((sum, d) => sum + d.CTR, 0) / recentData.length;
      const overallAvgCTR = timeSeriesData.reduce((sum, d) => sum + d.CTR, 0) / timeSeriesData.length;
      
      if (avgRecentCTR < overallAvgCTR * 0.8) {
        insightsList.push({
          type: 'danger',
          title: 'Recent Performance Decline',
          description: `CTR has dropped ${((1 - avgRecentCTR / overallAvgCTR) * 100).toFixed(1)}% in the last 7 days compared to overall average.`,
          recommendation: 'Review recent ad copy changes, check for increased competition, and analyze search term reports for irrelevant queries.',
        });
      }
    }

    // Biggest changes analysis
    const topGrowers = [...biggestChanges]
      .filter(c => c.Cost_Change > 0)
      .sort((a, b) => b.Cost_Change_Percent - a.Cost_Change_Percent)
      .slice(0, 1);
    
    if (topGrowers.length > 0) {
      insightsList.push({
        type: 'success',
        title: 'Significant Growth in Key Campaign',
        description: `"${topGrowers[0]['Campaign Name']}" cost increased by ${topGrowers[0].Cost_Change_Percent.toFixed(1)}%, indicating strong scaling potential.`,
        recommendation: 'Monitor this campaign closely for ROI. If profitable, continue scaling; if not, adjust targeting.',
      });
    }

    return insightsList;
  }, [campaigns, devices, timeSeriesData, biggestChanges]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading campaign data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg mb-2">Error Loading Data</h2>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-gray-600 mt-4">
            Make sure the data files are in the <code className="bg-red-100 px-1 rounded">public/data/</code> folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Ad Spend"
            value={summaryMetrics.totalCost}
            format="currency"
            change={summaryMetrics.costChange}
            changeLabel="vs previous period"
            icon={<IndianRupee className="w-6 h-6" />}
            color="blue"
          />
          <MetricCard
            title="Total Clicks"
            value={summaryMetrics.totalClicks}
            format="number"
            icon={<MousePointerClick className="w-6 h-6" />}
            color="green"
          />
          <MetricCard
            title="Average CTR"
            value={summaryMetrics.avgCTR}
            format="percentage"
            icon={<TrendingUp className="w-6 h-6" />}
            color="purple"
          />
          <MetricCard
            title="Active Campaigns"
            value={summaryMetrics.enabledCampaigns}
            format="number"
            icon={<Target className="w-6 h-6" />}
            color="orange"
          />
        </div>

        {/* Insights Panel */}
        <div className="mb-8">
          <InsightsPanel insights={insights} />
        </div>

        {/* Time Series Chart */}
        <div className="mb-8">
          <TimeSeriesChart data={timeSeriesData} />
        </div>

        {/* Device Performance */}
        <div className="mb-8">
          <DevicePerformanceChart data={devices} />
        </div>

        {/* Performance Heatmap */}
        {heatmapData && (
          <div className="mb-8">
            <PerformanceHeatmap data={heatmapData} />
          </div>
        )}

        {/* Campaign Table */}
        <div className="mb-8">
          <CampaignTable campaigns={campaigns} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Built by <span className="font-semibold">Your Name</span> for The Night Marketer Data Analyst Internship
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
