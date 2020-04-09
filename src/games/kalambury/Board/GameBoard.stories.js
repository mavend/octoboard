import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import GameBoard from "./GameBoard";

export default {
  component: GameBoard,
  title: "Kalambury/GameBoard",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <GameBoard
    envokeLastAnswer={action("envokeLastAnswer")}
    guessInputRef={{}}
    guess={text("Guess", "Baba z wozu?")}
    setGuess={action("SetGuess")}
    canChangePhrase={boolean("Can change phrase?", true)}
    ChangePhrase={action("ChangePhrase")}
  />
);
