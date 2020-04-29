import React, { useState, useEffect, useCallback } from "react";
import { Segment } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";
import { canBuyCard } from "../utils";
import BonusCards from "./BonusCards";
import TokensShop from "./TokensShop";
import PlayerInfo from "./PlayerInfo";
import CardsTable from "./CardsTable";
import ReservedCards from "./ReservedCards";

import styles from "./Board.module.css";

const Board = () => {
  const { G, ctx, moves, player, playerID } = useBoardGame();
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(null);

  const isActivePlayer = ctx.currentPlayer === playerID;

  useEffect(() => {
    setSelectedCard(null);
    setLoading(false);
  }, [isActivePlayer, setSelectedCard, setLoading]);

  const selectCard = useCallback(
    (cardId) => {
      if (loading) return;
      setSelectedCard((id) => (id === cardId ? null : cardId));
    },
    [loading, setSelectedCard]
  );

  const canBuy = useCallback(
    (card) => {
      const { tokens, cards } = player;
      return canBuyCard(tokens, cards, card);
    },
    [player]
  );

  const buyCard = useCallback(
    (level, id) => {
      moves.BuyCard(level, id);
    },
    [moves]
  );

  const buyReservedCard = useCallback(
    (id) => {
      moves.BuyReservedCard(id);
    },
    [moves]
  );

  const reserveCard = useCallback(
    (level, id) => {
      setLoading(true);
      moves.ReserveCard(level, id);
    },
    [moves, setLoading]
  );

  const takeTokens = useCallback(
    (tokens) => {
      setLoading(true);
      moves.TakeTokens(tokens);
    },
    [moves, setLoading]
  );

  const extraPlayerContent = useCallback(
    ({ tokens, cards, reservedCards }) => (
      <PlayerInfo tokens={tokens} cards={cards}>
        <ReservedCards
          cards={reservedCards}
          selectedCard={selectedCard}
          onSelect={selectCard}
          loading={loading}
          active={isActivePlayer}
          onBuy={buyReservedCard}
          canBuy={canBuy}
        />
      </PlayerInfo>
    ),
    [selectedCard, loading, buyReservedCard, selectCard, canBuy, isActivePlayer]
  );

  return (
    <GameLayout
      gameName={"Splendid"}
      header={
        <Segment className={styles.topBar}>
          <BonusCards />
          <TokensShop tokens={G.tokens} active={isActivePlayer} onTakeTokens={takeTokens} />
        </Segment>
      }
      sidebarHeader={<></>}
      sidebarSize={5}
      extraPlayerContent={extraPlayerContent}
    >
      <Segment style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {G.table && (
          <CardsTable
            table={G.table}
            active={isActivePlayer}
            selectedCard={selectedCard}
            onSelect={selectCard}
            loading={loading}
            onBuy={buyCard}
            canBuy={canBuy}
            onReserve={reserveCard}
          />
        )}
        <button onClick={() => moves.StartGame()}>Start Game</button>
      </Segment>
    </GameLayout>
  );
};

export default Board;
