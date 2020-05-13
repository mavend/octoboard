import React from "react";
import { boolean, number, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BoardGameProvider } from "contexts/BoardGameContext";

const ref = "Game Context";

const BoardGameContextMock = ({ children }) => {
  return (
    <BoardGameProvider
      gameName="Kalambury"
      G={{
        timePerTurn: 120,
        turnEndTime:
          Math.floor(new Date().getTime() / 1000) +
          number(
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
        points: [10, 3],
        maxPoints: number("Max points", 15, ref),
        actions: [
          { action: "message", text: text("Message text", "Hello there, shall we begin?", ref) },
        ],
        privateRoom: boolean("Private", true, ref),
        players: {
          "0": {
            phrase: text("Phrase", "Baba z wozu", ref),
          },
          "1": {},
        },
        canChangePhrase: boolean("Can change phrase?", true, ref),
      }}
      moves={{
        Guess: action("Guess"),
        Ping: action("Ping"),
        UpdateDrawing: action("UpdateDrawing"),
        NotifyTimeout: action("NotifyTimeout"),
      }}
      ctx={{
        activePlayers: [
          select("stage", ["draw", "guess", "wait", "manage", "match"], "draw", ref),
          "guess",
          "guess",
          "guess",
        ],
        currentPlayer: "0",
        phase: select("phase", ["wait", "play"], "play", ref),
      }}
      playerID={"0"}
      gameID={"qwe123"}
      rawClient={{ transport: { socket: null } }}
      gameMetadata={[
        { id: 0, name: "user-0", isConnected: true },
        { id: 1, name: "user-1", isConnected: false },
        { id: 2, name: "user-2", isConnected: true },
        { id: 3 },
      ]}
    >
      {children}
    </BoardGameProvider>
  );
};

export default BoardGameContextMock;
export const kalamburyDecorator = (storyFn) => (
  <BoardGameContextMock>{storyFn()}</BoardGameContextMock>
);
