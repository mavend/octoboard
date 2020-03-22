import React from "react";
import DrawArea from "./DrawArea";

const KalamburyBoard = ({ G, moves }) => {

  const { phrase } = G;
  const { UpdateDrawing } = moves;

  return (
    <div>
      <h1>Your phrase is: {phrase}</h1>
      <DrawArea width="800" height="600" onUpdate={(lines) => UpdateDrawing(lines)} />
    </div>
  )
}

export default KalamburyBoard;