import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';
import { VistaraLogo } from './VistaraLogo';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Safe console logging in development only
    if (import.meta.env.DEV) {
      console.error("Vistara Boundary Caught:", error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.hash = '';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F9F6EE] dark:bg-[#101A27] text-[#142334] dark:text-[#F9F6EE] flex items-center justify-center p-6 select-none font-sans">
          <div className="max-w-md w-full bg-white dark:bg-[#162434] border border-[#EAE3E0] dark:border-[#304050] rounded-2xl p-8 shadow-card text-center space-y-5">
            <div className="flex justify-center mb-2">
              <VistaraLogo size="md" showWordmark={true} />
            </div>

            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight">Something went unexpected</h2>
              <p className="text-xs text-[#5F6973] dark:text-[#C8C5BE] mt-2 leading-relaxed">
                Vistara encountered an issue rendering this view. Your local preferences, saved collections, and session state remain safely preserved.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
              <Button
                variant="primary"
                size="sm"
                icon={RefreshCw}
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={Home}
                onClick={this.handleGoHome}
              >
                Return Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
