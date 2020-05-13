import React from "react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";

import lines from "../data/stories/lines";
import { kalamburyDecorator } from "../GameContextMock";
import GuessingBoard from "./GuessingBoard";

export default {
  component: GuessingBoard,
  title: "Kalambury/GuessingBoard",
  excludeStories: /.*Data$/,
  decorators: [kalamburyDecorator],
};

export const Default = () => (
  <GuessingBoard
    lines={lines}
    guess={text("Guess", "Baba z wozu?")}
    setGuess={action("SetGuess")}
    lastUserGuess={text("Last Guess", "Dziad z wozu?")}
    guessInputRef={{}}
    previousUserGuesses={[]}
    envokeLastAnswer={action("envokeLastAnswer")}
  />
);
