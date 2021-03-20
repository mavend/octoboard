import React from "react";
import PropTypes from "prop-types";

import Field from "./Field";

const propTypes = {
  board: PropTypes.array.isRequired,
  playerLetters: PropTypes.array.isRequired,
  clickable: PropTypes.func,
  handleFieldClick: PropTypes.func,
  selectionEnabled: PropTypes.bool,
};
const Grid = ({ board, playerLetters, clickable, handleFieldClick, selectionEnabled }) => {
  const size = 46;
  const bordersColor = selectionEnabled ? "#b1b1b1" : "#E4E4E4";

  return (
    <div
      style={{
        background: "#717171",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18.5 * size,
        height: 18.5 * size,
        borderRadius: 3,
      }}
    >
      <table
        style={{
          border: `2px solid ${bordersColor}`,
          borderRadius: 5,
          background: bordersColor,
          boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 10px 2px",
          borderSpacing: 5,
          transition: "background 0.3s 0.08s, border-color 0.3s 0.08s",
        }}
      >
        <tbody>
          {board.map((rowContainer, y) => {
            return (
              <tr key={y} style={{ height: size }}>
                {rowContainer.row.map((el, x) => {
                  return (
                    <td
                      key={`${x},${y}`}
                      style={{
                        width: size,
                        height: size,
                        padding: 0,
                        position: "relative",
                      }}
                    >
                      <Field
                        base={el}
                        overlay={
                          playerLetters &&
                          playerLetters.find((tile) => tile.x === x && tile.y === y)
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
};
Grid.propTypes = propTypes;

export default Grid;
