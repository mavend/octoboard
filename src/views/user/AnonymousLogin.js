import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import AuthProvider from "services/Auth";
import CredentialsLayout from "components/layout/CredentialsLayout";
import GuestForm from "components/user/forms/GuestForm";
import handleAuthorization from "utils/user/handleAuthorization";

import OtherLoginOptions from "components/user/LoginRedirections";

const AnonymousLoginPage = () => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const formValid = nickname.length > 0;
  const handleLoginFunc = handleAuthorization(
    () => AuthProvider.logInAnonymously(nickname),
    setError,
    setIsLoading,
    history
  );

  return (
    <CredentialsLayout action="guest">
      <GuestForm
        {...{
          handleLoginFunc,
          isLoading,
          error,
          nickname,
          setNickname,
          formValid,
        }}
      />
      <OtherLoginOptions setError={setError} setLoading={setIsLoading} />
    </CredentialsLayout>
  );
};

export default AnonymousLoginPage;
