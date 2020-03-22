import React from "react";
import DrawArea from "./DrawArea";

const KalamburyBoard = ({ G, ctx, moves }) => {

  const { players } = G;
  const { UpdateDrawing } = moves;
  const { currentPlayer } = ctx;
  let phrase = "";
  if (players[currentPlayer]) {
    phrase = players[currentPlayer].phrase;
  }

  return (
    <div>
      <h1>Your phrase is: {phrase}</h1>
      <DrawArea width="800" height="600" onUpdate={(lines) => UpdateDrawing(lines)} />
    </div>
  )
}

export default KalamburyBoard;
