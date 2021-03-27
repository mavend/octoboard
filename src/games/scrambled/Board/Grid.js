import React from "react";
import PropTypes from "prop-types";

import Field from "./Field";

import styles from "./Grid.module.scss";
import clsx from "clsx";

const propTypes = {
  board: PropTypes.array.isRequired,
  playerTiles: PropTypes.array.isRequired,
  clickable: PropTypes.func.isRequired,
  handleFieldClick: PropTypes.func.isRequired,
  selectionEnabled: PropTypes.bool,
};
const Grid = ({ board, playerTiles, clickable, handleFieldClick, selectionEnabled }) => (
  <div className={clsx({ [styles.grid]: true, [styles.grid_selection]: selectionEnabled })}>
    <table>
      <tbody>
        {board.map((rowContainer, y) => {
          return (
            <tr key={y} style={{ height: 46 }}>
              {rowContainer.row.map((el, x) => {
                return (
                  <td key={`${x},${y}`} className={styles.cell}>
                    <Field
                      base={el === 0 ? {} : el}
                      overlay={
                        playerTiles && playerTiles.find((tile) => tile.x === x && tile.y === y)
                      }
                      handleFieldClick={() => handleFieldClick(x, y)}
                      clickable={clickable(x, y)}
                      selectionEnabled={selectionEnabled}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
Grid.propTypes = propTypes;

export default Grid;
