import {
  Route,
  Redirect
} from "react-router-dom";
import React, {useContext} from "react";
import {UserContext} from "../../contexts/UserContext";
import {routes} from "../../config/routes";

export function NotLoggedInRoute({ children, ...rest }) {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user){
          return (
            children
          );
        } else {
          return (<Redirect
            to={{
              pathname: routes.lobby(),
              state: { from: location }
            }}
          />);
        }
      }}
    />
  );
}
