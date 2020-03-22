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

const DrawingLine = ({ line }) => {
  const pathData = "M " + line.points.map(p => p.join(' ')).join(" L ");
  return (
    <path fill="none" stroke={line.color} d={pathData} />
  );
};

export default Drawing;