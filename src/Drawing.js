import React from "react";
import smooth_path from "./utils/smooth_path";

const Drawing = ({ lines }) => {
  const styles = {
    svg: {
      width: "100%",
      height: "100%",
      backgroundColor: "#FFF",
    }
  }
  const vbWidth = 800, vbHeight = 600;

  const scaleToViewBox = ({ points, ...line }) => ({
    ...line,
    points: points.map(p => [p[0] * vbWidth, p[1] * vbHeight])
  });

  return (
    <div>
      <svg style={styles.svg} viewBox={`0 0 ${vbWidth} ${vbHeight}`}>
        {lines.map((line, id) => (
          <DrawingLine 
            key={id}
            line={scaleToViewBox(line)}
            viewBoxWidth />
        ))}
      </svg>
    </div>
  );
};

const DrawingLine = ({ line: { points, color, width} }) => (
  <path fill="none"
    stroke={color}
    strokeWidth={width}
    d={smooth_path(points, 0.2)} />
);

export default Drawing;
