import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PAGE_TITLE } from "./config/constants";
import { routes } from "./config/routes";

import GameLobby from "./lobby/GameLobby";
import GameClient from "./lobby/GameClient";
import LoginPage from "./views/user/LoginPage";
import RegisterPage from "./views/user/RegisterPage";
import history from "./config/history";

import {UserContextProvider} from "./contexts/UserContext";
import {PrivateRoute} from "./utils/router/Private";
import {NotLoggedInRoute} from "./utils/router/NotLoggedInRoute";

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
              <LoginPage/>
            </NotLoggedInRoute>
            <NotLoggedInRoute exact path={routes.register()}>
              <RegisterPage/>
            </NotLoggedInRoute>
            <PrivateRoute exact path={routes.lobby()}>
              <GameLobby/>
            </PrivateRoute>
            <PrivateRoute path={routes.game()}>
              <GameClient/>
            </PrivateRoute>
          </Switch>
        </Router>
      </UserContextProvider>
    </>
  );
};

export default App;
