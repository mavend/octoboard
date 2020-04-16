import React from "react";
import { action } from "@storybook/addon-actions";

import Sidebar from "./";

export default {
  component: Sidebar,
  title: "Kalambury/Sidebar",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <Sidebar
    handleActionClick={action("handleActionClick")}
    extraPlayerContent={({ profile: { displayName } }) => <span>Hello {displayName}!</span>}
  />
);
