import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, Bug, Clock } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId: string;
  timestamp: number;
}

// Performance monitoring for errors
interface ErrorMetrics {
  timestamp: number;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId: string;
  componentStack?: string;
  errorBoundary: string;
  performanceEntries: PerformanceEntry[];
  memoryUsage?: any;
}

class ErrorBoundary extends Component<Props, State> {
  private errorMetrics: ErrorMetrics[] = [];

  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      errorId: '',
      timestamp: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return { 
      hasError: true, 
      error,
      errorId,
      timestamp: Date.now()
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const timestamp = Date.now();
    console.error('Error boundary caught an error:', error, errorInfo);
    
    // Collect performance metrics
    const metrics: ErrorMetrics = {
      timestamp,
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId: this.getSessionId(),
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name,
      performanceEntries: this.getPerformanceEntries(),
      memoryUsage: this.getMemoryUsage()
    };

    this.errorMetrics.push(metrics);
    
    // Store error details in state for display
    this.setState({
      errorInfo,
      timestamp
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportErrorToService(error, errorInfo, metrics);
    }
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('error-session-id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('error-session-id', sessionId);
    }
    return sessionId;
  }

  private getPerformanceEntries(): PerformanceEntry[] {
    if (!performance.getEntries) return [];
    
    return performance.getEntries().slice(-20); // Last 20 entries
  }

  private getMemoryUsage(): any {
    if ('memory' in performance) {
      return {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  private async reportErrorToService(error: Error, errorInfo: ErrorInfo, metrics: ErrorMetrics) {
    try {
      // In a real app, you would send this to your error monitoring service
      // like Sentry, Bugsnag, or a custom endpoint
      console.log('Reporting error to monitoring service:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        metrics
      });
      
      // Example: fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorData) })
    } catch (reportError) {
      console.error('Failed to report error:', reportError);
    }
  }

  handleReload = () => {
    // Clear error state and reload
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.reload();
  };

  handleGoHome = () => {
    // Clear error state and navigate home
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // If custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, errorId, timestamp } = this.state;
      const errorTime = new Date(timestamp).toLocaleString('es-ES');

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <div className="max-w-lg w-full">
            <div className="bg-white border border-gray-200 rounded-xl p-6 xs:p-8 shadow-xl">
              <div className="text-center mb-6">
                <AlertTriangle className="h-12 w-12 xs:h-16 xs:w-16 text-red-500 mx-auto mb-4 xs:mb-6" />
                <h1 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4 leading-tight">
                  ¡Oops! Algo salió mal
                </h1>
                <p className="text-gray-600 mb-4 xs:mb-6 leading-relaxed text-sm xs:text-base">
                  Ha ocurrido un error inesperado. No te preocupes, nuestro equipo ya fue notificado. 
                  Puedes intentar recargar la página o volver al inicio.
                </p>
              </div>

              {/* Error details for development */}
              {process.env.NODE_ENV === 'development' && error && (
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <details className="text-sm">
                    <summary className="cursor-pointer font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Bug className="h-4 w-4" />
                      Detalles del error (desarrollo)
                    </summary>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{errorTime}</span>
                        <span className="font-mono text-gray-400">#{errorId}</span>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded p-2">
                        <p className="font-medium text-red-800 mb-1">Error:</p>
                        <p className="text-red-700 font-mono">{error.message}</p>
                      </div>
                      {error.stack && (
                        <div className="bg-gray-100 border rounded p-2 max-h-32 overflow-y-auto">
                          <p className="font-medium text-gray-700 mb-1">Stack trace:</p>
                          <pre className="text-gray-600 font-mono whitespace-pre-wrap text-xs">
                            {error.stack}
                          </pre>
                        </div>
                      )}
                      {errorInfo?.componentStack && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-2 max-h-32 overflow-y-auto">
                          <p className="font-medium text-blue-800 mb-1">Component stack:</p>
                          <pre className="text-blue-700 font-mono whitespace-pre-wrap text-xs">
                            {errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              )}

              <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
                <Button 
                  onClick={this.handleReload}
                  className="flex-1 bg-chocolate-600 hover:bg-chocolate-700 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recargar página
                </Button>
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex-1 border-chocolate-600 text-chocolate-600 hover:bg-chocolate-50"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Ir al inicio
                </Button>
              </div>

              {/* Error reporting status */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  Error reportado automáticamente • ID: {errorId.split('_')[1]}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;