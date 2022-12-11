import React, { Suspense } from "react";
import * as Sentry from "@sentry/react";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Dimmer, Loader } from "semantic-ui-react";
import { QueryClient, QueryClientProvider } from "react-query";

import { routes } from "config/routes";
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
import ErrorPage from "views/ErrorPage";
import { CLIENT_URL } from "config/constants";
import PrivacyPolicy from "views/policy/PrivacyPolicy";

const Loading = () => (
  <Dimmer active inverted>
    <Loader />
  </Dimmer>
);

const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route key={routes.lobby()} exact path={routes.lobby()} element={<LobbyPage />} />,
      <Route
        key={routes.privacy_policy()}
        path={routes.privacy_policy()}
        element={<PrivacyPolicy />}
      />,
      <Route
        key={routes.login()}
        exact
        path={routes.login()}
        element={
          <NotLoggedInRoute>
            <LoginPage />
          </NotLoggedInRoute>
        }
      />,
      <Route
        key={routes.login_guest()}
        exact
        path={routes.login_guest()}
        element={
          <NotLoggedInRoute>
            <AnonymousLoginPage />
          </NotLoggedInRoute>
        }
      />,
      <Route
        key={routes.register()}
        exact
        path={routes.register()}
        element={
          <NotLoggedInRoute>
            <RegisterPage />
          </NotLoggedInRoute>
        }
      />,
      <Route
        key={routes.game()}
        path={routes.game()}
        element={
          <PrivateRoute>
            <GamePage />
          </PrivateRoute>
        }
      />,
      <Route
        key={routes.change_password()}
        path={routes.change_password()}
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />,
    ])
  );

  return (
    <Suspense fallback={<Loading />}>
      <Sentry.ErrorBoundary showDialog fallback={ErrorPage}>
        <MediaContextProvider>
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <HelmetProvider>
                <Helmet>
                  <meta property="og:image" content={`${CLIENT_URL}/images/game-hugo.png`} />
                  <style type="text/css">{mediaStyle}</style>
                </Helmet>
                <RouterProvider router={router} />
              </HelmetProvider>
            </UserProvider>
          </QueryClientProvider>
        </MediaContextProvider>
      </Sentry.ErrorBoundary>
    </Suspense>
  );
};

export default App;
