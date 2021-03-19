import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import configureFirebase from "services/Firebase";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import "./i18n";

Sentry.init({
  dsn: "https://674eabf607724ea29b06768e99ae1bf9@o554199.ingest.sentry.io/5682435",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  },
});

configureFirebase().then(async () => {
  const { default: App } = await import("App");
  ReactDOM.render(<App />, document.getElementById("root"));
});
