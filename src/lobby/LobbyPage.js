import React, { useState, useEffect } from "react";
import { isEqual, find } from "lodash";
import GameClient from "./GameClient";
import GameLobby from "./GameLobby";
import { useLobbyConnection } from "./lobby_connection";
import { Container, Segment, Dimmer, Loader } from "semantic-ui-react";

const LobbyPage = ({ server, gameComponents, playerName }) => {
  const [playerCredentials, setPlayerCredentials] = useState();
  const [currentGame, setCurrentGame] = useState();
  const [urlGameParam, setUrlGameParam] = useState();

  const {
    loading,
    setPolling,
    rooms,
    credentials,
    error,
    createRoom,
    joinRoom,
    leaveGame,
  } = useLobbyConnection({
    server,
    gameComponents,
    playerName,
    playerCredentials: localStorage.getItem("playerCredentials"),
  });

  // Load gameID from URL on the page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUrlGameParam(urlParams.get("gameID"));
  }, [setUrlGameParam]);

  // Update credentials in localStorage
  useEffect(() => {
    setPlayerCredentials(credentials);
    localStorage.setItem("playerCredentials", credentials);
  }, [credentials]);

  // Check if player is already in a game room
  useEffect(() => {
    if (loading || !playerName || currentGame) return;

    const room = rooms.find((room) => room.players.find((p) => p.name === playerName));
    if (room) {
      // Player already in room
      const { gameID, gameName, players } = room;
      const playerID = find(players, { name: playerName }).id.toString();
      const newGame = { gameName, gameID, playerID };
      setCurrentGame((currentGame) => (isEqual(currentGame, newGame) ? currentGame : newGame));
      setUrlGameParam(null);
      setPolling(false);
    } else {
      // Check gameID from URL
      if (urlGameParam && !currentGame) {
        const room = find(rooms, { gameID: urlGameParam });
        const freeSpot = room && room.players.find((p) => !p.name);
        if (room && freeSpot) {
          handleJoin(room.gameName, urlGameParam, freeSpot.id);
        } else {
          setUrlGameParam(null);
        }
      }
    }
  }, [loading, urlGameParam, playerName, rooms, setCurrentGame]);

  const handleCreate = async (game, numPlayers) => {
    const gameID = await createRoom(game, numPlayers);
    handleJoin(game.name, gameID, 0);
  };

  const handleJoin = async (gameName, gameID, freeSpotId) => {
    await joinRoom(gameName, gameID, freeSpotId);
    setCurrentGame({ gameName, gameID, playerID: freeSpotId.toString() });
    setUrlGameParam(null);
    setPolling(false);
  };

  const handleLeave = async (gameName, gameID) => {
    await leaveGame(gameName, gameID);
    setCurrentGame(null);
    setUrlGameParam(null);
    setPolling(true);
  };

  return (
    <>
      {urlGameParam && !currentGame && (
        <Dimmer active>
          <Loader>Joining game</Loader>
        </Dimmer>
      )}

      {error && (
        <Container>
          <Segment inverted color="red">
            {error}
          </Segment>
        </Container>
      )}

      {playerName && currentGame && currentGame.gameID ? (
        <GameClient
          server={server}
          playerID={currentGame.playerID}
          gameID={currentGame.gameID}
          credentials={playerCredentials}
          gameComponent={gameComponents.find((g) => g.game.name === currentGame.gameName)}
          leaveGame={handleLeave}
        />
      ) : (
        <GameLobby
          loading={loading && (!urlGameParam || currentGame)}
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
