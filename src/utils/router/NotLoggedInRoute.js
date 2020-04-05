import { Route, Redirect, useLocation } from "react-router-dom";
import React from "react";
import { useUser } from "contexts/UserContext";
import { routes } from "config/routes";

export function NotLoggedInRoute({ children, ...rest }) {
  const user = useUser();
  const location = useLocation();
  const { from } = location.state || {};

  return (
    <Route
      {...rest}
      render={() => {
        if (user && user.displayName) {
          return <Redirect to={from || routes.lobby()} />;
        } else {
          return children;
        }
      }}
    />
  );
}
