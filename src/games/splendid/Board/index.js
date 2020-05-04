import React, { useState, useEffect, useCallback } from "react";
import { Segment } from "semantic-ui-react";
import { toast } from "react-toastify";
import { sum } from "lodash";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";
import { canBuyCard, canTakeBonus } from "../utils";
import WaitingBoard from "./WaitingBoard";
import BonusCards from "./BonusCards";
import TokensShop from "./TokensShop";
import PlayerInfo from "./PlayerInfo";
import CardsTable from "./CardsTable";
import ReservedCards from "./ReservedCards";
import BonusCardsModal from "./BonusCardsModal";

import styles from "./Board.module.css";

const Board = () => {
  const { G, ctx, moves, players, player, playerID } = useBoardGame();
  const [selectedCard, setSelectedCard] = useState(null);
  const [availableBonuses, setAvailableBonuses] = useState(null);
  const [loading, setLoading] = useState(null);

  const hasGameStarted = ctx.phase !== "wait";
  const isActivePlayer = ctx.currentPlayer === playerID;

  useEffect(() => {
    setSelectedCard(null);
    setLoading(false);
    if (isActivePlayer && hasGameStarted) {
      toast.success("🎲 Your turn!", { autoClose: 2000 });
    }
  }, [isActivePlayer, hasGameStarted, setSelectedCard, setLoading]);

  useEffect(() => {
    const bonuses = G.bonuses.filter((bonus) => canTakeBonus(player.cards, bonus));
    setAvailableBonuses(bonuses);
  }, [player.cards, G.bonuses, setAvailableBonuses]);

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
    (card) => {
      if (canBuy(card)) {
        const { level, id } = card;
        setLoading(true);
        moves.BuyCard(level, id);
      } else {
        toast.error("⛔️Not enough resources");
      }
    },
    [moves, canBuy]
  );

  const buyReservedCard = useCallback(
    (card) => {
      if (canBuy(card)) {
        const { id } = card;
        setLoading(true);
        moves.BuyReserved(id);
      } else {
        toast.error("⛔️Not enough resources");
      }
    },
    [moves, canBuy]
  );

  const reserveCard = useCallback(
    (card) => {
      const playerTokens = sum(Object.values(player.tokens));
      if (playerTokens < 10) {
        const { level, id } = card;
        setLoading(true);
        moves.ReserveCard(level, id);
      } else {
        toast.error("⛔️You can't have more than 10 tokens!");
      }
    },
    [player, moves, setLoading]
  );

  const takeTokens = useCallback(
    (tokens) => {
      const takenTokens = sum(Object.values(tokens));
      const playerTokens = sum(Object.values(player.tokens));
      if (playerTokens + takenTokens <= 10) {
        setLoading(true);
        moves.TakeTokens(tokens);
      } else {
        toast.error("⛔️You can't have more than 10 tokens!");
      }
    },
    [player, moves, setLoading]
  );

  const discardToken = useCallback(
    (resource) => {
      if (player.tokens[resource] > 0) {
        setLoading(true);
        moves.DiscardToken(resource);
      } else {
        toast.error("⛔️Not enough resources");
      }
    },
    [player, moves]
  );

  const takeBonus = useCallback(
    (id) => {
      moves.TakeBonus(id);
    },
    [moves]
  );

  const extraPlayerContent = useCallback(
    ({ isYou, isCurrentPlayer, tokens, cards, reservedCards }) => (
      <PlayerInfo
        tokens={tokens}
        cards={cards}
        onDiscardToken={isYou && isCurrentPlayer ? discardToken : undefined}
      >
        <ReservedCards
          cards={reservedCards}
          selectedCard={selectedCard}
          onSelect={selectCard}
          loading={loading}
          active={isCurrentPlayer}
          onBuy={buyReservedCard}
          canBuy={canBuy}
        />
      </PlayerInfo>
    ),
    [selectedCard, loading, buyReservedCard, selectCard, canBuy, discardToken]
  );

  if (!hasGameStarted) {
    return (
      <WaitingBoard
        canManageGame={player.canManageGame}
        currentPlayers={players.filter((p) => p.uid).length}
        totalPlayers={ctx.numPlayers}
        onStartGame={() => moves.StartGame()}
      />
    );
  }

  return (
    <GameLayout
      gameName={"Splendid"}
      header={
        <Segment className={styles.topBar}>
          <BonusCards bonuses={G.bonuses || []} />
          <TokensShop
            tokens={G.tokens}
            active={isActivePlayer}
            loading={loading}
            onTakeTokens={takeTokens}
          />
        </Segment>
      }
      sidebarHeader={<></>}
      sidebarSize={5}
      extraPlayerContent={extraPlayerContent}
    >
      <Segment className={styles.mainBoard}>
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
      </Segment>
      <BonusCardsModal
        open={player.stage === "bonus"}
        bonuses={availableBonuses}
        onTake={takeBonus}
      />
    </GameLayout>
  );
};

export default Board;
