import React from "react";
import { Notifier } from "@airbrake/browser";
import { GenericAirbrakeNotifier } from "./Airbrake";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.notifier = new GenericAirbrakeNotifier(Notifier);
  }

  componentDidCatch(error, info) {
    // Send error to Airbrake
    this.notifier.notify({
      error: error,
      params: { info: info },
    });
  }

  render() {
    return this.props.children;
  }
}
