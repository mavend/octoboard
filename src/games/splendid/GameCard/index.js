import React from "react";
import PropTypes from "prop-types";
import { Card, Image, Dimmer, Button, Icon } from "semantic-ui-react";
import { compact } from "lodash";

import { imgUrl } from "../utils";
import { RESOURCES } from "../config";
import ResourceToken from "../ResourceToken";
import ResourceIcon from "../ResourceIcon";
import PointsBadge from "./PointsBadge";
import BonusCard from "./BonusCard";

import styles from "./GameCard.module.css";

const LEVEL_CLASS = {
  "1": styles.cardYellow,
  "2": styles.cardRed,
  "3": styles.cardBlue,
};

const propTypes = {
  level: PropTypes.number.isRequired,
  resource: PropTypes.oneOf(RESOURCES).isRequired,
  img: PropTypes.string.isRequired,
  cost: PropTypes.shape(Object.fromEntries(RESOURCES.map((res) => [res, PropTypes.number])))
    .isRequired,
  points: PropTypes.number,
  active: PropTypes.bool,
  selected: PropTypes.bool,
  loading: PropTypes.bool,
  canBuy: PropTypes.bool,
  canReserve: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func,
  onBuy: PropTypes.func,
  onReserve: PropTypes.func,
};

const defaultProps = {
  actvie: false,
  selected: false,
  canBuy: true,
  canReserve: true,
  small: false,
  onClick: () => {},
};

const GameCard = ({
  level,
  resource,
  points,
  img,
  cost,
  active,
  selected,
  loading,
  small,
  canBuy,
  canReserve,
  onClick,
  onBuy,
  onReserve,
}) => {
  return (
    <Card
      className={compact([
        styles.card,
        LEVEL_CLASS[level],
        active && styles.active,
        small && styles.small,
        canBuy && styles.highlighted,
      ]).join(" ")}
      raised={selected}
      onClick={active ? onClick : undefined}
    >
      <Card.Content className={styles.topContent}>
        <ResourceIcon type={resource} />
        {points > 0 && <PointsBadge resource={resource} points={points} />}
      </Card.Content>
      <Dimmer.Dimmable blurring dimmed={selected}>
        <div className={styles.imageBox}>
          <Image src={imgUrl(img)} ui={false} />
        </div>
        <Dimmer inverted active={selected}>
          <div className={styles.actions}>
            {onBuy && (
              <Action
                onClick={onBuy}
                loading={loading}
                disabled={loading || !canBuy}
                color="green"
                icon="shop"
                name={"Buy card"}
              />
            )}
            {onReserve && (
              <Action
                onClick={onReserve}
                loading={loading}
                disabled={loading || !canReserve}
                color="yellow"
                icon="bookmark"
                name={"Reserve card"}
              />
            )}
          </div>
        </Dimmer>
      </Dimmer.Dimmable>
      <Card.Content className={styles.bottomContent} style={{ opacity: canBuy ? 1 : 0.7 }}>
        {Object.entries(cost).map(
          ([res, count]) => count > 0 && <ResourceToken key={res} type={res} count={count} />
        )}
      </Card.Content>
    </Card>
  );
};

const Action = ({ name, icon, loading, disabled, color, onClick }) => (
  <Button
    onClick={(e) => {
      onClick();
      e.stopPropagation();
    }}
    loading={loading}
    disabled={disabled}
    color={color}
    size="mini"
  >
    <Icon name={icon} /> {name}
  </Button>
);

const PlaceholderCard = () => <Card className={styles.cardPlaceholder}></Card>;

GameCard.propTypes = propTypes;
GameCard.defaultProps = defaultProps;

export default GameCard;
export { PlaceholderCard, BonusCard };
