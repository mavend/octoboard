import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import ChangePasswordForm from "./ChangePasswordForm";

export default {
  component: ChangePasswordForm,
  title: "User/Forms/ChangePasswordForm",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <ChangePasswordForm
    handleChangePassword={action("handleChangePassword")}
    isLoading={boolean("Is loading?", false)}
    error={text("Error", null)}
    success={text("Success", null)}
    newPassword={text("New password", "qweqweqwe")}
    setNewPasssword={action("setPassword")}
    formValid={boolean("Form valid?", true)}
  />
);
