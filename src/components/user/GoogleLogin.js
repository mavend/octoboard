import {useHistory} from "react-router-dom";
import {Button, Icon} from "semantic-ui-react";
import React, {useContext} from "react";

import {UserContext} from "contexts/UserContext";
import handleAuthorization from "utils/user/handleAuthorization";

const GoogleLoginOption = ({setError, setLoading}) => {
  const { LogInGoogle } = useContext(UserContext);
  const history = useHistory();
  return (
    <Button onClick={handleAuthorization(LogInGoogle, setError, setLoading, history)}>
      <Icon name={"google"} />
      <span> Google </span>
    </Button>
  );
};
export default GoogleLoginOption;
