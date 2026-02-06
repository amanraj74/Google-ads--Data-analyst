import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { DeviceData } from '../../types';
import { formatCurrency, formatNumber } from "../../utils/formatters";

interface DevicePerformanceChartProps {
  data: DeviceData[];
}

export const DevicePerformanceChart: React.FC<DevicePerformanceChartProps> = ({ data }) => {
  const COLORS = {
    'Computers': '#3b82f6',
    'Mobile Phones': '#10b981',
    'Tablets': '#8b5cf6',
    'TV screens': '#f59e0b',
  };

  const formattedData = data.map((item) => ({
    device: item.Device,
    cost: item.Cost,
    clicks: item.Clicks,
    ctr: item.CTR * 100,
    color: COLORS[item.Device as keyof typeof COLORS] || '#6b7280',
  }));

  return (
    <div className="metric-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Device Performance Comparison
      </h3>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="device"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            yAxisId="left"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
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
            formatter={(value: any, name?: string) => {
              if (name === 'cost') return [formatCurrency(value), 'Cost'];
              if (name === 'clicks') return [formatNumber(value), 'Clicks'];
              if (name === 'ctr') return [`${value.toFixed(2)}%`, 'CTR'];
              return [value, name];
            }}
          />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="cost"
            name="Cost (₹)"
            radius={[8, 8, 0, 0]}
            fill="#3b82f6"
          />
          <Bar
            yAxisId="right"
            dataKey="clicks"
            name="Clicks"
            radius={[8, 8, 0, 0]}
            fill="#f59e0b"
            opacity={0.7}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Cost</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Clicks</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">CTR</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">CPC</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.Device} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm font-medium text-gray-900">{item.Device}</td>
                <td className="px-4 py-2 text-sm text-right text-gray-600">{formatCurrency(item.Cost)}</td>
                <td className="px-4 py-2 text-sm text-right text-gray-600">{formatNumber(item.Clicks)}</td>
                <td className="px-4 py-2 text-sm text-right text-gray-600">{(item.CTR * 100).toFixed(2)}%</td>
                <td className="px-4 py-2 text-sm text-right text-gray-600">{formatCurrency(item.Cost_Per_Click)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
