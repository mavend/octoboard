import React from "react";
import { Popup, Icon, Header } from "semantic-ui-react";

import GameCard from "../GameCard";

import styles from "./Board.module.css";

const MAX_RESERVED = 3;

const ReservedCards = ({ cards, selectedCard, loading, onSelect, onBuy }) => (
  <Popup
    position="bottom right"
    on="click"
    trigger={
      <Icon
        title="Reserved cards"
        name="bookmark"
        color={cards.length > 0 ? "yellow" : "grey"}
        size="big"
        className={styles.bookmark}
      />
    }
  >
    {cards.length > 0 ? (
      <>
        <Header as="h3" textAlign="center" color="grey">
          Reserved cards ({cards.length}/{MAX_RESERVED})
        </Header>
        <div className={styles.reservedCards}>
          {cards.map((card) => (
            <GameCard
              key={card.id}
              small
              loading={loading}
              active={true}
              canBuy={true}
              selected={card.id === selectedCard}
              onClick={() => onSelect(card.id)}
              onBuy={() => onBuy(card.id)}
              {...card}
            />
          ))}
        </div>
      </>
    ) : (
      "No reserved cards"
    )}
  </Popup>
);

export default ReservedCards;
