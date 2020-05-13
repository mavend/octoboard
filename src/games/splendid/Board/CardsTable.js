import React from "react";
import { Card } from "semantic-ui-react";
import GameCard, { PlaceholderCard } from "../GameCard";
import styles from "./Board.module.css";

const LEVELS_ORDER = ["1", "2", "3"];

const CardsTable = ({
  table,
  active,
  selectedCard,
  loading,
  onSelect,
  onBuy,
  canBuy,
  onReserve,
  canReserve,
}) =>
  LEVELS_ORDER.map((level) => (
    <Card.Group key={level} itemsPerRow={4} className={styles.cardsRow}>
      {table[level].map((card, idx) =>
        card ? (
          <GameCard
            key={card.id}
            active={active}
            selected={card.id === selectedCard}
            loading={loading}
            onClick={() => onSelect(card.id)}
            onBuy={() => onBuy(card)}
            canBuy={canBuy(card)}
            onReserve={() => onReserve(card)}
            canReserve={canReserve}
            {...card}
          />
        ) : (
          <PlaceholderCard key={`${level}-${idx}`} />
        )
      )}
    </Card.Group>
  ));

export default CardsTable;
