import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Globe, 
  Tag, 
  Image, 
  Link, 
  FileText, 
  BarChart, 
  CheckCircle, 
  AlertTriangle,
  Copy,
  ExternalLink
} from "lucide-react";
import { useSEO } from '@/utils/seo';

interface SEOAnalyzerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEOAnalyzer: React.FC<SEOAnalyzerProps> = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState(window.location.href);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { getCurrentSEOData } = useSEO();

  useEffect(() => {
    if (isOpen) {
      performAnalysis();
    }
  }, [isOpen]);

  const performAnalysis = async () => {
    setLoading(true);
    
    // Simulate SEO analysis
    setTimeout(() => {
      const currentSEO = getCurrentSEOData();
      const mockAnalysis = {
        score: 78,
        issues: [
          { type: 'warning', message: 'Meta description is shorter than recommended (150-160 characters)' },
          { type: 'error', message: 'Missing alt text on 2 images' },
          { type: 'info', message: 'Consider adding more internal links' },
        ],
        suggestions: [
          'Add schema markup for better rich snippets',
          'Optimize images with proper alt text',
          'Improve page loading speed',
          'Add more relevant keywords to content',
        ],
        keywords: ['artisan chocolate', 'premium cocoa', 'handcrafted sweets'],
        metrics: {
          titleLength: currentSEO.title?.length || 0,
          descriptionLength: currentSEO.description?.length || 0,
          headingsCount: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
          imagesCount: document.querySelectorAll('img').length,
          imagesWithAlt: document.querySelectorAll('img[alt]').length,
          linksCount: document.querySelectorAll('a').length,
          internalLinks: document.querySelectorAll('a[href^="/"], a[href^="#"]').length,
          externalLinks: document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])').length,
        },
        currentSEO,
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Search className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold">SEO Analyzer</h2>
              <p className="text-sm text-gray-600">Comprehensive SEO analysis and optimization recommendations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={performAnalysis} disabled={loading}>
              {loading ? 'Analyzing...' : 'Refresh Analysis'}
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-600">Analyzing SEO performance...</p>
              </div>
            </div>
          ) : analysis ? (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold p-3 rounded-lg border ${getScoreColor(analysis.score)}`}>
                        {analysis.score}/100
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analysis.issues.length}</div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="destructive" className="text-xs">
                          {analysis.issues.filter((i: any) => i.type === 'error').length} Errors
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {analysis.issues.filter((i: any) => i.type === 'warning').length} Warnings
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Keywords</CardTitle>
                      <Tag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analysis.keywords.length}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {analysis.keywords.slice(0, 2).map((keyword: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      Issues & Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.issues.map((issue: any, index: number) => (
                        <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${
                          issue.type === 'error' ? 'bg-red-50 border-red-200' :
                          issue.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                          'bg-blue-50 border-blue-200'
                        }`}>
                          {issue.type === 'error' ? (
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          ) : issue.type === 'warning' ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          )}
                          <p className="text-sm">{issue.message}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metadata" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Page Title
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Current Title</span>
                          <div className="flex items-center gap-2">
                            <Badge variant={analysis.metrics.titleLength >= 50 && analysis.metrics.titleLength <= 60 ? 'default' : 'secondary'}>
                              {analysis.metrics.titleLength} chars
                            </Badge>
                            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(analysis.currentSEO.title || '')}>
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">{analysis.currentSEO.title || 'No title set'}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Recommended: 50-60 characters for optimal display in search results
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        Meta Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Current Description</span>
                          <div className="flex items-center gap-2">
                            <Badge variant={analysis.metrics.descriptionLength >= 150 && analysis.metrics.descriptionLength <= 160 ? 'default' : 'secondary'}>
                              {analysis.metrics.descriptionLength} chars
                            </Badge>
                            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(analysis.currentSEO.description || '')}>
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">{analysis.currentSEO.description || 'No description set'}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Recommended: 150-160 characters for optimal display in search results
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-purple-600" />
                        Keywords & Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-600">Target Keywords</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {analysis.keywords.map((keyword: string, index: number) => (
                              <Badge key={index} variant="outline">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {analysis.currentSEO.openGraph?.tags && (
                          <div>
                            <span className="text-sm text-gray-600">Open Graph Tags</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {analysis.currentSEO.openGraph.tags.map((tag: string, index: number) => (
                                <Badge key={index} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Content Structure
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Headings (H1-H6)</span>
                          <Badge>{analysis.metrics.headingsCount}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Links</span>
                          <Badge>{analysis.metrics.linksCount}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Internal Links</span>
                          <Badge variant="secondary">{analysis.metrics.internalLinks}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">External Links</span>
                          <Badge variant="outline">{analysis.metrics.externalLinks}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Image className="h-5 w-5 text-green-600" />
                        Images & Media
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Images</span>
                          <Badge>{analysis.metrics.imagesCount}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Images with Alt Text</span>
                          <Badge variant={analysis.metrics.imagesWithAlt === analysis.metrics.imagesCount ? 'default' : 'destructive'}>
                            {analysis.metrics.imagesWithAlt}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Missing Alt Text</span>
                          <Badge variant={analysis.metrics.imagesCount - analysis.metrics.imagesWithAlt === 0 ? 'default' : 'destructive'}>
                            {analysis.metrics.imagesCount - analysis.metrics.imagesWithAlt}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      Open Graph & Social Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysis.currentSEO.openGraph ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Title:</span>
                            <p className="font-medium">{analysis.currentSEO.openGraph.title}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Type:</span>
                            <p className="font-medium">{analysis.currentSEO.openGraph.type}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-600">Description:</span>
                            <p className="font-medium">{analysis.currentSEO.openGraph.description}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-600">Image:</span>
                            <p className="font-medium break-all">{analysis.currentSEO.openGraph.image}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">No Open Graph data found</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Link className="h-5 w-5 text-purple-600" />
                      Structured Data (JSON-LD)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysis.currentSEO.structuredData ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Schema Type</span>
                          <Badge>{analysis.currentSEO.structuredData['@type']}</Badge>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <pre className="text-xs overflow-x-auto">
                            {JSON.stringify(analysis.currentSEO.structuredData, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">No structured data found</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Optimization Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.suggestions.map((suggestion: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => window.open(`https://search.google.com/test/rich-results?url=${encodeURIComponent(url)}`, '_blank')}
                      className="w-full justify-start"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Test Rich Results (Google)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(`https://www.facebook.com/sharing/debugger/?url=${encodeURIComponent(url)}`, '_blank')}
                      className="w-full justify-start"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Debug Open Graph (Facebook)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(`https://cards-dev.twitter.com/validator?url=${encodeURIComponent(url)}`, '_blank')}
                      className="w-full justify-start"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Validate Twitter Cards
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SEOAnalyzer;
