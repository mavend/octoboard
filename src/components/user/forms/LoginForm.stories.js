import React from "react";
import { action } from "@storybook/addon-actions";

import LoginForm from "./LoginForm";

export default {
  component: LoginForm,
  title: "User/Forms/LoginForm",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <LoginForm
    handleLoginFunc={action("handleLoginFunc")}
    isLoading={false}
    error={null}
    email="qwe@qwe.qwe"
    password="qweqweqwe"
    setPasssword={action("setPassword")}
    setEmail={action("setEmail")}
    formValid={true}
  />
);
