import React from "react";
import { action } from "@storybook/addon-actions";

import ChangePasswordForm from "./ChangePasswordForm";

export default {
  component: ChangePasswordForm,
  title: "User/Forms/ChangePasswordForm",
  excludeStories: /.*Data$/,
};

export const Default = (args) => (
  <ChangePasswordForm handleChangePassword={action("handleChangePassword")} {...args} />
);

Default.args = {
  isLoading: false,
  error: null,
  success: null,
  newPassword: "qweqweqwe",
  formValid: true,
};
