import React, { useState, useEffect } from "react";
import { isEqual, find } from "lodash";
import GameClient from "./GameClient";
import GameLobby from "./GameLobby";
import { useLobbyConnection } from "./lobby_connection";

const LobbyPage = ({ lobbyServer, gameComponents, playerName }) => {
  const [playerCredentials, setPlayerCredentials] = useState();
  const [currentGame, setCurrentGame] = useState();

  const { rooms, credentials, error, createRoom, joinRoom, leaveGame } = useLobbyConnection({
    server: lobbyServer,
    gameComponents,
    playerName,
    playerCredentials: localStorage.getItem("playerCredentials"),
  });

  // Update credentials in localStorage
  useEffect(() => {
    setPlayerCredentials(credentials);
    localStorage.setItem("playerCredentials", credentials);
  }, [credentials]);

  // Check if player is already in a game room
  useEffect(() => {
    const room = rooms.find((room) => room.players.find((p) => p.name === playerName));
    if (room) {
      const { gameID, gameName, players } = room;
      const playerID = find(players, { name: playerName }).id.toString();
      const newGame = { gameName, gameID, playerID };
      setCurrentGame((currentGame) => (isEqual(currentGame, newGame) ? currentGame : newGame));
    } else {
      setCurrentGame(null);
    }
  }, [rooms, setCurrentGame]);

  const handleCreate = async (game, numPlayers) => {
    const gameID = await createRoom(game, numPlayers);
    handleJoin(game.name, gameID, 0);
  };

  const handleJoin = async (gameName, gameID, freeSpotId) => {
    await joinRoom(gameName, gameID, freeSpotId);
    setCurrentGame({ gameName, gameID, playerID: freeSpotId.toString() });
  };

  return (
    <>
      {currentGame && currentGame.gameID ? (
        <GameClient
          playerID={currentGame.playerID}
          gameID={currentGame.gameID}
          credentials={playerCredentials}
          gameComponent={gameComponents.find((g) => g.game.name === currentGame.gameName)}
          leaveGame={leaveGame}
        />
      ) : (
        <GameLobby
          rooms={rooms || []}
          gameComponents={gameComponents}
          playerName={playerName}
          createRoom={handleCreate}
          joinRoom={handleJoin}
        />
      )}
      {error}
    </>
  );
};

export default LobbyPage;
