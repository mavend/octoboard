import { Route, Redirect, useLocation } from "react-router-dom";
import React from "react";
import { useUser } from "contexts/UserContext";
import { routes } from "config/routes";
import { Helmet } from "react-helmet-async";

export function NotLoggedInRoute({ children, ...rest }) {
  const user = useUser();
  const location = useLocation();
  const { from, params } = location.state || {};
  const { gameName, matchID } = params || {};

  return (
    <Route
      {...rest}
      render={() => {
        if (user && user.displayName) {
          return <Redirect to={from || routes.lobby()} />;
        } else {
          return (
            <>
              <Helmet>
                {gameName && <title>Join to play {gameName} | octoboard</title>}
                <meta property="og:title" content={`Play ${gameName} with your friends!`} />
                {gameName && matchID && (
                  <meta
                    property="og:description"
                    content={`Your friend wants to play ${gameName} with you. They wait for you in match #${matchID}`}
                  />
                )}
                {from && (
                  <meta
                    property="og:url"
                    content={`https://octoboard.netlify.com${from.pathname}`}
                  />
                )}
              </Helmet>
              {children}
            </>
          );
        }
      }}
    />
  );
}
