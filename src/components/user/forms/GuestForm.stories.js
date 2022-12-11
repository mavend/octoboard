import React from "react";
import { action } from "@storybook/addon-actions";

import GuestForm from "./GuestForm";

export default {
  component: GuestForm,
  title: "User/Forms/GuestForm",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <GuestForm
    handleLoginFunc={action("handleLoginFunc")}
    isLoading={false}
    error={null}
    nickname="Whatever"
    setNickname={action("setNickname")}
    formValid={true}
  />
);
