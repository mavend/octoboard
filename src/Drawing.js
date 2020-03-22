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
  const isRubber = !line.color;
  return (
    <path fill="none" 
      stroke={isRubber ? "#eeeeee" : line.color}
      strokeWidth={isRubber ? 25 : 2} 
      d={pathData} />
  );
};

export default Drawing;