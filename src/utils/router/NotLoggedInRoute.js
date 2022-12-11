import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useUser } from "contexts/UserContext";
import { routes } from "config/routes";
import { Helmet } from "react-helmet-async";
import { CLIENT_URL } from "config/constants";

export function NotLoggedInRoute({ children, ...rest }) {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, params } = location.state || {};
  const { gameName, matchID } = params || {};

  useEffect(() => {
    if (user && user.displayName) {
      navigate(from || routes.lobby());
    }
  }, [navigate, user, from]);

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
        {from && <meta property="og:url" content={`${CLIENT_URL}${from.pathname}`} />}
      </Helmet>
      {children}
    </>
  );
}
