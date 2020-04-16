import React from "react";
import { Card } from "semantic-ui-react";
import GameCard, { PlaceholderCard } from "../GameCard";

const LEVELS_ORDER = ["3", "2", "1"];

const CardsTable = ({ table, selectedCard, loading, onSelect, onBuy }) =>
  LEVELS_ORDER.map((level) => (
    <Card.Group key={level} itemsPerRow={4}>
      {table[level].map((card, idx) =>
        card ? (
          <GameCard
            key={card.id}
            active={level == 2}
            selected={card.id === selectedCard}
            loading={loading}
            canBuy={card.id % 2 === 0}
            onClick={() => onSelect(card.id)}
            onBuy={() => onBuy(card.id)}
            onReserve={() => console.log("reserve")}
            {...card}
          />
        ) : (
          <PlaceholderCard key={`${level}-${idx}`} />
        )
      )}
    </Card.Group>
  ));

export default CardsTable;
