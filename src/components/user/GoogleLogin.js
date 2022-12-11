import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { func } from "prop-types";

import AuthProvider from "services/Auth";
import handleAuthorization from "utils/user/handleAuthorization";

const propTypes = {
  setError: func.isRequired,
  setLoading: func.isRequired,
};

const GoogleLoginOption = ({ setError, setLoading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logInGoogle } = AuthProvider;
  return (
    <Button onClick={handleAuthorization(logInGoogle, setError, setLoading, navigate, location)}>
      <Icon name={"google"} />
      <span> Google </span>
    </Button>
  );
};

GoogleLoginOption.propTypes = propTypes;

export default GoogleLoginOption;
