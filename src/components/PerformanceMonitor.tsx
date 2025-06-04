import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Gauge, 
  BarChart3, 
  TrendingUp, 
  Eye,
  EyeOff
} from "lucide-react";
import PerformanceDashboard from './PerformanceDashboard';
import { usePerformanceMonitor } from '@/utils/performanceAnalyzer';

const PerformanceMonitor: React.FC = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { getScore } = usePerformanceMonitor();
  const [score, setScore] = useState<number>(0);

  React.useEffect(() => {
    const updateScore = () => {
      const newScore = getScore();
      setScore(newScore);
    };

    updateScore();
    const interval = setInterval(updateScore, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [getScore]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500 hover:bg-green-600';
    if (score >= 70) return 'bg-yellow-500 hover:bg-yellow-600';
    return 'bg-red-500 hover:bg-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <TrendingUp className="h-4 w-4" />;
    if (score >= 70) return <BarChart3 className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="rounded-full p-2"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        {/* Hide/Show Toggle */}
        <Button
          onClick={() => setIsVisible(false)}
          size="sm"
          variant="ghost"
          className="rounded-full p-2 opacity-60 hover:opacity-100"
        >
          <EyeOff className="h-3 w-3" />
        </Button>

        {/* Main Performance Monitor */}
        <div className="bg-white rounded-lg shadow-lg border p-3 min-w-[200px]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Performance</span>
            </div>
            <Badge 
              className={`text-white ${getScoreColor(score)}`}
            >
              {score}/100
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Overall Score</span>
              <span className="flex items-center gap-1">
                {getScoreIcon(score)}
                {score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : 'Needs Work'}
              </span>
            </div>

            <Button
              onClick={() => setIsDashboardOpen(true)}
              size="sm"
              variant="outline"
              className="w-full text-xs"
            >
              <Activity className="h-3 w-3 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </div>

      {/* Performance Dashboard Modal */}
      <PerformanceDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
      />
    </>
  );
};

export default PerformanceMonitor;
