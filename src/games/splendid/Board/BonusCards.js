import React from "react";
import PropTypes from "prop-types";
import { Card, Label, Icon } from "semantic-ui-react";

import { BonusCard } from "../GameCard";

import styles from "./Board.module.css";

const propTypes = {
  bonuses: PropTypes.array,
};

const BonusCards = ({ bonuses }) => (
  <>
    <Label as="span" color="pink" className={styles.ribbon} ribbon>
      <Icon name="star" />
      Bonus cards
    </Label>
    <Card.Group itemsPerRow={5}>
      {(bonuses || []).map(({ id, points, img, cost }) => (
        <BonusCard key={id} points={points} img={img} cost={cost} />
      ))}
    </Card.Group>
  </>
);

BonusCard.propTypes = propTypes;

export default BonusCards;
