import React from "react";
import { Card } from "semantic-ui-react";
import GameCard, { PlaceholderCard } from "../GameCard";

const LEVELS_ORDER = ["3", "2", "1"];

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
    <Card.Group key={level} itemsPerRow={4}>
      {table[level].map((card, idx) =>
        card ? (
          <GameCard
            key={card.id}
            active={active}
            selected={card.id === selectedCard}
            loading={loading}
            onClick={() => onSelect(card.id)}
            onBuy={() => onBuy(level, card.id)}
            canBuy={canBuy(card)}
            onReserve={onReserve}
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
