import React from "react";
import { action } from "@storybook/addon-actions";
import lines from "games/kalambury/data/stories/lines";
import { kalamburyDecorator } from "./GameContextMock";
import DrawArea from "./DrawArea";

export default {
  component: DrawArea,
  title: "Kalambury/DrawArea",
  excludeStories: /.*Data$/,
  decorators: [kalamburyDecorator],
};

export const Default = () => <DrawArea lines={lines} updateLines={action("updateLines")} />;
