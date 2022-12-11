import React from "react";
import { action } from "@storybook/addon-actions";

import RegisterForm from "./RegisterForm";

export default {
  component: RegisterForm,
  title: "User/Forms/RegisterForm",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <RegisterForm
    handleRegisterFunc={action("handleRegisterFunc")}
    isLoading={false}
    error={null}
    nickname="Whatever"
    setNickname={action("setNickname")}
    email="qwe@qwe.qwe"
    password="qweqweqwe"
    setPasssword={action("setPassword")}
    setEmail={action("setEmail")}
    formValid={true}
  />
);
