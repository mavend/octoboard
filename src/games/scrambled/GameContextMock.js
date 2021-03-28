import React from "react";
import PropTypes from "prop-types";
import { select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BoardGameProvider } from "contexts/BoardGameContext";

const ref = "Game Context";

const propTypes = {
  overrideG: PropTypes.object,
  overrideCtx: PropTypes.object,
};
const BoardGameContextMock = ({ children, overrideG, overrideCtx }) => {
  return (
    <BoardGameProvider
      gameName="Scrambled"
      G={{
        language: select("Language", ["en", "pl"], "en", ref),
        initialWordPlayed: true,
        board: [
          {
            row: [
              { bonus: { type: "word", multiply: 3 } },
              { letter: "L", points: 2 },
              { letter: "O", points: 1 },
              { letter: null, replacement: "L", points: 0 },
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
            tiles: [
              { letter: "A", points: 1, id: 0 },
              { letter: "B", points: 2, id: 1 },
              { letter: null, points: 0, id: 2 },
              { letter: "Ż", points: 9, id: 3 },
              { letter: "Ó", points: 7, id: 4 },
            ],
            stage: select("stage", ["play", "wait"], "play", ref),
          },
          1: {},
        },
        ...overrideG,
      }}
      moves={{
        PlayTiles: action("PlayTiles"),
        SwapTiles: action("SwapTiles"),
        SkipTurn: action("SkipTurn"),
      }}
      ctx={{
        activePlayers: [],
        currentPlayer: "0",
        phase: select("phase", ["wait", "play"], "play", ref),
        ...overrideCtx,
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
BoardGameContextMock.propTypes = propTypes;

export default BoardGameContextMock;
export const scrambledDecorator = (storyFn) => (
  <BoardGameContextMock>{storyFn()}</BoardGameContextMock>
);
