import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";

import lines from "../data/stories/lines";
import { kalamburyDecorator } from "../GameContextMock";
import GuessingBoard from "./GuessingBoard";

export default {
  component: GuessingBoard,
  title: "Kalambury/GuessingBoard",
  excludeStories: /.*Data$/,
  decorators: [kalamburyDecorator],
};

export const Default = (args) => (
  <GuessingBoard
    lines={lines}
    setGuess={action("SetGuess")}
    lastUserGuess={{ id: 1, phrase: "Dziad z wozu?", success: false }}
    guessInputRef={useRef()}
    previousUserGuesses={[]}
    envokeLastAnswer={action("envokeLastAnswer")}
    {...args}
  />
);

Default.args = {
  guess: "Baba z wozu?",
};
