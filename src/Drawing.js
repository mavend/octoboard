import React from "react";
import smooth_path from "./utils/smooth_path";

const Drawing = ({ lines, ...props }) => {
  const styles = {
    wrapper: {
      border: "1px solid rgba(34,36,38,.15)",
      boxShadow: "0 1px 2px 0 rgba(34,36,38,.15)",
      backgroundColor: "white",
      borderRadius: ".28571429rem",
      overflow: "hidden",
    },
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
    <div style={styles.wrapper}>
      <svg 
        style={styles.svg} 
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        {...props}>
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
