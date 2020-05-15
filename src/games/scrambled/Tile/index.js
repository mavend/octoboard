import React from "react";
import PropTypes from "prop-types";

// import styles from "./Tile.module.css";

const propTypes = {
  letter: PropTypes.string,
  points: PropTypes.number,
  raised: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
const Tile = ({ letter, points, raised, disabled, onClick }) => (
  <div
    onClick={onClick}
    style={{
      cursor: onClick && !disabled ? "pointer" : "auto",
      opacity: onClick && disabled ? 0.5 : 1,
      userSelect: "none",
      borderStyle: "solid",
      borderTopWidth: 1,
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderBottomWidth: 2,
      borderTopColor: "rgba(255, 255, 255, 0.45)",
      borderLeftColor: "rgba(255, 255, 255, 0.25)",
      borderRightColor: "rgba(0, 0, 0, 0.15)",
      borderBottomColor: "rgba(0, 0, 0, 0.3)",
      borderRadius: 5,
      boxShadow: raised ? "2px 6px 4px -1px rgba(0, 0, 0, 0.35)" : "",
      top: raised ? "-5px" : "0",
      background:
        "linear-gradient(95deg, rgba(255,214,152,1) 0%, rgba(254,212,150,1) 63%, rgba(255,227,167,1) 100%)",
      width: 40,
      height: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
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
