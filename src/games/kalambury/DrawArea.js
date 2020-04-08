import React, { useState, useEffect } from "react";
import { arrayOf, func } from "prop-types";
import { LineType } from "config/propTypes";
import { useBoardGame } from "contexts/BoardGameContext";
import Drawing from "./Drawing";
import Toolbar from "./Toolbar";

const propTypes = {
  lines: arrayOf(LineType).isRequired,
  setLines: func.isRequired,
};

const DrawArea = ({ lines, setLines }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#1b1c1d");
  const [penSize, setPenSize] = useState(3);
  const { moves } = useBoardGame();

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const addPointFromEvent = (event, addLine = false) => {
    const point = relativeCoordsForEvent(event);
    const newLines = [...lines];
    if (addLine) newLines.push({ points: [], color: penColor, width: penSize });
    newLines[newLines.length - 1].points.push(point);
    setLines(newLines);
  };

  const relativeCoordsForEvent = ({ currentTarget, clientX, clientY, touches }) => {
    if (touches && touches.length > 0) {
      clientX = touches[0].clientX;
      clientY = touches[0].clientY;
    }
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    return [(clientX - left) / width, (clientY - top) / height];
  };

  const handleMouseDown = (e) => {
    if (e.nativeEvent.which === 1 || e.nativeEvent instanceof TouchEvent) {
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

  const handleForfeit = () => {
    setLines([]);
    moves.Forfeit();
  };

  return (
    <div>
      <Toolbar
        currentColor={penColor}
        onColorChange={setPenColor}
        onSizeChange={setPenSize}
        onClearAll={handleClearAll}
        onUndoDrawing={handleUndo}
        canUndo={lines.length > 0}
        onForfeit={handleForfeit}
      />
      <Drawing
        lines={lines}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        drawable={true}
      />
    </div>
  );
};

DrawArea.propTypes = propTypes;

export default DrawArea;
