import React from "react";
import smooth_path from "./utils/smooth_path";

const Drawing = ({ lines, width, height }) => (
  <div style={{
    width: `${width}px`,
    height: `${height}px`,
    margin: "0 auto",
  }}>
    <svg style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#FFF",
    }}>
      {lines.map((line, id) => (
        <DrawingLine key={id} line={line} />
      ))}
    </svg>
  </div>
);

const DrawingLine = ({ line: { points, color, width} }) => (
  <path fill="none"
    stroke={color}
    strokeWidth={width}
    d={smooth_path(points, 0.2)} />
);

export default Drawing;
