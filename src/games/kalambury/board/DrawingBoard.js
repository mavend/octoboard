import React from "react";
import DrawArea from "../DrawArea";

const DrawingBoard = ({ G: { remainingSeconds }, moves: { Forfeit }, lines, setLines }) => (
  <DrawArea
    remainingSeconds={remainingSeconds}
    onForfeit={() => Forfeit()}
    lines={lines}
    setLines={setLines}
  />
);

export default DrawingBoard;
