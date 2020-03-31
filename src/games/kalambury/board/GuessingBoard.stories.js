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
    G={{
      remainingSeconds: number("Remaining seconds", 100, {
        range: true,
        min: 0,
        max: 120,
        step: 1,
      }),
    }}
    moves={{ Guess: action("Guess") }}
    rawClient={{}}
    guess={text("Guess", "Baba z wozu?")}
    setGuess={action("SetGuess")}
    guessInputRef={{}}
    previousUserGuesses={[]}
    envokeLastAnswer={action("envokeLastAnswer")}
  />
);
