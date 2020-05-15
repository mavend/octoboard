import React from "react";
import PropTypes from "prop-types";

import Field from "./Field";

const propTypes = {
  board: PropTypes.array.isRequired,
  playerLetters: PropTypes.array.isRequired,
  clickable: PropTypes.func,
  handleFieldClick: PropTypes.func,
};
const Grid = ({ board, playerLetters, clickable, handleFieldClick }) => {
  const size = 48;

  return (
    <div
      style={{
        background: "rgb(188, 196, 206)",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 17 * size,
        height: 17 * size,
        borderRadius: 3,
      }}
    >
      <table
        style={{
          border: "2px solid rgb(14, 53, 25)",
          borderCollapse: "collapse",
          background: "rgb(226, 233, 242)",
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
