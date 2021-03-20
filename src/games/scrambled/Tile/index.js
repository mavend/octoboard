import React from "react";
import PropTypes from "prop-types";

// import styles from "./Tile.module.css";

const propTypes = {
  letter: PropTypes.string,
  points: PropTypes.number,
  raised: PropTypes.bool,
  separate: PropTypes.bool,
  highlighted: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
const Tile = ({ letter, points, raised, separate, highlighted, disabled, onClick }) => (
  <div
    onClick={onClick}
    style={{
      cursor: (onClick && !disabled) || highlighted ? "pointer" : "auto",
      opacity: onClick && disabled ? 0.5 : 1,
      userSelect: "none",
      borderRadius: 5,
      boxShadow: `3px 3px 0 0 #393434, 2px 2px 0 0 #393434, 1px 1px 0 0 #393434 ${
        raised ? ", rgba(0, 0, 0, 0.25) 3px 8px 4px 1px" : ""
      }`,
      background: highlighted ? "#B5A696" : "#655D5D",
      color: "#FFFFFF",
      width: 46,
      height: 46,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      top: raised ? "-8px" : "-3px",
      left: "-3px",
      fontWeight: 600,
      margin: separate ? "0 5px 0 0" : 0,
      transition: "top 0.3s, box-shadow 0.3s, opacity 0.3s",
    }}
  >
    <div style={{ fontSize: 24 }}>{letter}</div>
    <div
      style={{ position: "absolute", right: 0, bottom: 0, margin: 3, fontSize: 12, lineHeight: 1 }}
    >
      {points}
    </div>
  </div>
);
Tile.propTypes = propTypes;

export default Tile;
