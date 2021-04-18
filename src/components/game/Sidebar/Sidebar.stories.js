import React from "react";

import { gameDecorator } from "../GameContextMock";
import Sidebar from ".";

export default {
  component: Sidebar,
  title: "Sidebar",
  excludeStories: /.*Data$/,
  decorators: [gameDecorator],
};

export const Default = () => (
  <Sidebar
    extraPlayerContent={({ profile: { displayName } }) => <span>Hello {displayName}!</span>}
  />
);
