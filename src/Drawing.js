import React from "react";

const Drawing = ({ lines, width, height }) => (
  <svg style={{
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: "#eeeeee"
  }}>
    {lines.map((line, id) => (
      <DrawingLine key={id} line={line} />
    ))}
  </svg>
);

const DrawingLine = ({ line: { points, color, width} }) => {
  const pathData = "M " + points.map(p => p.join(' ')).join(" L ");
  return (
    <path fill="none" 
      stroke={color}
      strokeWidth={width} 
      d={pathData} />
  );
};

export default Drawing;