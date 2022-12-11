/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "contexts/UserContext";
import { routes } from "config/routes";

export function PrivateRoute({ children, ...rest }) {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate(routes.login_guest(), { state: { from: location.pathname } });
    }
  }, [user, navigate, location]);

  return children;
}
