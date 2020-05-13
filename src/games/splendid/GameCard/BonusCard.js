import React from "react";
import PropTypes from "prop-types";
import { Card, Image } from "semantic-ui-react";

import { imgUrl } from "../utils";
import { RESOURCES } from "../config";
import CardSymbol from "../CardSymbol";
import PointsBadge from "./PointsBadge";

import styles from "./GameCard.module.css";

const propTypes = {
  points: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  cost: PropTypes.shape(Object.fromEntries(RESOURCES.map((res) => [res, PropTypes.number])))
    .isRequired,
  onClick: PropTypes.func,
};

const BonusCard = ({ points, img, cost, onClick }) => {
  return (
    <Card onClick={onClick} className={`${styles.bonusCard}`}>
      <Card.Content className={styles.topContent}>
        <PointsBadge resource="gold" points={points} />
      </Card.Content>
      <div className={styles.imageBox}>
        <Image src={imgUrl(img)} ui={false} />
      </div>
      <Card.Content className={styles.bottomContent}>
        {Object.entries(cost).map(
          ([res, count]) =>
            count > 0 && <CardSymbol key={res} resource={res} count={count} raised />
        )}
      </Card.Content>
    </Card>
  );
};

BonusCard.propTypes = propTypes;

export default BonusCard;
