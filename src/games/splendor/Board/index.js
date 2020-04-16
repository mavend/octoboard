import React, { useState, useCallback } from "react";
import { Segment } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";
import PlayerInfo from "./PlayerInfo";
import CardsTable from "./CardsTable";
import ReservedCards from "./ReservedCards";

const Board = () => {
  const { G } = useBoardGame();
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(null);

  const selectCard = useCallback(
    (cardId) => {
      if (loading) return;
      setSelectedCard((id) => (id === cardId ? null : cardId));
    },
    [loading, setSelectedCard]
  );

  const buyCard = useCallback(
    (id) => {
      setLoading(true);
      console.log("buy", id);
      setTimeout(() => {
        setLoading(false);
        setSelectedCard(null);
      }, 2000);
    },
    [setLoading]
  );

  const buyReservedCard = useCallback(
    (id) => {
      setLoading(true);
      console.log("buy reserved", id);
      setTimeout(() => {
        setLoading(false);
        setSelectedCard(null);
      }, 2000);
    },
    [setLoading]
  );

  const extraPlayerContent = useCallback(
    ({ data: { tokens, cards, reservedCards } }) => (
      <PlayerInfo tokens={tokens} cards={cards}>
        <ReservedCards
          cards={reservedCards}
          selectedCard={selectedCard}
          onSelect={selectCard}
          loading={loading}
          onBuy={buyReservedCard}
        />
      </PlayerInfo>
    ),
    [selectedCard, loading, buyReservedCard, selectCard]
  );

  return (
    <GameLayout gameName={"Splendor"} extraPlayerContent={extraPlayerContent} sidebarHeader={<></>}>
      <Segment style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {G.table && (
          <CardsTable
            table={G.table}
            selectedCard={selectedCard}
            onSelect={selectCard}
            loading={loading}
            onBuy={buyCard}
          />
        )}
      </Segment>
    </GameLayout>
  );
};

export default Board;
