import React, { Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Dimmer, Loader } from "semantic-ui-react";
import { QueryClient, QueryClientProvider } from "react-query";

import { routes } from "config/routes";
import history from "config/history";
import { mediaStyle, MediaContextProvider } from "config/media";

import { UserProvider } from "contexts/UserContext";
import { PrivateRoute } from "utils/router/Private";
import { NotLoggedInRoute } from "utils/router/NotLoggedInRoute";

import AnonymousLoginPage from "views/user/AnonymousLogin";
import GamePage from "views/game/GamePage";
import LobbyPage from "views/lobby/LobbyPage";
import LoginPage from "views/user/LoginPage";
import RegisterPage from "views/user/RegisterPage";
import ChangePassword from "views/user/ChangePassword";
import { CLIENT_URL } from "config/constants";

const Loading = () => (
  <Dimmer active inverted>
    <Loader />
  </Dimmer>
);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<Loading />}>
      <MediaContextProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <HelmetProvider>
              <Helmet>
                <meta property="og:image" content={`${CLIENT_URL}/images/game-hugo.png`} />
                <style type="text/css">{mediaStyle}</style>
              </Helmet>
              <Router history={history}>
                <Switch>
                  <Route exact path={routes.lobby()}>
                    <LobbyPage />
                  </Route>
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
            </HelmetProvider>
          </UserProvider>
        </QueryClientProvider>
      </MediaContextProvider>
    </Suspense>
  );
};

export default App;
