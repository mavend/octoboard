import React from "react";
import PropTypes from "prop-types";
import { BONUSES } from "../config";

import styles from "./index.module.scss";
import clsx from "clsx";

const propTypes = {
  letter: PropTypes.string,
  replacement: PropTypes.string,
  points: PropTypes.number,
  raised: PropTypes.bool,
  separate: PropTypes.bool,
  highlighted: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  bonus: PropTypes.object,
};
const Tile = ({
  letter,
  replacement,
  points,
  raised,
  separate,
  highlighted,
  disabled,
  bonus,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={clsx({
      [styles.tile]: true,
      [styles.tile_separate]: separate,
      [styles.tile_raised]: raised,
      [styles.tile_highlighted]: highlighted,
      [styles.tile_clickable]: onClick || highlighted,
      [styles.tile_disabled]: disabled,
    })}
  >
    {letter ? (
      <div className={styles.letter}>{letter}</div>
    ) : (
      <div className={clsx(styles.letter, styles.letter_replacement)}>{replacement}</div>
    )}
    {bonus && (
      <div
        className={styles.bonus}
        style={{
          background: BONUSES[bonus.type][bonus.multiply],
        }}
      ></div>
    )}
    {bonus && bonus.type === "letter" ? (
      <div
        className={styles.points}
        style={{
          WebkitTextStroke: `2px ${BONUSES[bonus.type][bonus.multiply]}`,
        }}
      >
        {points * bonus.multiply}
      </div>
    ) : (
      <div className={styles.points}>{points}</div>
    )}
  </div>
);
Tile.propTypes = propTypes;

export default Tile;
