import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number, text } from "@storybook/addon-knobs";
import lines from "games/kalambury/data/stories/lines";

import GuessingBoard from "./GuessingBoard";

export default {
  component: GuessingBoard,
  title: "Kalambury/GuessingBoard",
  excludeStories: /.*Data$/,
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
