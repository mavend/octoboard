import React from "react";
import { shape, number, func } from "prop-types";

import { RESOURCES } from "../config";
import CardSymbol from "../CardSymbol";
import ResourceToken from "../ResourceToken";

import styles from "./Board.module.css";

const resourcesShape = shape(Object.fromEntries(RESOURCES.map((res) => [res, number]))).isRequired;

const propTypes = {
  tokens: resourcesShape,
  cards: resourcesShape,
  onDiscardToken: func,
};

const defaultProps = {
  tokens: {},
  cards: {},
};

const PlayerInfo = ({ tokens, cards, onDiscardToken, children }) => (
  <>
    {children}
    <span className={styles.extraTitle}>Tokens:</span>
    <div className={styles.tokens}>
      {tokens &&
        RESOURCES.map((res) => (
          <ResourceToken
            key={res}
            type={res}
            count={tokens[res] > 0 ? tokens[res] : null}
            disabled={tokens[res] === 0}
            raised={tokens[res] > 0}
            onDelete={onDiscardToken ? () => onDiscardToken(res) : undefined}
          />
        ))}
    </div>
    <span className={styles.extraTitle}>Cards:</span>
    <div className={styles.tokens}>
      {cards &&
        Object.keys(cards).map((res) => (
          <CardSymbol
            key={res}
            resource={res}
            count={cards[res] > 0 ? cards[res] : null}
            disabled={cards[res] === 0}
            raised={cards[res] > 0}
          />
        ))}
      <span style={{ width: 35 }}></span>
    </div>
  </>
);

PlayerInfo.propTypes = propTypes;
PlayerInfo.defaultProps = defaultProps;

export default PlayerInfo;
