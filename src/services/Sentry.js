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
    });
  }
}
