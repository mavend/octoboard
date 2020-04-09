import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import RegisterForm from "./RegisterForm";

export default {
  component: RegisterForm,
  title: "User/Forms/RegisterForm",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <RegisterForm
    handleRegisterFunc={action("handleRegisterFunc")}
    isLoading={boolean("Is loading?", false)}
    error={text("Error", null)}
    nickname={text("Nickname", "Whatever")}
    setNickname={action("setNickname")}
    email={text("Email", "qwe@qwe.qwe")}
    password={text("Password", "qweqweqwe")}
    setPasssword={action("setPassword")}
    setEmail={action("setEmail")}
    formValid={boolean("Form valid?", true)}
  />
);
