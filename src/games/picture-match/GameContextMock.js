import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, number, select } from "@storybook/addon-knobs";
import { BoardGameProvider } from "contexts/BoardGameContext";
import { actionsDataMock } from "plugins/actions.mock";

const ref = "Game Context";

const BoardGameContextMock = ({ children }) => {
  return (
    <BoardGameProvider
      gameName="PictureMatch"
      G={{
        points: [10, 3],
        maxPoints: number("Max points", 15, ref),
        privateMatch: boolean("Private", true, ref),
        pictures: [],
        players: {
          0: {
            card: { pictures: [], layout: 0, rotation: 0 },
          },
          1: {},
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
      matchID={"qwe123"}
      matchData={[
        { id: 0, name: "user-0", isConnected: true },
        { id: 1, name: "user-1", isConnected: false },
        { id: 2, name: "user-2", isConnected: true },
        { id: 3 },
      ]}
      chatMessages={[]}
      sendChatMessage={action("sendChatMessage")}
      plugins={{
        actions: actionsDataMock({
          2: [
            { id: 2, playerID: "2", name: "match", data: { picture: "5", style: "emoji" } },
            { id: 3, playerID: "2", name: "match", data: { picture: "11", style: "lines" } },
            { id: 4, playerID: "2", name: "match", data: { picture: "16", style: "circle" } },
          ],
        }),
      }}
    >
      {children}
    </BoardGameProvider>
  );
};

export default BoardGameContextMock;
export const pictureMatchDecorator = (storyFn) => (
  <BoardGameContextMock>{storyFn()}</BoardGameContextMock>
);
