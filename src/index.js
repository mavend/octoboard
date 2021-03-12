import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import "./i18n";

import configureFirebase from "services/Firebase";

configureFirebase().then(async () => {
  const { default: App } = await import("App");
  ReactDOM.render(<App />, document.getElementById("root"));
});
