import React from "react";
import { Router, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PAGE_TITLE } from "./config/constants";
import { routes } from "./config/routes";
import history from "./config/history";

import GamePage from "./views/game/GamePage";
import LobbyPage from "./views/lobby/LobbyPage";
import LoginPage from "./views/user/LoginPage";
import RegisterPage from "./views/user/RegisterPage";

import { UserContextProvider } from "./contexts/UserContext";
import { PrivateRoute } from "./utils/router/Private";
import { NotLoggedInRoute } from "./utils/router/NotLoggedInRoute";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <HelmetProvider>
          <Helmet titleTemplate={PAGE_TITLE} defaultTitle={PAGE_TITLE} />
        </HelmetProvider>
        <Router history={history}>
          <Switch>
            <NotLoggedInRoute exact path={routes.login()}>
              <LoginPage />
            </NotLoggedInRoute>
            <NotLoggedInRoute exact path={routes.register()}>
              <RegisterPage />
            </NotLoggedInRoute>
            <PrivateRoute exact path={routes.lobby()}>
              <LobbyPage />
            </PrivateRoute>
            <PrivateRoute path={routes.game()}>
              <GamePage />
            </PrivateRoute>
          </Switch>
        </Router>
      </UserContextProvider>
    </>
  );
};

export default App;
