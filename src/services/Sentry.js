import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

export function initErrorTracking() {
  const {
    REACT_APP_SENTRY_DSN: sentryDSN,
    REACT_APP_ENVIRONMENT: environment = "development",
  } = process.env;

  if (sentryDSN) {
    Sentry.init({
      dsn: sentryDSN,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
      environment,
      beforeSend(event, hint) {
        // Check if it is an exception, and if so, show the report dialog
        if (event.exception) {
          Sentry.showReportDialog({ eventId: event.event_id });
        }
        return event;
      },
    });
  }
}
