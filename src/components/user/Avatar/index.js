import React from "react";
import PropTypes from "prop-types";

import { bodies, DefaultBody } from "./parts/bodies";
import { eyes, DefaultEyes } from "./parts/eyes";
import { features, DefaultFeature } from "./parts/features";
import { glasses, DefaultGlasses } from "./parts/glasses";
import { borders, DefaultBorder } from "./parts/borders";

const propTypes = {
  uid: PropTypes.string,
  small: PropTypes.bool,
  style: PropTypes.object,
  color: PropTypes.number,
  bodyStyle: PropTypes.number,
  body: PropTypes.number,
  eyes: PropTypes.number,
  glasses: PropTypes.number,
  features: PropTypes.number,
  border: PropTypes.number,
};

const colors = [
  "#E57373",
  "#F48FB1",
  "#BA68C8",
  "#9575CD",
  "#7986CB",
  "#64B5F6",
  "#81D4FA",
  "#00BCD4",
  "#4DB6AC",
  "#81C784",
  "#9CCC65",
  "#DCE775",
  "#FDD835",
  "#FFC107",
  "#FFB74D",
  "#FF8A65",
  "#A1887F",
  "#BDBDBD",
  "#90A4AE",
  "#f4d0b5",
  "#a5673f",
];
const bodyStyles = [{}, { fillOpacity: 0.3, strokeWidth: 5 }];
const hashFn = (string) =>
  string
    .split("")
    .map((x) => x.charCodeAt(0))
    .reduce((a, b) => a + b, 1);

const Avatar = ({ uid, empty, small, ...props }) => {
  const find = (name, attributes, emptyAttribute) => {
    if (empty || uid === undefined) return emptyAttribute || attributes[0];

    if (props[name] !== null && props[name] !== undefined) {
      return attributes[Math.abs(props[name]) % attributes.length];
    }

    const hash = hashFn(name + uid + uid.length + attributes.length);
    return attributes[Math.abs(hash) % attributes.length];
  };

  const color = find("color", colors, "#d3beca");
  const bodyStyle = find("bodyStyle", bodyStyles, { fillOpacity: 0.5, strokeWidth: 10 });
  const Body = find("body", bodies, DefaultBody);
  const Eyes = find("eyes", eyes, DefaultEyes);
  const Glasses = find("glasses", glasses, DefaultGlasses);
  const Features = find("features", features, DefaultFeature);
  const Border = find("border", borders, DefaultBorder);

  const styles = {
    display: "inline-block",
    verticalAlign: "middle",
    width: small ? "35px" : "100%",
    height: small ? "35xp" : "100%",
    ...props.style,
  };

  return (
    <div style={styles}>
      <svg
        className="octopus avatar"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        style={{
          strokeLinecap: "round",
          stroke: "#000",
          strokeWidth: 0,
          fill: "#000",
          width: "100%",
        }}
      >
        <g style={{ fill: color, stroke: color, ...bodyStyle }}>
          <Body />
        </g>
        <Eyes />
        <Features />
        <Glasses />
        <Border />
      </svg>
    </div>
  );
};

Avatar.propTypes = propTypes;

export default Avatar;
