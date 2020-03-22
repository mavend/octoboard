import React from "react";
import DrawArea from "./DrawArea";
import Drawing from "./Drawing";

const KalamburyBoard = ({ G, ctx, moves }) => {

  const { players } = G;
  const { UpdateDrawing } = moves;
  const { currentPlayer, activePlayers } = ctx;

  const playerId = Object.keys(players)[0];
  const phrase = players[currentPlayer] && players[currentPlayer].phrase;

  return (
    <div>
      { activePlayers[playerId] === "draw" ? (
        <>
          <h1>Your phrase is: {phrase} {}</h1>
          <DrawArea width="800" height="600" initialLines={G.drawing} onUpdate={(lines) => UpdateDrawing(lines)} />
        </>
      ) : (
        <>
          <h1>Guess what?</h1>
          <Drawing width="800" height="600" lines={G.drawing} />
        </>
      )}
      <p>PlayerId: {playerId}</p>
    </div>
  )
}

export default KalamburyBoard;
