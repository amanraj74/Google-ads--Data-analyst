import { useState, useEffect } from 'react';
import type {
  Campaign,
  TimeSeriesData,
  SearchWord,
  DeviceData,
  NetworkData,
  DayHourData,
  BiggestChange,
  OptimizationScore,
} from '../types';

interface GoogleAdsData {
  campaigns: Campaign[];
  timeSeriesData: TimeSeriesData[];
  searchWords: SearchWord[];
  devices: DeviceData[];
  networks: NetworkData[];
  hourlyData: any;
  dailyData: any;
  heatmapData: any;
  biggestChanges: BiggestChange[];
  optimizationScores: OptimizationScore[];
  loading: boolean;
  error: string | null;
}

export const useGoogleAdsData = (): GoogleAdsData => {
  const [data, setData] = useState<Omit<GoogleAdsData, 'loading' | 'error'>>({
    campaigns: [],
    timeSeriesData: [],
    searchWords: [],
    devices: [],
    networks: [],
    hourlyData: [],
    dailyData: [],
    heatmapData: null,
    biggestChanges: [],
    optimizationScores: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load all data files in parallel
        const [
          campaignsRes,
          timeSeriesRes,
          searchWordsRes,
          devicesRes,
          networksRes,
          hourlyRes,
          dailyRes,
          heatmapRes,
          changesRes,
          scoresRes,
        ] = await Promise.all([
          fetch('/data/campaigns.json'),
          fetch('/data/time_series.json'),
          fetch('/data/search_words.json'),
          fetch('/data/devices.json'),
          fetch('/data/networks.json'),
          fetch('/data/performance_by_hour.json'),
          fetch('/data/performance_by_day.json'),
          fetch('/data/performance_heatmap.json'),
          fetch('/data/biggest_changes.json'),
          fetch('/data/optimization_scores.json'),
        ]);

        const [
          campaignsData,
          timeSeriesData,
          searchWordsData,
          devicesData,
          networksData,
          hourlyData,
          dailyData,
          heatmapData,
          changesData,
          scoresData,
        ] = await Promise.all([
          campaignsRes.json(),
          timeSeriesRes.json(),
          searchWordsRes.json(),
          devicesRes.json(),
          networksRes.json(),
          hourlyRes.json(),
          dailyRes.json(),
          heatmapRes.json(),
          changesRes.json(),
          scoresRes.json(),
        ]);

        setData({
          campaigns: campaignsData.data || [],
          timeSeriesData: timeSeriesData.data || [],
          searchWords: searchWordsData || [],
          devices: devicesData.data || [],
          networks: networksData || [],
          hourlyData: hourlyData || [],
          dailyData: dailyData || [],
          heatmapData: heatmapData || null,
          biggestChanges: changesData.data || [],
          optimizationScores: scoresData.data || [],
        });

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { ...data, loading, error };
};
