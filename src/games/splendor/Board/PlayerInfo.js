import React from "react";
import { shape, number, array, func } from "prop-types";

import { RESOURCES } from "../config";
import CardSymbol from "../CardSymbol";
import ResourceToken from "../ResourceToken";

import styles from "./Board.module.css";

const resourcesShape = shape(Object.fromEntries(RESOURCES.map((res) => [res, number]))).isRequired;

const propTypes = {
  tokens: resourcesShape,
  cards: resourcesShape,
  reservedCards: array,
  selectedCard: number,
  onBuyCard: func,
};

const defaultProps = {
  tokens: {},
  cards: {},
};

const PlayerInfo = ({ tokens, cards, children }) => (
  <>
    {children}
    <span className={styles.extraTitle}>Tokens:</span>
    <div className={styles.tokens}>
      {tokens &&
        Object.entries(tokens).map(
          ([res, count]) => count > 0 && <ResourceToken key={res} type={res} count={count} raised />
        )}
    </div>
    <span className={styles.extraTitle}>Cards:</span>
    <div className={styles.tokens}>
      {tokens &&
        Object.entries(cards).map(
          ([res, count]) =>
            count > 0 && <CardSymbol key={res} resource={res} count={count} raised />
        )}
    </div>
  </>
);

PlayerInfo.propTypes = propTypes;
PlayerInfo.defaultProps = defaultProps;

export default PlayerInfo;
