import React from "react";
import { createRoot } from "react-dom/client";

import { initErrorTracking } from "services/Sentry";
import configureFirebase from "services/Firebase";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import "./i18n";

initErrorTracking();

configureFirebase().then(async () => {
  const { default: App } = await import("App");
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
});
