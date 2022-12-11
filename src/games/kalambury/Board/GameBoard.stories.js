import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";

import { kalamburyDecorator } from "../GameContextMock";
import GameBoard from "./GameBoard";

export default {
  component: GameBoard,
  title: "Kalambury/GameBoard",
  excludeStories: /.*Data$/,
  decorators: [kalamburyDecorator],
};

export const Default = () => (
  <GameBoard
    envokeLastAnswer={action("envokeLastAnswer")}
    guessInputRef={useRef()}
    guess="Baba z wozu?"
    setGuess={action("SetGuess")}
    ChangePhrase={action("ChangePhrase")}
  />
);
