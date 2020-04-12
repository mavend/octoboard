import React from "react";
import { oneOf } from "prop-types";
import "./OctopusWrapper.css";

const propTypes = {
  color: oneOf(["red", "yellow", "blue"]),
  position: oneOf(["bottom-left", "bottom-right"]),
  rotation: oneOf(["cw", "ccw", "none"]),
};

const defaultProps = {
  color: "red",
  position: "bottom-left",
  rotation: "none",
};

const OctopusWrapper = ({ color, position, rotation, children }) => (
  <div className={`octopus-badge octopus-${color} octopus-${position} octopus-${rotation}`}>
    {children}
  </div>
);

OctopusWrapper.propTypes = propTypes;
OctopusWrapper.defaultProps = defaultProps;

export default OctopusWrapper;
