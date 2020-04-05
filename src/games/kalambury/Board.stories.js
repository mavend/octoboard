import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, number, text, select } from "@storybook/addon-knobs";

import Board from "./Board";

export default {
  component: Board,
  title: "Kalambury/Board",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <Board
    G={{
      remainingSeconds: number("Remaining seconds", 100, {
        range: true,
        min: 0,
        max: 120,
        step: 1,
      }),
      playersData: {
        "0": {},
        "1": { isActive: true },
      },
      points: [10, 3],
      actions: [],
      privateRoom: boolean("Private", true),
      players: { "0": { phrase: text("Phrase", "Baba z wozu") }, "1": {} },
      canChangePhrase: boolean("Can change phrase?", true),
    }}
    ctx={{
      activePlayers: [select("action", ["draw", "guess", "wait", "manage"], "draw"), "draw"],
      phase: select("phase", ["wait", "play"], "play"),
      numPlayers: number("Player count", 4, { range: true, min: 2, max: 10, step: 1 }),
    }}
    playerID={0}
    moves={{
      Guess: action("Guess"),
      Ping: action("Ping"),
      UpdateDrawing: action("UpdateDrawing"),
    }}
    gameMetadata={[
      { id: "0", name: "user-0" },
      { id: "1", name: "user-1" },
    ]}
    rawClient={{ transport: { socket: null } }}
  />
);
