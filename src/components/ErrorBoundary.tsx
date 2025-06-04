
import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-background border border-secondary/20 rounded-xl p-6 xs:p-8 shadow-lg">
              <AlertTriangle className="h-12 w-12 xs:h-16 xs:w-16 text-action mx-auto mb-4 xs:mb-6" />
              <h1 className="text-xl xs:text-2xl font-bold text-primary mb-3 xs:mb-4 leading-tight">
                ¡Oops! Algo salió mal
              </h1>
              <p className="text-secondary mb-4 xs:mb-6 leading-relaxed text-sm xs:text-base">
                Ha ocurrido un error inesperado. No te preocupes, nuestro equipo ya fue notificado. 
                Puedes intentar recargar la página o volver al inicio.
              </p>
              
              <div className="space-y-2 xs:space-y-3">
                <Button 
                  onClick={this.handleReload}
                  className="w-full bg-action hover:bg-action/90 text-white flex items-center justify-center space-x-2 text-sm xs:text-base py-2 xs:py-3"
                >
                  <RefreshCw className="h-3 w-3 xs:h-4 xs:w-4" />
                  <span>Recargar Página</span>
                </Button>
                
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="w-full border-action text-action hover:bg-action hover:text-white flex items-center justify-center space-x-2 text-sm xs:text-base py-2 xs:py-3"
                >
                  <Home className="h-3 w-3 xs:h-4 xs:w-4" />
                  <span>Ir al Inicio</span>
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 xs:mt-6 text-left">
                  <summary className="cursor-pointer text-xs xs:text-sm text-secondary hover:text-primary">
                    Detalles del error (solo en desarrollo)
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 xs:p-3 rounded text-red-600 overflow-auto max-h-32 xs:max-h-40">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
