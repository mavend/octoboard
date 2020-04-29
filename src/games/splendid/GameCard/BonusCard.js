import React from "react";
// import PropTypes from "prop-types";
import { Card, Image } from "semantic-ui-react";

import CardSymbol from "../CardSymbol";
import PointsBadge from "./PointsBadge";

import styles from "./GameCard.module.css";

function imgUrl(name) {
  return `/images/games/splendid/cards/${name}`;
}

const BonusCard = () => {
  return (
    <Card className={`${styles.bonusCard}`}>
      <Card.Content className={styles.topContent}>
        <PointsBadge resource="gold" points={3} />
      </Card.Content>
      <div className={styles.imageBox}>
        <Image src={imgUrl("search.png")} ui={false} />
      </div>
      <Card.Content className={styles.bottomContent}>
        <CardSymbol resource={"water"} count={3} raised />
        <CardSymbol resource={"nature"} count={3} raised />
        <CardSymbol resource={"tech"} count={3} raised />
      </Card.Content>
    </Card>
  );
};

export default BonusCard;
