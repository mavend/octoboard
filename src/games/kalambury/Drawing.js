import React from "react";
import { Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { LineType } from "config/propTypes";
import smooth_path from "./utils/smooth_path";
import { breakpoints } from "config/media";

const propTypes = {
  lines: PropTypes.arrayOf(LineType).isRequired,
  drawable: PropTypes.bool,
};

const Drawing = ({ lines, drawable, ...props }) => {
  const styles = {
    wrapper: drawable
      ? {
          padding: 0,
          cursor: "crosshair",
          touchAction: "none",
        }
      : { padding: 0 },
    svg: {
      width: "100%",
      height: "100%",
      backgroundColor: "#FFF",
    },
  };
  const vbWidth = 800,
    vbHeight = 600;

  const scaleToViewBox = ({ points, ...line }) => ({
    ...line,
    points: points.map((p) => [p[0] * vbWidth, p[1] * vbHeight]),
  });

  return (
    <Segment style={styles.wrapper} attached="top">
      <svg style={styles.svg} viewBox={`0 0 ${vbWidth} ${vbHeight}`} {...props}>
        {lines.map((line, id) => (
          <DrawingLine key={id} line={scaleToViewBox(line)} viewBoxWidth />
        ))}
      </svg>
    </Segment>
  );
};

const DrawingLine = ({ line: { points, color, width } }) => (
  <path
    fill="none"
    stroke={color}
    strokeWidth={window.innerWidth < breakpoints.computer && width < 10 ? width * 2 : width}
    strokeLinecap="round"
    d={smooth_path(points, 0.12)}
  />
);

Drawing.propTypes = propTypes;

export default Drawing;
