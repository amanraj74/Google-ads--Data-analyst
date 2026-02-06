import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TimeSeriesData } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const formattedData = data.map((item) => ({
    date: new Date(item.Date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    }),
    clicks: item.Clicks,
    impressions: item.Impressions / 1000, // Scale down for visibility
    ctr: item.CTR * 100,
    cpc: item['Avg. CPC'],
  }));

  return (
    <div className="metric-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Performance Trends Over Time
      </h3>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            yAxisId="left"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="clicks"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Clicks"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="impressions"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={false}
            name="Impressions (K)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="ctr"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="CTR (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
