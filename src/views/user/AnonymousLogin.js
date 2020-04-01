import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "contexts/UserContext";
import CredentialsLayout from "components/layout/CredentialsLayout";
import GuestForm from "components/user/forms/GuestForm";
import handleAuthorization from "utils/user/handleAuthorization";

const AnonymousLoginPage = () => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { logInAnonymously } = useContext(UserContext);
  const history = useHistory();

  const formValid = nickname.length > 0;
  const handleLoginFunc = handleAuthorization(
    () => logInAnonymously(nickname),
    setError,
    setIsLoading,
    history
  );

  return (
    <CredentialsLayout
      withLoginOptions
      action="guest"
      {...{
        setError,
        setIsLoading,
        handleLoginFunc,
        isLoading,
        error,
        nickname,
        setNickname,
        formValid,
      }}
    >
      <GuestForm />
    </CredentialsLayout>
  );
};

export default AnonymousLoginPage;
