import React, { useState, useEffect } from "react";
import Drawing from "./Drawing";
import Toolbar from "./Toolbar";

const DrawArea = ({ remainingSeconds, onForfeit, lines, setLines }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#1b1c1d");
  const [penSize, setPenSize] = useState(3);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const addPointFromEvent = (event, addLine = false) => {
    const point = relativeCoordsForEvent(event);
    const newLines = [...lines];
    if (addLine) newLines.push({ points: [], color: penColor, width: penSize });
    newLines[newLines.length - 1].points.push(point);
    setLines(newLines);
  };

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
  };

  const handleUndo = () => {
    lines.pop();
    setLines([...lines]);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <Toolbar
        currentColor={penColor}
        onColorChange={setPenColor}
        onSizeChange={setPenSize}
        onClearAll={handleClearAll}
        onUndoDrawing={handleUndo}
        onForfeit={onForfeit}
        canUndo={lines.length > 0}
      />
      <div style={{ cursor: "crosshair" }}>
        <Drawing
          lines={lines}
          remainingSeconds={remainingSeconds}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        />
      </div>
    </div>
  );
};

export default DrawArea;
