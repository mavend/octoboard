import React from "react";
import { Segment, Progress, Responsive } from "semantic-ui-react";
import smooth_path from "./utils/smooth_path";

const Drawing = ({ lines, drawable, remainingSeconds, ...props }) => {
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
      <Progress indicating percent={(100 * remainingSeconds) / 120} attached="bottom" />
    </Segment>
  );
};

const DrawingLine = ({ line: { points, color, width } }) => (
  <path
    fill="none"
    stroke={color}
    strokeWidth={
      window.innerWidth <= Responsive.onlyTablet.maxWidth && width < 10 ? width * 2 : width
    }
    strokeLinecap="round"
    d={smooth_path(points, 0.12)}
  />
);

export default Drawing;
