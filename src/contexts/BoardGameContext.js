/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react";
import { find, isEqual } from "lodash";
import { useProfiles } from "./UserContext";

export const BoardGameContext = createContext({});

export const BoardGameProvider = ({ children, ...props }) => {
  const {
    G: { points, players: playersData },
    ctx: { activePlayers, currentPlayer },
    matchData,
    playerID,
    plugins,
  } = props;
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({
    data: {},
    isYou: true,
    stage: "wait",
  });
  const profiles = useProfiles();

  // get actions from plugin
  const { actions } = plugins?.actions?.data || { actions: {} };

  // Set players list
  useEffect(() => {
    const maxPoints = Math.max(...points);
    const newPlayers = matchData.map(({ id, name: uid, isConnected }) => {
      const stage = activePlayers && activePlayers[id];
      const profile = profiles.get(uid);
      return {
        id,
        uid,
        profile,
        isConnected,
        stage,
        points: points[id],
        actions: actions[id] || [],
        isDrawing: stage === "draw",
        canManageGame: stage === "manage",
        isYou: id.toString() === playerID.toString(),
        isCurrentPlayer: id.toString() === currentPlayer.toString(),
        isWinning: points[id] === maxPoints,
        ...(playersData[id] || {}),
      };
    });
    setPlayers((players) => (isEqual(players, newPlayers) ? players : newPlayers));
  }, [
    matchData,
    points,
    activePlayers,
    actions,
    playerID,
    setPlayers,
    profiles,
    playersData,
    currentPlayer,
  ]);

  // Set this player
  useEffect(() => {
    const thisPlayer = find(players, "isYou");
    if (thisPlayer) {
      setPlayer((player) => (isEqual(player, thisPlayer) ? player : thisPlayer));
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
