import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import AuthProvider from "services/Auth";
import handleAuthorization from "utils/user/handleAuthorization";

import CredentialsLayout from "components/layout/CredentialsLayout";
import LoginForm from "components/user/forms/LoginForm";
import OtherLoginOptions from "components/user/LoginRedirections";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const history = useHistory();

  const formValid = email.length > 0 && password.length > 0;
  const handleLoginFunc = handleAuthorization(
    () => AuthProvider.logIn(email, password),
    setError,
    setIsLoading,
    history
  );

  return (
    <CredentialsLayout action="login">
      <LoginForm
        {...{
          handleLoginFunc,
          isLoading,
          error,
          email,
          setEmail,
          password,
          setPassword,
          formValid,
        }}
      />
      <OtherLoginOptions setError={setError} setLoading={setIsLoading} />
    </CredentialsLayout>
  );
};

export default LoginPage;
