import React from "react";
import { boolean, number, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BoardGameContext } from "contexts/BoardGameContext";

const ref = "Game Context";

const BoardGameContextMock = ({ children }) => (
  <BoardGameContext.Provider
    value={{
      G: {
        remainingSeconds: number(
          "Remaining seconds",
          100,
          {
            range: true,
            min: 0,
            max: 120,
            step: 1,
          },
          ref
        ),
        playersData: {
          "0": {},
          "1": { isActive: true },
        },
        points: [10, 3],
        actions: [],
        privateRoom: boolean("Private", true, ref),
        players: { "0": { phrase: text("Phrase", "Baba z wozu", ref) }, "1": {} },
        canChangePhrase: boolean("Can change phrase?", true, ref),
      },
      ctx: {
        activePlayers: [select("action", ["draw", "guess", "wait", "manage"], "draw", ref), "draw"],
        phase: select("phase", ["wait", "play"], "play", ref),
        numPlayers: number("Player count", 4, { range: true, min: 2, max: 10, step: 1 }, ref),
      },
      moves: {
        Guess: action("Guess"),
        Ping: action("Ping"),
        UpdateDrawing: action("UpdateDrawing"),
      },
      playerID: 0,
      rawClient: { transport: { socket: null } },
      gameMetadata: [
        { id: "0", name: "user-0" },
        { id: "1", name: "user-1" },
      ],
    }}
  >
    {children}
  </BoardGameContext.Provider>
);

export default BoardGameContextMock;
