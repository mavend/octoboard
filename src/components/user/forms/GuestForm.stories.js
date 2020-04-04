import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select, boolean, text } from "@storybook/addon-knobs";

import GuestForm from "./GuestForm";

export default {
  component: GuestForm,
  title: "User/Forms/GuestForm",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <GuestForm
    handleLoginFunc={action("handleLoginFunc")}
    isLoading={boolean("Is loading?", false)}
    error={text("Error", null)}
    nickname={text("Nickname", "Whatever")}
    setNickname={action("setNickname")}
    formValid={boolean("Form valid?", true)}
  />
);
