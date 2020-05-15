import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

import Tile from "../Tile";

const baseStyle = {
  width: "100%",
  height: "100%",
  margin: 0,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: 12,
  lineHeight: 1,
  color: "rgba(0,0,0,0.8)",
  fontWeight: 500,
  border: "2px solid rgb(14, 53, 25)",
};

const higlighterPropTypes = {
  enabled: PropTypes.bool,
  color: PropTypes.string,
  strong: PropTypes.bool,
};
const Highlighter = ({ enabled, color, strong }) => {
  if (!enabled) return <></>;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        border: baseStyle.border,
        boxShadow: `${color || "rgba(245, 214, 93, 0.65) "} 0px 0px ${
          strong ? "20px 12px" : "2px 2px"
        } inset`,
      }}
    ></div>
  );
};
Highlighter.propTypes = higlighterPropTypes;

const fieldPropTypes = {
  base: PropTypes.object.isRequired,
  overlay: PropTypes.object,
  clickable: PropTypes.bool,
  handleFieldClick: PropTypes.func.isRequired,
};
const Field = ({ base, overlay, clickable, handleFieldClick }) => {
  if (base.letter) {
    return (
      <div
        style={{
          ...baseStyle,
        }}
      >
        <Tile {...base} />
        <Highlighter enabled={clickable} />
      </div>
    );
  }
  if (base.bonus) {
    const opacity = base.bonus.multiply === 3 ? "0.8" : "0.4";
    const content = base.start ? (
      <Icon name="star" size="big" disabled fitted />
    ) : (
      <>
        {base.bonus.multiply}x<br />
        {base.bonus.type}
      </>
    );
    return (
      <div
        style={{
          cursor: clickable ? "pointer" : "auto",
          ...baseStyle,
        }}
        onClick={handleFieldClick}
      >
        <Highlighter
          enabled
          strong
          color={
            base.bonus.type === "word"
              ? `hsla(3, 86%, 52%, ${opacity})`
              : `hsla(199, 55%, 53%, ${opacity})`
          }
        />
        <div style={{ position: "absolute" }}>{content}</div>
        {overlay && <Tile {...overlay} />}
        <Highlighter enabled={clickable} color={overlay && "rgba(50, 196, 38, 0.3)"} />
      </div>
    );
  }

  return (
    <div
      style={{
        cursor: clickable ? "pointer" : "auto",
        ...baseStyle,
      }}
      onClick={handleFieldClick}
    >
      {overlay && <Tile {...overlay} />}
      <Highlighter enabled={clickable} color={overlay && "rgba(50, 196, 38, 0.6) "} />
    </div>
  );
};
Field.propTypes = fieldPropTypes;

export default Field;
