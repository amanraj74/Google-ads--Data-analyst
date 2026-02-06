import React from 'react';

interface HeatmapData {
  heatmap: {
    days: string[];
    hours: number[];
    values: number[][];
  };
}

interface PerformanceHeatmapProps {
  data: HeatmapData;
}

export const PerformanceHeatmap: React.FC<PerformanceHeatmapProps> = ({ data }) => {
  if (!data?.heatmap) return null;

  const { days, hours, values } = data.heatmap;
  
  // Find max value for color scaling
  const maxValue = Math.max(...values.flat());
  
  // Get color based on value intensity
  const getColor = (value: number) => {
    const intensity = value / maxValue;
    if (intensity > 0.8) return 'bg-blue-600';
    if (intensity > 0.6) return 'bg-blue-500';
    if (intensity > 0.4) return 'bg-blue-400';
    if (intensity > 0.2) return 'bg-blue-300';
    if (intensity > 0) return 'bg-blue-200';
    return 'bg-gray-100';
  };

  return (
    <div className="metric-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Performance Heatmap: Hour × Day
      </h3>
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col">
              <div className="h-8"></div>
              {days.map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-end pr-2 text-xs font-medium text-gray-600"
                >
                  {day.slice(0, 3)}
                </div>
              ))}
            </div>
            
            {/* Heatmap cells */}
            <div className="flex-1">
              {/* Hour labels */}
              <div className="flex mb-1">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="flex-1 text-center text-xs font-medium text-gray-600"
                  >
                    {hour}
                  </div>
                ))}
              </div>
              
              {/* Grid */}
              {values.map((row, dayIndex) => (
                <div key={dayIndex} className="flex gap-1 mb-1">
                  {row.map((value, hourIndex) => (
                    <div
                      key={hourIndex}
                      className={`flex-1 h-8 rounded ${getColor(value)} cursor-pointer hover:opacity-80 transition-opacity`}
                      title={`${days[dayIndex]} ${hours[hourIndex]}:00 - ${value.toLocaleString()} impressions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-6 h-4 bg-gray-100 rounded"></div>
          <div className="w-6 h-4 bg-blue-200 rounded"></div>
          <div className="w-6 h-4 bg-blue-300 rounded"></div>
          <div className="w-6 h-4 bg-blue-400 rounded"></div>
          <div className="w-6 h-4 bg-blue-500 rounded"></div>
          <div className="w-6 h-4 bg-blue-600 rounded"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
