import React from "react";
import { boolean, number, text, select } from "@storybook/addon-knobs";
import { BoardGameProvider } from "contexts/BoardGameContext";

const ref = "Game Context";

const BoardGameContextMock = ({ children }) => {
  return (
    <BoardGameProvider
      gameName="SuperGame"
      G={{
        points: [10, 3],
        maxPoints: number("Max points", 15, ref),
        actions: [
          { action: "message", text: text("Message text", "Hello there, shall we begin?", ref) },
        ],
        privateMatch: boolean("Private", true, ref),
        players: {
          0: {},
          1: {},
        },
      }}
      moves={{}}
      ctx={{
        activePlayers: [],
        currentPlayer: "0",
        phase: select("phase", ["wait", "play"], "play", ref),
        numPlayers: number("Player count", 4, { range: true, min: 2, max: 10, step: 1 }, ref),
      }}
      playerID={"0"}
      matchID={"qwe123"}
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
export const gameDecorator = (storyFn) => <BoardGameContextMock>{storyFn()}</BoardGameContextMock>;
