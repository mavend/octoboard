import React from "react";
import { Router, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PAGE_TITLE } from "config/constants";
import { routes } from "config/routes";
import history from "config/history";

import { UserProvider } from "contexts/UserContext";
import { PrivateRoute } from "utils/router/Private";
import { NotLoggedInRoute } from "utils/router/NotLoggedInRoute";
import { ErrorBoundary } from "services/Airbrake";

import AnonymousLoginPage from "views/user/AnonymousLogin";
import GamePage from "views/game/GamePage";
import LobbyPage from "views/lobby/LobbyPage";
import LoginPage from "views/user/LoginPage";
import RegisterPage from "views/user/RegisterPage";
import ChangePassword from "views/user/ChangePassword";

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <UserProvider>
          <HelmetProvider>
            <Helmet titleTemplate={PAGE_TITLE} defaultTitle={PAGE_TITLE} />
          </HelmetProvider>
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path={routes.lobby()}>
                <LobbyPage />
              </PrivateRoute>
              <NotLoggedInRoute exact path={routes.login()}>
                <LoginPage />
              </NotLoggedInRoute>
              <NotLoggedInRoute exact path={routes.login_guest()}>
                <AnonymousLoginPage />
              </NotLoggedInRoute>
              <NotLoggedInRoute exact path={routes.register()}>
                <RegisterPage />
              </NotLoggedInRoute>
              <PrivateRoute path={routes.game()}>
                <GamePage />
              </PrivateRoute>
              <PrivateRoute path={routes.change_password()}>
                <ChangePassword />
              </PrivateRoute>
            </Switch>
          </Router>
        </UserProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
