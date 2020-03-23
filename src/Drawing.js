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

  return (
    <div>
      <svg style={styles.svg} viewBox={`0 0 800 600`}>
        {lines.map((line, id) => (
          <DrawingLine key={id} line={line} />
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
