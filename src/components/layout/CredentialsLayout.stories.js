import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

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
      isLoading={boolean("Is loading?", false)}
      error={text("Error", null)}
      nickname={text("Nickname", "Whatever")}
      setNickname={action("setNickname")}
      formValid={boolean("Form valid?", true)}
    />
    <OtherLoginOptions setError={action("setError")} setIsLoading={action("setIsLoading")} />
  </CredentialsLayout>
);

export const Register = () => (
  <CredentialsLayout action="register">
    <RegisterForm
      handleRegisterFunc={action("handleRegisterFunc")}
      isLoading={boolean("Is loading?", false)}
      error={text("Error", null)}
      nickname={text("Nickname", "Whatever")}
      setNickname={action("setNickname")}
      email={text("Email", "qwe@qwe.qwe")}
      setEmail={action("setEmail")}
      password={text("Password", "Whatever")}
      setPassword={action("setPassword")}
      formValid={boolean("Form valid?", true)}
    />
    <OtherLoginOptions setError={action("setError")} setIsLoading={action("setIsLoading")} />
  </CredentialsLayout>
);

export const Login = () => (
  <CredentialsLayout action="login">
    <LoginForm
      handleLoginFunc={action("handleLoginFunc")}
      isLoading={boolean("Is loading?", false)}
      error={text("Error", null)}
      email={text("Email", "qwe@qwe.qwe")}
      setEmail={action("setEmail")}
      password={text("Password", "Whatever")}
      setPassword={action("setPassword")}
      formValid={boolean("Form valid?", true)}
    />
    <OtherLoginOptions setError={action("setError")} setIsLoading={action("setIsLoading")} />
  </CredentialsLayout>
);

export const ChangePassword = () => (
  <CredentialsLayout
    action="change_password"
    modalOptions={{ closeIcon: true, onClose: action("onClose") }}
  >
    <ChangePasswordForm
      isLoading={boolean("Is loading?", false)}
      error={text("Error", null)}
      handleChangePassword={action("handleChangePassword")}
      success={text("Success", null)}
      newPassword={text("New password", "Whatever")}
      setNewPassword={action("setNewPassword")}
      formValid={boolean("Form valid?", true)}
    />
  </CredentialsLayout>
);
