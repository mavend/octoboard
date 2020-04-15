import React from "react";
import PropTypes from "prop-types";
import { Card, Image } from "semantic-ui-react";

import { RESOURCES } from "../config";
import Resource from "../Resource";
import ResourceToken from "../ResourceToken";
import PointsBadge from "../PointsBadge";

import styles from "./GameCard.module.css";

function imgUrl(name) {
  return `/images/games/splendor/cards/${name}`;
}

const LEVEL_COLOR = ["green", "orange", "blue"];

const propTypes = {
  level: PropTypes.number.isRequired,
  resource: PropTypes.oneOf(RESOURCES).isRequired,
  img: PropTypes.string.isRequired,
  cost: PropTypes.shape(Object.fromEntries(RESOURCES.map((res) => [res, PropTypes.number])))
    .isRequired,
  points: PropTypes.number,
};

const GameCard = ({ level, resource, points, img, cost }) => {
  return (
    <Card className={styles.card} color={LEVEL_COLOR[level - 1]}>
      <Card.Content className={styles.topContent}>
        <Resource type={resource} />
        {points > 0 && <PointsBadge resource={resource} points={points} />}
        <Resource type={resource} />
      </Card.Content>
      <div className={styles.imageBox}>
        <Image src={imgUrl(img)} ui={false} />
      </div>
      <Card.Content className={styles.bottomContent}>
        {Object.keys(cost).map(
          (res) => cost[res] > 0 && <ResourceToken key={res} type={res} count={cost[res]} />
        )}
      </Card.Content>
    </Card>
  );
};

export const PlaceholderCard = () => <Card className={styles.cardPlaceholder}></Card>;

GameCard.propTypes = propTypes;

export default GameCard;
