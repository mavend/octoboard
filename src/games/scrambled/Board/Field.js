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
  color: "#FFFFFF",
  borderRadius: 5,
  border: "0px solid #FFFFFF",
  background: "#FFFFFF",
  fontWeight: 500,
};

const dimmerPropTypes = {
  enabled: PropTypes.bool,
};
const Dimmer = ({ enabled }) => (
  <div
    style={{
      ...baseStyle,
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "#000000",
      opacity: enabled ? 0.2 : 0,
    }}
  ></div>
);
Dimmer.propTypes = dimmerPropTypes;

const fieldPropTypes = {
  base: PropTypes.object.isRequired,
  overlay: PropTypes.object,
  clickable: PropTypes.bool,
  handleFieldClick: PropTypes.func.isRequired,
  selectionEnabled: PropTypes.bool,
};
const Field = ({ base, overlay, clickable, handleFieldClick, selectionEnabled }) => {
  // Permanently placed letter
  if (base.letter) {
    return (
      <div
        style={{
          ...baseStyle,
        }}
      >
        <Tile {...base} />
      </div>
    );
  }

  // Empty field with a bonus
  if (base.bonus) {
    const colors = {
      word: {
        3: "#BB5C66",
        2: "#F9C54A",
      },
      letter: {
        3: "#16919F",
        2: "#21C4D8",
      },
    };
    const content = base.start ? (
      <Icon name="star" size="big" disabled fitted />
    ) : (
      <div style={{ fontWeight: 600 }}>
        <div style={{ marginBottom: 3, fontSize: 12 }}>{base.bonus.multiply}x</div>
        <div style={{ textTransform: "uppercase", fontSize: 8 }}>{base.bonus.type}</div>
      </div>
    );
    return (
      <div
        style={{
          ...baseStyle,
          cursor: clickable ? "pointer" : "auto",
          background: colors[base.bonus.type][base.bonus.multiply],
        }}
        onClick={handleFieldClick}
      >
        {overlay ? <Tile highlighted {...overlay} /> : content}
        {selectionEnabled && <Dimmer enabled={!clickable} />}
      </div>
    );
  }

  // Empty field
  return (
    <div
      style={{
        ...baseStyle,
        cursor: clickable ? "pointer" : "auto",
      }}
      onClick={handleFieldClick}
    >
      {overlay ? <Tile highlighted {...overlay} /> : <></>}
      {selectionEnabled && <Dimmer enabled={!clickable} />}
    </div>
  );
};
Field.propTypes = fieldPropTypes;

export default Field;
