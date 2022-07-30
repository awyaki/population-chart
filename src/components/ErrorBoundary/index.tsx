import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: { hasError: boolean };
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }

    return this.props.children;
  }
}
