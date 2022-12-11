import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthProvider from "services/Auth";
import handleAuthorization from "utils/user/handleAuthorization";

import CredentialsLayout from "components/layout/CredentialsLayout";
import RegisterForm from "components/user/forms/RegisterForm";
import OtherLoginOptions from "components/user/LoginRedirections";

const RegisterPage = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const formValid = nickname.length > 0 && email.length > 0 && password.length > 0;
  const handleRegisterFunc = handleAuthorization(
    () => AuthProvider.register(nickname, email, password),
    setError,
    setIsLoading,
    navigate,
    location
  );

  return (
    <CredentialsLayout action="register">
      <RegisterForm
        {...{
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
      />
      <OtherLoginOptions setError={setError} setLoading={setIsLoading} />
    </CredentialsLayout>
  );
};

export default RegisterPage;
