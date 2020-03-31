import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";
import lines from "games/kalambury/data/stories/lines";

import GameBoard from "./GameBoard";

export default {
  component: GameBoard,
  title: "Kalambury/GameBoard",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <GameBoard
    isDrawing={boolean("Is drawing?", true)}
    playerData={{}}
    G={{
      remainingSeconds: number("Remaining seconds", 100, {
        range: true,
        min: 0,
        max: 120,
        step: 1,
      }),
    }}
    ctx={{}}
    moves={{ Guess: action("Guess"), UpdateDrawing: action("UpdateDrawing") }}
    envokeLastAnswer={action("envokeLastAnswer")}
    getUserActions={() => []}
    actions={[]}
    playerID={number("Player ID", 1)}
    guessInputRef={{}}
    guess={text("Guess", "Baba z wozu?")}
    setGuess={action("SetGuess")}
    canChangePhrase={boolean("Can change phrase?", true)}
    ChangePhrase={action("ChangePhrase")}
    t={{}}
    rawClient={{ transport: {} }}
  />
);
