/* eslint-disable react/prop-types */
import React from "react";
import { action } from "@storybook/addon-actions";
import { BoardGameProvider } from "contexts/BoardGameContext";

import { actionsDataMock } from "plugins/actions.mock";

const BoardGameContextMock = ({
  maxPoints,
  privateMatch,
  phase,
  numPlayers,
  children,
  ...args
}) => {
  return (
    <BoardGameProvider
      gameName="SuperGame"
      G={{
        points: [10, 3],
        maxPoints,
        privateMatch,
        players: {
          0: { canManageGame: true },
          1: {},
        },
      }}
      moves={{}}
      ctx={{
        activePlayers: [],
        currentPlayer: "0",
        phase,
        numPlayers,
      }}
      playerID={"0"}
      matchID={"qwe123"}
      matchData={[
        { id: 0, name: "user-0", isConnected: true },
        { id: 1, name: "user-1", isConnected: false },
        { id: 2, name: "user-2", isConnected: true },
        { id: 3 },
      ]}
      plugins={{
        actions: actionsDataMock(),
      }}
      chatMessages={[]}
      sendChatMessage={action("sendChatMessage")}
      {...args}
    >
      {children}
    </BoardGameProvider>
  );
};

BoardGameContextMock.args = {
  maxPoints: 15,
  privateMatch: true,
  phase: "play",
  numPlayers: 3,
};

export default BoardGameContextMock;
export const gameDecorator = (storyFn) => <BoardGameContextMock>{storyFn()}</BoardGameContextMock>;
