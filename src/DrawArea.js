import React, { useState, useEffect } from "react";

const DrawArea = ({width, height}) => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [])

  const relativeCoordsForEvent = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    return { x: clientX - left, y: clientY - top };
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    setLines([...lines, [relativeCoordsForEvent(e)]])
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      setLines([
        ...lines.slice(0, lines.length - 1),
        [...lines[lines.length - 1], relativeCoordsForEvent(e)]
      ])
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  return (
    <div id="draw-area"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "#eeeeee"
      }}>
      <Drawing width={width} height={height} lines={lines} />
    </div>
  )
};

const Drawing = ({ lines }) => (
  <svg style={{width: "100%", height: "100%"}}>
    {lines.map((line, id) => (
      <DrawingLine key={id} line={line} />
    ))}
  </svg>
);

const DrawingLine = ({ line }) => {
  const pathData = "M " + line.map(p => `${p.x} ${p.y}`).join(" L ");
  return (
    <path fill="none" stroke="black" d={pathData} />
  );
};

export default DrawArea;
export {
  Drawing
}