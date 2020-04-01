import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "contexts/UserContext";
import handleAuthorization from "utils/user/handleAuthorization";
import CredentialsLayout from "components/layout/CredentialsLayout";
import LoginForm from "components/user/forms/LoginForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { logIn } = useContext(UserContext);
  const history = useHistory();

  const formValid = email.length > 0 && password.length > 0;
  const handleLoginFunc = handleAuthorization(
    () => logIn(email, password),
    setError,
    setIsLoading,
    history
  );

  return (
    <CredentialsLayout
      withLoginOptions
      action="login"
      {...{
        setError,
        setIsLoading,
        handleLoginFunc,
        isLoading,
        error,
        email,
        setEmail,
        password,
        setPassword,
        formValid,
      }}
    >
      <LoginForm />
    </CredentialsLayout>
  );
};

export default LoginPage;
