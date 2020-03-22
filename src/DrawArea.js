import React, { useState, useEffect } from "react";

const DrawArea = ({width, height, onUpdate}) => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const addPointFromEvent = (event, addLine=false) => {
    const point = relativeCoordsForEvent(event);
    let newLines;
    if (addLine) {
      newLines = [...lines, [point]];
    } else {
      newLines = [
        ...lines.slice(0, lines.length - 1),
        [...lines[lines.length - 1], point]
      ]
    }
    setLines(newLines);
    if(onUpdate) window.requestAnimationFrame(() => onUpdate(newLines));
  }

  const relativeCoordsForEvent = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    return [clientX - left, clientY - top ];
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    addPointFromEvent(e, true);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      addPointFromEvent(e);
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
        backgroundColor: "#eeeeee",
        cursor: "crosshair",
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
  const pathData = "M " + line.map(p => p.join(' ')).join(" L ");
  return (
    <path fill="none" stroke="black" d={pathData} />
  );
};

export default DrawArea;
export {
  Drawing
}