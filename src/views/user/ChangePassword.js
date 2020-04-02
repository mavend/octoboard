import { useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { UserContext } from "contexts/UserContext";
import { routes } from "../../config/routes";
import CredentialsLayout from "components/layout/CredentialsLayout";
import ChangePasswordForm from "components/user/forms/ChangePasswordForm";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { t } = useTranslation("credentials");
  const { changePassword } = useContext(UserContext);
  const history = useHistory();

  const formValid = newPassword.length > 0;

  const handleChangePassword = async () => {
    try {
      setIsLoading(true);
      await changePassword(newPassword);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
    setIsLoading(false);
    setSuccess(t("change_password.success"));
  };

  const modalOptions = {
    closeIcon: true,
    onClose: () => history.push(routes.lobby()),
  };

  return (
    <CredentialsLayout action="change_password" modalOptions={modalOptions}>
      <ChangePasswordForm
        {...{
          handleChangePassword,
          isLoading,
          error,
          success,
          newPassword,
          setNewPassword,
          formValid,
        }}
      />
    </CredentialsLayout>
  );
};

export default ChangePassword;
