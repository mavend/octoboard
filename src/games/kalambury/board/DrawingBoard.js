import React from "react";
import DrawArea from "../DrawArea";

const DrawingBoard = ({ G: { drawing, remainingSeconds }, moves: { UpdateDrawing, Forfeit } }) => (
  <DrawArea
    initialLines={drawing}
    remainingSeconds={remainingSeconds}
    onUpdate={(lines) => UpdateDrawing(lines)}
    onForfeit={() => Forfeit()}
  />
);

export default DrawingBoard;
