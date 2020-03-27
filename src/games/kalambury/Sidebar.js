import React from "react";
import { Header, Segment } from "semantic-ui-react";
import Player from "./sidebar/Player";

const Sidebar = ({
  G: { actions, points, playersData },
  ctx: { activePlayers, numPlayers },
  playerID,
  handleGuessClick,
  getUserActions,
}) => (
  <>
    <Header as="h2" textAlign="center">
      Players
    </Header>
    <Segment.Group>
      {Object.keys(playersData).map((pid) => (
        <Player
          key={pid}
          points={points[pid]}
          actions={getUserActions(actions, pid)}
          isWinning={points[pid] === Math.max(...points)}
          isDrawing={activePlayers[pid] === "draw"}
          canManageGame={activePlayers[pid] === "manage"}
          isCurrentPlayer={pid === playerID}
          handleGuessClick={handleGuessClick}
          {...playersData[pid]}
        />
      ))}
      {Array(numPlayers - Object.keys(playersData).length)
        .fill(0)
        .map((_, idx) => (
          <Player key={"dummy" + idx} empty={true} />
        ))}
    </Segment.Group>
  </>
);

export default Sidebar;
