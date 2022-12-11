import React from "react";
import { action } from "@storybook/addon-actions";
import { BoardGameProvider } from "contexts/BoardGameContext";
import cards from "./data/cards.json";
import bonuses from "./data/bonuses.json";

const BoardGameContextMock = ({ children }) => {
  return (
    <BoardGameProvider
      gameName="Splendid"
      G={{
        table: {
          1: cards["1"].slice(0, 4),
          2: [...cards["2"].slice(0, 3), null],
          3: cards["3"].slice(0, 4),
        },
        tokens: { edu: 7, water: 7, nature: 3, tech: 7, lab: 5, gold: 5 },
        points: [10, 3],
        players: {
          0: {
            tokens: { edu: 0, water: 1, nature: 2, tech: 3, lab: 0, gold: 0 },
            cards: { edu: 0, water: 1, nature: 2, tech: 3, lab: 0 },
            reservedCards: [cards["2"][4], cards["1"][25]],
          },
          1: {
            tokens: { edu: 1, water: 1, nature: 0, tech: 0, lab: 1, gold: 2 },
            cards: { edu: 2, water: 0, nature: 1, tech: 3, lab: 4 },
            reservedCards: [],
          },
        },
        bonuses: bonuses.slice(0, 5),
      }}
      moves={{
        BuyCard: action("BuyCard"),
        ReserveCard: action("ReserveCard"),
        TakeTokens: action("TakeTokens"),
      }}
      ctx={{
        activePlayers: [],
        currentPlayer: "0",
        phase: "play",
      }}
      playerID={"0"}
      matchID={"qwe123"}
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
export const splendidDecorator = (storyFn) => (
  <BoardGameContextMock>{storyFn()}</BoardGameContextMock>
);
