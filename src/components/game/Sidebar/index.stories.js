import React from "react";
import { action } from "@storybook/addon-actions";

import { gameDecorator } from "../GameContextMock";
import Sidebar from "./";

export default {
  component: Sidebar,
  title: "Sidebar",
  excludeStories: /.*Data$/,
  decorators: [gameDecorator],
};

export const Default = () => (
  <Sidebar
    handleActionClick={action("handleActionClick")}
    extraPlayerContent={({ profile: { displayName } }) => <span>Hello {displayName}!</span>}
  />
);
