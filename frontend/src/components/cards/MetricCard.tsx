import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/formatters';

interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  changeLabel?: string;
  format?: 'currency' | 'number' | 'percentage';
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  format = 'number',
  icon,
  color = 'blue',
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val);
      case 'percentage':
        return formatPercentage(val);
      default:
        return formatNumber(val);
    }
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };

  const getChangeIcon = () => {
    if (!change) return <Minus className="w-4 h-4" />;
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  const getChangeColor = () => {
    if (!change) return 'text-gray-500';
    if (change > 0) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{formatValue(value)}</p>
          
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 ${getChangeColor()}`}>
              {getChangeIcon()}
              <span className="text-sm font-semibold">
                {Math.abs(change).toFixed(1)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-gray-500 ml-1">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`${colorClasses[color]} p-3 rounded-lg text-white`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
