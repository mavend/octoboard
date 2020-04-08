import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { func } from "prop-types";

import AuthProvider from "services/Auth";
import handleAuthorization from "utils/user/handleAuthorization";

const propTypes = {
  setError: func.isRequired,
  setLoading: func.isRequired,
};

const GoogleLoginOption = ({ setError, setLoading }) => {
  const history = useHistory();
  const { logInGoogle } = AuthProvider;
  return (
    <Button onClick={handleAuthorization(logInGoogle, setError, setLoading, history)}>
      <Icon name={"google"} />
      <span> Google </span>
    </Button>
  );
};

GoogleLoginOption.propTypes = propTypes;

export default GoogleLoginOption;
