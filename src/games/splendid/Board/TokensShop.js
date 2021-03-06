import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Header, Button, Label } from "semantic-ui-react";
import { sum } from "lodash";

import { RESOURCES } from "../config";
import ResourceToken from "../ResourceToken";

import styles from "./Board.module.css";

const emptyTokens = Object.fromEntries(RESOURCES.map((res) => [res, 0]));

const propTypes = {
  tokens: PropTypes.objectOf(PropTypes.number).isRequired,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  onTakeTokens: PropTypes.func.isRequired,
  playerTokensCount: PropTypes.number.isRequired,
};

const TokensShop = ({ tokens, active, loading, onTakeTokens, playerTokensCount }) => {
  const [selected, setSelected] = useState({ ...emptyTokens });

  const tooMuchTokens = sum(Object.values(selected)) + playerTokensCount >= 10;

  useEffect(() => {
    setSelected({ ...emptyTokens });
  }, [active, setSelected]);

  const addToken = (res) => {
    if (canTakeToken(res)) {
      setSelected((selected) => ({ ...selected, [res]: selected[res] + 1 }));
    }
  };

  const removeToken = (res) => {
    if (selected[res] > 0) {
      setSelected((selected) => ({ ...selected, [res]: selected[res] - 1 }));
    }
  };

  const takeTokens = () => {
    if (sum(Object.values(selected)) > 0) {
      onTakeTokens(selected);
    }
  };

  const canTakeToken = (res) => {
    const selectedCount = sum(Object.values(selected));
    const selectedRes = Object.keys(selected).filter((res) => selected[res] > 0);

    if (tooMuchTokens) return false;

    return (
      selectedCount === 0 ||
      (selectedCount === 1 && (!selectedRes.includes(res) || tokens[res] >= 4)) ||
      (selectedCount === 2 && !selectedRes.includes(res) && selectedRes.length > 1)
    );
  };

  const tokensCount = (res) => tokens[res] - selected[res];

  return (
    <div className={styles.tokensShop}>
      <Header className={styles.tokensShopHeader}>Available tokens</Header>
      <div className={styles.tokensRow}>
        {RESOURCES.map((res) => (
          <ResourceToken
            key={res}
            type={res}
            count={tokensCount(res) > 0 ? tokensCount(res) : null}
            onClick={active && res !== "gold" ? () => addToken(res) : undefined}
            disabled={tokensCount(res) === 0 || !canTakeToken(res)}
            raised
            big
          />
        ))}
      </div>
      <div className={styles.tokensRow}>
        {RESOURCES.map((res) => (
          <span key={res} className={styles.tokensCounter}>
            {selected[res] > 0 && (
              <Label
                size="mini"
                content={selected[res]}
                color="green"
                onClick={() => removeToken(res)}
              />
            )}
          </span>
        ))}
      </div>
      <div className={styles.takeButton}>
        {active && (
          <Button
            color="green"
            size="mini"
            onClick={takeTokens}
            disabled={sum(Object.values(selected)) === 0 || loading}
          >
            Take tokens
          </Button>
        )}
        {active && tooMuchTokens && (
          <p className={styles.tokensShopError}>You can&apos;t have more than 10 tokens</p>
        )}
      </div>
    </div>
  );
};
TokensShop.propTypes = propTypes;

export default TokensShop;
