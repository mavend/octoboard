import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useUser } from "contexts/UserContext";
import { routes } from "config/routes";

export function PrivateRoute({ children, computedMatch, ...rest }) {
  const user = useUser();
  const { params } = computedMatch;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: routes.login_guest(),
                state: { from: location, params: params },
              }}
            />
          );
        }
      }}
    />
  );
}
