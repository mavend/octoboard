import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

import WaitingBoard from "./WaitingBoard";

export default {
  component: WaitingBoard,
  title: "Kalambury/WaitingBoard",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <WaitingBoard
    canManageGame={boolean("Can manage?", true)}
    setGuess={action("SetGuess")}
    guess={text("Message", "Dzień dobry")}
  />
);
