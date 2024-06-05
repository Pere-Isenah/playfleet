// NOTE: Deperecated in favor of ErrorBoundary from ""react-error-boundary"

// import React, { Component, ReactNode } from 'react';
//
// interface ErrorBoundaryState {
//   hasError: boolean;
// }
//
// class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = { hasError: false };
//   }
//
//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//     // Update state to indicate that an error has occurred
//     this.setState({ hasError: true });
//     // You can also log the error to an error reporting service
//     console.error(error, errorInfo);
//   }
//
//   render() {
//     if (this.state.hasError) {
//       // Render fallback UI when an error occurs
//       return <h1 className="text-2xl">Something went wrong.</h1>;
//     }
//     // Render children if no error occurred
//     return this.props.children;
//   }
// }
//
// export default ErrorBoundary;
