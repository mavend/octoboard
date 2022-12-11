import React from "react";
import { action } from "@storybook/addon-actions";
import CredentialsLayout from "./CredentialsLayout";

import GuestForm from "components/user/forms/GuestForm";
import RegisterForm from "components/user/forms/RegisterForm";
import LoginForm from "components/user/forms/LoginForm";
import ChangePasswordForm from "components/user/forms/ChangePasswordForm";
import OtherLoginOptions from "components/user/LoginRedirections";

export default {
  component: CredentialsLayout,
  title: "User/CredentialsLayout",
  excludeStories: /.*Data$/,
};

export const Guest = () => (
  <CredentialsLayout action="guest">
    <GuestForm
      handleLoginFunc={action("handleLoginFunc")}
      isLoading={false}
      error={null}
      nickname="Whatever"
      setNickname={action("setNickname")}
      formValid={true}
    />
    <OtherLoginOptions setError={action("setError")} setLoading={action("setLoading")} />
  </CredentialsLayout>
);

export const Register = () => (
  <CredentialsLayout action="register">
    <RegisterForm
      handleRegisterFunc={action("handleRegisterFunc")}
      isLoading={false}
      error={null}
      nickname="Whatever"
      setNickname={action("setNickname")}
      email="qwe@qwe.qwe"
      setEmail="setEmail"
      password="Whatever"
      setPassword={action("setPassword")}
      formValid={true}
    />
    <OtherLoginOptions setError={action("setError")} setLoading={action("setLoading")} />
  </CredentialsLayout>
);

export const Login = () => (
  <CredentialsLayout action="login">
    <LoginForm
      handleLoginFunc={action("handleLoginFunc")}
      isLoading={false}
      error={null}
      email="qwe@qwe.qwe"
      setEmail={action("setEmail")}
      password="Whatever"
      setPassword={action("setPassword")}
      formValid={true}
    />
    <OtherLoginOptions setError={action("setError")} setLoading={action("setLoading")} />
  </CredentialsLayout>
);

export const ChangePassword = () => (
  <CredentialsLayout
    action="change_password"
    modalOptions={{ closeIcon: true, onClose: action("onClose") }}
  >
    <ChangePasswordForm
      isLoading={false}
      error={null}
      handleChangePassword={action("handleChangePassword")}
      success={null}
      newPassword="Whatever"
      setNewPassword={action("setNewPassword")}
      formValid={true}
    />
  </CredentialsLayout>
);
