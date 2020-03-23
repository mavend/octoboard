import React, { useState, useEffect } from "react";
import Drawing from "./Drawing";
import Toolbar from "./Toolbar";
import simplify from "simplify-path";

const DrawArea = ({initialLines, onUpdate}) => {
  const [lines, setLines] = useState(initialLines || []);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#424953");
  const [penSize, setPenSize] = useState(3);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const addPointFromEvent = (event, addLine=false) => {
    const point = relativeCoordsForEvent(event);
    const newLines = [...lines];
    if (addLine) newLines.push({points: [], color: penColor, width: penSize});
    const lastLine = newLines[newLines.length - 1];
    lastLine.points = simplify([...lastLine.points, point], 0.001);

    setLines(newLines);
    if(onUpdate) {
      window.requestAnimationFrame(() => onUpdate(newLines));
    }
  }

  const relativeCoordsForEvent = ({ currentTarget, clientX, clientY }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    return [(clientX - left) / width, (clientY - top) / height];
  };

  const handleMouseDown = (e) => {
    if (e.nativeEvent.which === 1) {
      setIsDrawing(true);
      addPointFromEvent(e, true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      addPointFromEvent(e);
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  const handleClearAll = () => {
    setLines([]);
    if(onUpdate) onUpdate([]);
  }

  const handleUndo = () => {
    lines.pop();
    setLines(lines);
    if(onUpdate) onUpdate(lines);
  }

  return (
    <div>
      <Toolbar currentColor={penColor} onColorChange={setPenColor} onSizeChange={setPenSize} onClearAll={handleClearAll} onUndoDrawing={handleUndo} />
      <div style={{cursor: "crosshair"}}>
        <Drawing 
          lines={lines}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove} />
      </div>
    </div>
  )
};

export default DrawArea;
