import React from "react";
import { select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BoardGameProvider } from "contexts/BoardGameContext";

const ref = "Game Context";

const BoardGameContextMock = ({ children }) => {
  return (
    <BoardGameProvider
      gameName="Scrambled"
      G={{
        board: [
          {
            row: [
              { bonus: { type: "word", multiply: 3 } },
              { letter: "L", points: 2 },
              { letter: "O", points: 1 },
              { letter: "L", points: 2 },
            ],
          },
          { row: [{}, { bonus: { type: "letter", multiply: 2 } }, {}, {}] },
          {
            row: [
              {},
              { bonus: { type: "letter", multiply: 3 } },
              { bonus: { type: "word", multiply: 2 } },
              {},
            ],
          },
          {
            row: [
              { bonus: { type: "word", multiply: 2 } },
              {},
              {},
              { bonus: { type: "word", multiply: 2 }, start: true },
            ],
          },
        ],
        points: [10, 3],
        players: {
          0: {
            letters: [
              { letter: "A", points: 1 },
              { letter: "B", points: 2 },
              { letter: " ", points: 0 },
              { letter: "Ż", points: 9 },
              { letter: "Ó", points: 7 },
            ],
            stage: select("stage", ["play", "wait"], "play", ref),
          },
          1: {},
        },
      }}
      moves={{
        PlayTiles: action("PlayTiles"),
      }}
      ctx={{
        activePlayers: [],
        currentPlayer: "0",
        phase: select("phase", ["wait", "play"], "play", ref),
      }}
      playerID={"0"}
      gameID={"qwe123"}
      rawClient={{ transport: { socket: null } }}
      matchData={[
        { id: 0, name: "user-0", isConnected: true },
        { id: 1, name: "user-1", isConnected: false },
      ]}
      chatMessages={[]}
      sendChatMessage={action("sendChatMessage")}
    >
      {children}
    </BoardGameProvider>
  );
};

export default BoardGameContextMock;
export const scrambledDecorator = (storyFn) => (
  <BoardGameContextMock>{storyFn()}</BoardGameContextMock>
);
