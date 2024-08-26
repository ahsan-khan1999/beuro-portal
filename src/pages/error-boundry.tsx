import { Button } from '@/base-components/ui/button/button';
import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error({ error, errorInfo });
  }

  handleTryAgain = (): void => {
    window.location.reload()
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-left ">
            <h2 className="text-2xl font-bold mb-4">Oops, something went wrong!</h2>
            <p className="text-gray-600 mb-4 text-center">We apologize for the inconvenience.</p>
            <Button
              id="reload"
              inputType="button"
              className="block mx-auto my-10"
              onClick={this.handleTryAgain}
              text="Try Again"
            />
          </div>
        </div>

      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
