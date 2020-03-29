import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PAGE_TITLE } from "./config/constants";
import { routes } from "./config/routes";
import LobbyPage from "./lobby/LobbyPage";
import GamePage from "./games/GamePage";
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
          <Route exact path={routes.lobby()} component={LobbyPage} />
          <Route path={routes.game()} component={GamePage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
