import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PAGE_TITLE } from "./config/constants";
import { routes } from "./config/routes";
import GameLobby from "./lobby/GameLobby";
import GameClient from "./lobby/GameClient";
import LoginPage from "./LoginPage";
import history from "./config/history";

const App = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate={PAGE_TITLE} defaultTitle={PAGE_TITLE} />
      </HelmetProvider>
      <Router history={history}>
        <Switch>
          <Route exact path={routes.login()} component={LoginPage} />
          <Route exact path={routes.lobby()} component={GameLobby} />
          <Route path={routes.game()} component={GameClient} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
