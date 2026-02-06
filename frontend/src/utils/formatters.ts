export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN').format(value);
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const formatCompactNumber = (value: number): string => {
  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(2)}Cr`;
  } else if (value >= 100000) {
    return `${(value / 100000).toFixed(2)}L`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

export const getChangeColor = (value: number): string => {
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';
  return 'text-gray-600';
};

export const getChangeIcon = (value: number): string => {
  if (value > 0) return '↑';
  if (value < 0) return '↓';
  return '→';
};
