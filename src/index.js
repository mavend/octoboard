import React from "react";
import ReactDOM from "react-dom";

import { initErrorTracking } from "services/Sentry";
import configureFirebase from "services/Firebase";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import "./i18n";

initErrorTracking();

configureFirebase().then(async () => {
  const { default: App } = await import("App");
  ReactDOM.render(<App />, document.getElementById("root"));
});
