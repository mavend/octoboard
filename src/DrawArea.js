import React, { useState, useEffect } from "react";

const DrawArea = ({width, height, onUpdate}) => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const addPointFromEvent = (event, addLine=false) => {
    const point = relativeCoordsForEvent(event);
    let newLines;
    if (addLine) {
      newLines = [...lines, { points: [point], color: penColor }];
    } else {
      newLines = [
        ...lines.slice(0, lines.length - 1),
        { points: [...lines[lines.length - 1].points, point], color: penColor }
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

  const handleColorChange = (newColor) => {
    setPenColor(newColor);
  }

  return (
    <div style={{
      width: `${width}px`,
      height: `${parseFloat(height) + 20}px`
    }}>
      <Toolbar handleColorChange={handleColorChange} width={width} height={20} />
      <div id="draw-area"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{
          width: `${width}px`,
          height: `${parseFloat(height)}px`,
          backgroundColor: "#eeeeee",
          cursor: "crosshair",
        }}>
        <Drawing width={width} height={height} lines={lines} />
      </div>
    </div>
  )
};

const Toolbar = ({ handleColorChange  }) => {
  const colors = [
    "#000000",
    "#ff0000",
    "#00ff00",
    "#0000ff"
  ];
  const colorsItems = colors.map((color) => 
    <div key={color} onMouseDown={(e) => handleColorChange(color)} style={{ width: "20px", height: "20px", backgroundColor: `${color}`, float: "left", cursor: "pointer" }}></div>
  );
  return (
    <div style={{
      width: "100%",
      height: "20px"
    }}>
      {colorsItems}
    </div>
  );
};

const Drawing = ({ lines }) => (
  <svg style={{width: "100%", height: "100%"}}>
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

export default DrawArea;
export {
  Drawing
}

