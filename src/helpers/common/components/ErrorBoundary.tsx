import React, { Component, ErrorInfo, ReactNode } from 'react';

interface IErrorProps {
  children: ReactNode;
  fallbackComponent?: () => JSX.Element;
}

interface IErrorState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorProps, IErrorState> {
  public state: IErrorState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): IErrorState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallbackComponent) {
        return <>{this.props.fallbackComponent}</>;
      }
      return <h1 style={{ color: 'red' }}>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
