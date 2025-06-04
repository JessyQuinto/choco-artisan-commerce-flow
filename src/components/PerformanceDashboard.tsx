import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Eye, 
  Clock, 
  Gauge,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import PerformanceAnalyzer, { usePerformanceMonitor } from '@/utils/performanceAnalyzer';

interface PerformanceDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ isOpen, onClose }) => {
  const { getReport, getScore, exportData, clearData } = usePerformanceMonitor();
  const [report, setReport] = useState<any>(null);
  const [score, setScore] = useState<number>(0);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      updateReport();
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh && isOpen) {
      interval = setInterval(updateReport, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, isOpen]);

  const updateReport = () => {
    const newReport = getReport();
    const newScore = getScore();
    setReport(newReport);
    setScore(newScore);
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 70) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold">Performance Dashboard</h2>
              <p className="text-sm text-gray-600">Real-time performance monitoring and analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'bg-green-50 border-green-200' : ''}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {report ? (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="vitals">Core Web Vitals</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
                      {getScoreIcon(score)}
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                        {score}/100
                      </div>
                      <Progress value={score} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Components Tracked</CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{report.components.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Active components being monitored
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {report.metrics.memoryUsage 
                          ? `${(report.metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB`
                          : 'N/A'
                        }
                      </div>
                      <p className="text-xs text-muted-foreground">
                        JavaScript heap usage
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="vitals" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        Largest Contentful Paint (LCP)
                      </CardTitle>
                      <CardDescription>
                        Time when the largest content element becomes visible
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {report.metrics.lcp ? `${report.metrics.lcp.toFixed(0)}ms` : 'N/A'}
                      </div>
                      <Badge variant={report.metrics.lcp <= 2500 ? 'default' : 'destructive'}>
                        {report.metrics.lcp <= 2500 ? 'Good' : 'Needs Improvement'}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        First Input Delay (FID)
                      </CardTitle>
                      <CardDescription>
                        Time from first user interaction to browser response
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {report.metrics.fid ? `${report.metrics.fid.toFixed(0)}ms` : 'N/A'}
                      </div>
                      <Badge variant={report.metrics.fid <= 100 ? 'default' : 'destructive'}>
                        {report.metrics.fid <= 100 ? 'Good' : 'Needs Improvement'}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        Cumulative Layout Shift (CLS)
                      </CardTitle>
                      <CardDescription>
                        Measure of visual stability during page load
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {report.metrics.cls ? report.metrics.cls.toFixed(3) : 'N/A'}
                      </div>
                      <Badge variant={report.metrics.cls <= 0.1 ? 'default' : 'destructive'}>
                        {report.metrics.cls <= 0.1 ? 'Good' : 'Needs Improvement'}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-orange-600" />
                        First Contentful Paint (FCP)
                      </CardTitle>
                      <CardDescription>
                        Time when first content appears on screen
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {report.metrics.fcp ? `${report.metrics.fcp.toFixed(0)}ms` : 'N/A'}
                      </div>
                      <Badge variant={report.metrics.fcp <= 1800 ? 'default' : 'destructive'}>
                        {report.metrics.fcp <= 1800 ? 'Good' : 'Needs Improvement'}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="components" className="space-y-6">
                <div className="space-y-4">
                  {report.components.map((component: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{component.name}</span>
                          <Badge variant="outline">
                            {component.renderCount} renders
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Avg Render Time</p>
                            <p className="font-semibold">{component.averageRenderTime.toFixed(2)}ms</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Render</p>
                            <p className="font-semibold">{component.lastRenderTime.toFixed(2)}ms</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Render Count</p>
                            <p className="font-semibold">{component.renderCount}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Memory Leaks</p>
                            <p className={`font-semibold ${component.memoryLeaks ? 'text-red-600' : 'text-green-600'}`}>
                              {component.memoryLeaks ? 'Detected' : 'None'}
                            </p>
                          </div>
                        </div>
                        {component.rerenderReasons.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">Recent Rerender Reasons:</p>
                            <div className="flex flex-wrap gap-2">
                              {component.rerenderReasons.slice(-3).map((reason: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {reason}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      Performance Recommendations
                    </CardTitle>
                    <CardDescription>
                      Suggestions to improve your application's performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {report.recommendations.length > 0 ? (
                      <div className="space-y-4">
                        {report.recommendations.map((recommendation: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{recommendation}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-sm">Great job! No performance issues detected.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      onClick={updateReport}
                      className="w-full"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Data
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearData}
                      className="w-full"
                    >
                      Clear All Data
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Loading performance data...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
