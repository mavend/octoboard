import React from "react";
import { boolean, number, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BoardGameProvider } from "contexts/BoardGameContext";
import { actionsDataMock } from "plugins/actions.mock";

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
        points: [10, 3, 6],
        maxPoints: number("Max points", 15, ref),
        privateMatch: boolean("Private", true, ref),
        players: {
          0: {
            phrase: text("Phrase", "Baba z wozu", ref),
          },
          1: {},
        },
        canChangePhrase: boolean("Can change phrase?", true, ref),
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
    >
      {children}
    </BoardGameProvider>
  );
};

export default BoardGameContextMock;
export const kalamburyDecorator = (storyFn) => (
  <BoardGameContextMock>{storyFn()}</BoardGameContextMock>
);
