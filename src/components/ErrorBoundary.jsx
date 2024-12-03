import React from "react";
import { Alert, Typography } from "@material-tailwind/react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center">
          <Alert color="red" className="rounded-none">
            დაფიქსირდა შეცდომა.
          </Alert>
          <Typography className="mt-14">
            Please try refreshing the page.
          </Typography>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
