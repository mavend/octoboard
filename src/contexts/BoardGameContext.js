import React, { createContext, useContext, useEffect, useState } from "react";
import { find, isEqual } from "lodash";

import filterActions from "utils/user/filterActions";
import { useProfiles } from "./UserContext";

export const BoardGameContext = createContext({});

export const BoardGameProvider = ({ children, ...props }) => {
  const {
    G: { points, actions, players: playersSecrets },
    ctx: { activePlayers },
    gameMetadata,
    playerID,
  } = props;
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({
    secrets: { phrase: "" },
    isCurrentPlayer: true,
    stage: "wait",
  });
  const profiles = useProfiles();
  const playerSecret = playersSecrets[playerID];

  // Set players list
  useEffect(() => {
    console.log("Change players");
    const maxPoints = Math.max(...points);
    const newPlayers = gameMetadata.map(({ id, name: uid, isConnected }) => {
      const stage = activePlayers[id];
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
        isCurrentPlayer: id.toString() === playerID,
        isWinning: points[id] === maxPoints,
        secrets: {},
      };
    });
    setPlayers((players) => (isEqual(players, newPlayers) ? players : newPlayers));
  }, [gameMetadata, points, activePlayers, actions, playerID, setPlayers, profiles]);

  // Set current player
  useEffect(() => {
    const currentPlayer = find(players, "isCurrentPlayer");
    if (currentPlayer) {
      console.log("secrets");
      currentPlayer.secrets = playerSecret;
      setPlayer((player) => (isEqual(player, currentPlayer) ? player : currentPlayer));
    }
  }, [players, setPlayer, playerSecret]);

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
