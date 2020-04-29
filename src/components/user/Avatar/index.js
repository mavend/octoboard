import React from "react";
import PropTypes from "prop-types";

import bodies from "./parts/bodies";
import eyes from "./parts/eyes";
import features from "./parts/features";
import glasses from "./parts/glasses";
import borders from "./parts/borders";

const propTypes = {
  uid: PropTypes.string.isRequired,
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

const Avatar = ({ uid, small, ...props }) => {
  const find = (name, attributes) => {
    if (props[name] !== null && props[name] !== undefined) {
      return attributes[Math.abs(props[name]) % attributes.length];
    }

    const hash = hashFn(name + uid + uid.length + attributes.length);
    return attributes[Math.abs(hash) % attributes.length];
  };

  const color = find("color", colors);
  const bodyStyle = find("bodyStyle", bodyStyles);
  const Body = find("body", bodies);
  const Eyes = find("eyes", eyes);
  const Glasses = find("glasses", glasses);
  const Features = find("features", features);
  const Border = find("border", borders);

  const styles = {
    display: "inline-block",
    verticalAlign: "middle",
    width: small ? "35px" : undefined,
    height: small ? "35xp" : undefined,
    ...props.style,
  };

  return (
    <div style={styles}>
      <svg
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
          <Body />}
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
