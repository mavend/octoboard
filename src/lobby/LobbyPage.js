import React, { useState, useEffect } from "react";
import { isEqual, find } from "lodash";
import GameClient from "./GameClient";
import GameLobby from "./GameLobby";
import { useLobbyConnection } from "./lobby_connection";
import { Container, Segment } from "semantic-ui-react";
import { setUrlParam } from "../utils/url";

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
    if (!playerName) return;
    const room = rooms.find((room) => room.players.find((p) => p.name === playerName));
    if (room) {
      const { gameID, gameName, players } = room;
      const playerID = find(players, { name: playerName }).id.toString();
      const newGame = { gameName, gameID, playerID };
      setCurrentGame((currentGame) => (isEqual(currentGame, newGame) ? currentGame : newGame));
    } else {
      if (!currentGame) {
        // Check gameID from URL
        console.log("Running");
        const urlParams = new URLSearchParams(window.location.search);
        const gameID = urlParams.get("gameID");
        if (gameID) {
          const room = find(rooms, { gameID });
          const freeSpot = room && room.players.find((p) => !p.name);
          if (room && freeSpot) {
            console.log("Joining");
            handleJoin(room.gameName, gameID, freeSpot.id);
          }
        }
      }

      setCurrentGame(null);
    }
  }, [playerName, rooms, setCurrentGame]);

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
      {error && (
        <Container>
          <Segment inverted color="red">
            {error}
          </Segment>
        </Container>
      )}
      {playerName && currentGame && currentGame.gameID ? (
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
    </>
  );
};

export default LobbyPage;
