import React, { useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import type { Campaign } from '../../types';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/formatters';

interface CampaignTableProps {
  campaigns: Campaign[];
}

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Campaign;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Enabled' | 'Paused'>('All');

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign['Campaign Name']
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || campaign['Campaign Status'] === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const handleSort = (key: keyof Campaign) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Campaign Performance
        </h3>
        <div className="text-sm text-gray-600">
          {sortedCampaigns.length} of {campaigns.length} campaigns
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {(['All', 'Enabled', 'Paused'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('Campaign Name')}
              >
                <div className="flex items-center gap-2">
                  Campaign Name
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('Cost')}
              >
                <div className="flex items-center justify-end gap-2">
                  Cost
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('Clicks')}
              >
                <div className="flex items-center justify-end gap-2">
                  Clicks
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('CTR')}
              >
                <div className="flex items-center justify-end gap-2">
                  CTR
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCampaigns.map((campaign, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {campaign['Campaign Name']}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign['Campaign Status'] === 'Enabled'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {campaign['Campaign Status']}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-600">
                  {formatCurrency(campaign.Cost)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-600">
                  {formatNumber(campaign.Clicks)}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  <span
                    className={`font-medium ${
                      campaign.CTR > 0.04
                        ? 'text-green-600'
                        : campaign.CTR > 0.02
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {formatPercentage(campaign.CTR)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedCampaigns.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No campaigns found matching your filters
          </div>
        )}
      </div>
    </div>
  );
};
