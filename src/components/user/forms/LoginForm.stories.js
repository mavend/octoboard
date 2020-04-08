import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import LoginForm from "./LoginForm";

export default {
  component: LoginForm,
  title: "User/Forms/LoginForm",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <LoginForm
    handleLoginFunc={action("handleLoginFunc")}
    isLoading={boolean("Is loading?", false)}
    error={text("Error", null)}
    email={text("Email", "qwe@qwe.qwe")}
    password={text("Password", "qweqweqwe")}
    setPasssword={action("setPassword")}
    setEmail={action("setEmail")}
    formValid={boolean("Form valid?", true)}
  />
);
