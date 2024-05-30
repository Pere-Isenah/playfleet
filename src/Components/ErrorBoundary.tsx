import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Update state to indicate that an error has occurred
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return <h1 className="text-2xl">Something went wrong.</h1>;
    }
    // Render children if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;