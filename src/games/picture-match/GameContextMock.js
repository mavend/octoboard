import React from "react";
import { boolean, number, text, select } from "@storybook/addon-knobs";
import { BoardGameProvider } from "contexts/BoardGameContext";

const ref = "Game Context";

const BoardGameContextMock = ({ children }) => {
  return (
    <BoardGameProvider
      gameName="PictureMatch"
      G={{
        points: [10, 3],
        maxPoints: number("Max points", 15, ref),
        actions: [
          { action: "message", text: text("Message text", "Hello there, shall we begin?", ref) },
        ],
        privateRoom: boolean("Private", true, ref),
        pictures: [],
        players: {
          "0": {
            card: { pictures: [], layout: 0, rotation: 0 },
          },
          "1": {},
        },
        currentCard: { pictures: [], layout: 0, rotation: 0 },
      }}
      moves={{}}
      ctx={{
        activePlayers: [
          select("match", ["match", "wait"], "match", ref),
          "match",
          "match",
          "match",
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
export const pictureMatchDecorator = (storyFn) => (
  <BoardGameContextMock>{storyFn()}</BoardGameContextMock>
);
