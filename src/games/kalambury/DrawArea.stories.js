import React from "react";
import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";
import lines from "games/kalambury/data/stories/lines";
import { kalamburyDecorator } from "./GameContextMock";
import DrawArea from "./DrawArea";

export default {
  component: DrawArea,
  title: "Kalambury/DrawArea",
  excludeStories: /.*Data$/,
  decorators: [kalamburyDecorator],
};

export const Default = () => (
  <DrawArea
    lines={lines}
    setLines={action("setLines")}
    remainingSeconds={number("remainingSeconds", 40)}
  />
);
