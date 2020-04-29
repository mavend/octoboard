import React, { createContext, useContext, useEffect, useState } from "react";
import { find, isEqual } from "lodash";

import filterActions from "utils/user/filterActions";
import { useProfiles } from "./UserContext";

export const BoardGameContext = createContext({});

export const BoardGameProvider = ({ children, ...props }) => {
  const {
    G: { points, actions, players: playersData },
    ctx: { activePlayers },
    gameMetadata,
    playerID,
  } = props;
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({
    data: {},
    isCurrentPlayer: true,
    stage: "wait",
  });
  const profiles = useProfiles();

  // Set players list
  useEffect(() => {
    const maxPoints = Math.max(...points);
    const newPlayers = gameMetadata.map(({ id, name: uid, isConnected }) => {
      const stage = activePlayers && activePlayers[id];
      const profile = profiles.get(uid);
      return {
        id,
        uid,
        profile,
        isConnected,
        stage,
        points: points[id],
        actions: filterActions(actions, id),
        isDrawing: stage === "draw",
        canManageGame: stage === "manage",
        isCurrentPlayer: id.toString() === playerID.toString(),
        isWinning: points[id] === maxPoints,
        ...(playersData[id] || {}),
      };
    });
    setPlayers((players) => (isEqual(players, newPlayers) ? players : newPlayers));
  }, [gameMetadata, points, activePlayers, actions, playerID, setPlayers, profiles, playersData]);

  // Set current player
  useEffect(() => {
    const currentPlayer = find(players, "isCurrentPlayer");
    if (currentPlayer) {
      setPlayer((player) => (isEqual(player, currentPlayer) ? player : currentPlayer));
    }
  }, [players, setPlayer]);

  return (
    <BoardGameContext.Provider
      value={{
        player,
        players,
        ...props,
      }}
    >
      {children}
    </BoardGameContext.Provider>
  );
};

export const useBoardGame = () => {
  const boardGame = useContext(BoardGameContext);
  return boardGame;
};
