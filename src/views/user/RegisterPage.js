import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "contexts/UserContext";
import CredentialsLayout from "components/layout/CredentialsLayout";
import RegisterForm from "components/user/forms/RegisterForm";
import handleAuthorization from "utils/user/handleAuthorization";

const RegisterPage = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useContext(UserContext);
  const history = useHistory();

  const formValid = nickname.length > 0 && email.length > 0 && password.length > 0;
  const handleRegisterFunc = handleAuthorization(
    () => register(nickname, email, password),
    setError,
    setIsLoading,
    history
  );

  return (
    <CredentialsLayout
      withLoginOptions
      action="register"
      {...{
        setError,
        setIsLoading,
        handleRegisterFunc,
        isLoading,
        error,
        nickname,
        setNickname,
        email,
        setEmail,
        password,
        setPassword,
        formValid,
      }}
    >
      <RegisterForm />
    </CredentialsLayout>
  );
};

export default RegisterPage;
