import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

import Tile from "../Tile";
import { BONUSES } from "../config";

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
      opacity: enabled ? 0.15 : 0,
      transition: "opacity 0.3s",
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
  if (base.letter || base.replacement) {
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
          background: BONUSES[base.bonus.type][base.bonus.multiply],
        }}
        onClick={handleFieldClick}
        ref={overlay ? overlay.popupRef : undefined}
      >
        {overlay ? <Tile highlighted bonus={base.bonus} {...overlay} /> : content}
        <Dimmer enabled={selectionEnabled && !clickable} />
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
      ref={overlay ? overlay.popupRef : undefined}
    >
      {overlay ? <Tile highlighted {...overlay} /> : <></>}
      <Dimmer enabled={selectionEnabled && !clickable} />
    </div>
  );
};
Field.propTypes = fieldPropTypes;

export default Field;
