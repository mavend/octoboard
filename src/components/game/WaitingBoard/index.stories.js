import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { gameDecorator } from "../GameContextMock";
import WaitingBoard from ".";

export default {
  component: WaitingBoard,
  title: "WaitingBoard",
  excludeStories: /.*Data$/,
  decorators: [gameDecorator],
};

export const Default = () => (
  <WaitingBoard
    setGuess={action("SetGuess")}
    guess={text("Message", "Dzień dobry")}
    onStartGame={action("onStartGame")}
  />
);

export const WithSettings = () => (
  <WaitingBoard
    setGuess={action("SetGuess")}
    guess={text("Message", "Dzień dobry")}
    onStartGame={action("onStartGame")}
  >
    <h1>Some form or whatever</h1>
  </WaitingBoard>
);
