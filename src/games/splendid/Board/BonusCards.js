import React from "react";
import { Card, Label, Icon } from "semantic-ui-react";

import { BonusCard } from "../GameCard";

import styles from "./Board.module.css";

const BonusCards = () => (
  <>
    <Label as="span" color="pink" className={styles.ribbon} ribbon>
      <Icon name="star" />
      Bonus cards
    </Label>
    <Card.Group itemsPerRow={5}>
      <BonusCard />
      <BonusCard />
      <BonusCard />
      <BonusCard />
      <BonusCard />
    </Card.Group>
  </>
);

export default BonusCards;
