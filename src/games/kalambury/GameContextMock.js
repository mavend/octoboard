import React from "react";
import { action } from "@storybook/addon-actions";
import { BoardGameProvider } from "contexts/BoardGameContext";
import { actionsDataMock } from "plugins/actions.mock";

const BoardGameContextMock = ({ children, ...args }) => {
  return (
    <BoardGameProvider
      gameName="Kalambury"
      G={{
        timePerTurn: 120,
        turnEndTime: Math.floor(new Date().getTime() / 1000) + 100,
        points: [10, 3, 6],
        maxPoints: 15,
        privateMatch: true,
        players: {
          0: {
            phrase: "Baba z wozu",
          },
          1: {},
        },
        canChangePhrase: true,
      }}
      moves={{
        Guess: action("Guess"),
        Ping: action("Ping"),
        NotifyTimeout: action("NotifyTimeout"),
        UpdateConnectedPlayers: action("UpdateConnectedPlayers"),
        ChangePhrase: action("ChangePhrase"),
        Forfeit: action("Forfeit"),
      }}
      ctx={{
        activePlayers: ["draw", "guess", "guess", "guess"],
        currentPlayer: "0",
        phase: "play",
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
        actions: actionsDataMock({
          1: [
            { id: 2, playerID: "1", name: "guess", data: { phrase: "abc", success: false } },
            { id: 3, playerID: "1", name: "guess", data: { phrase: "foobar", success: true } },
            { id: 4, playerID: "1", name: "draw" },
          ],
          2: [
            { id: 5, playerID: "2", name: "timeout", data: { phrase: "toster" } },
            { id: 6, playerID: "2", name: "forfeit", data: { phrase: "toster" } },
            { id: 7, playerID: "2", name: "change", data: { phrase: "toster" } },
          ],
        }),
      }}
      chatMessages={[]}
      sendChatMessage={action("sendChatMessage")}
      {...args}
    >
      {children}
    </BoardGameProvider>
  );
};

export default BoardGameContextMock;
export const kalamburyDecorator = (storyFn) => (
  <BoardGameContextMock>{storyFn()}</BoardGameContextMock>
);
