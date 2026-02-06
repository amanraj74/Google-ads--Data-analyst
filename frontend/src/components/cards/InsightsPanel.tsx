import React from 'react';
import { AlertCircle, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';

interface Insight {
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  recommendation?: string;
}

interface InsightsPanelProps {
  insights: Insight[];
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <TrendingUp className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'danger':
        return <TrendingDown className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          title: 'text-green-900',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          title: 'text-yellow-900',
        };
      case 'danger':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          title: 'text-red-900',
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          title: 'text-blue-900',
        };
    }
  };

  return (
    <div className="metric-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Key Insights & Recommendations
      </h3>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const colors = getColorClasses(insight.type);

          return (
            <div
              key={index}
              className={`${colors.bg} ${colors.border} border rounded-lg p-4`}
            >
              <div className="flex gap-3">
                <div className={colors.icon}>{getIcon(insight.type)}</div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${colors.title} mb-1`}>
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    {insight.description}
                  </p>
                  {insight.recommendation && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-300">
                      <p className="text-sm font-medium text-gray-800">
                        💡 Recommendation: {insight.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
