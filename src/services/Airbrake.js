import React from "react";
import { Notifier } from "@airbrake/browser";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    const {
      REACT_APP_AIRBRAKE_PROJECT_ID: projectId,
      REACT_APP_AIRBRAKE_PROJECT_KEY: projectKey,
      NODE_ENV: environment,
    } = process.env;

    if (projectId && projectKey) {
      this.airbrake = new Notifier({ projectId, projectKey, environment });
    } else {
      this.airbrake = {
        notify: (error) => {
          console.error(error);
        },
      };
    }
  }

  componentDidCatch(error, info) {
    // Send error to Airbrake
    this.airbrake.notify({
      error: error,
      params: { info: info },
    });
  }

  render() {
    return this.props.children;
  }
}
