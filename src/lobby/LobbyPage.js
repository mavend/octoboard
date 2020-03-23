import React, { useState, useEffect } from "react";
import GameClient from "./GameClient";
import GameLobby from "./GameLobby";

const LobbyPage = ({ lobbyServer, gameComponents, playerName }) => {
  const [playerCredentials, setPlayerCredentials] = useState(
    JSON.parse(localStorage.getItem("playerCredentials")) || {}
  );
  const [currentGame, setCurrentGame] = useState(
    JSON.parse(localStorage.getItem("currentGame")) || {}
  );

  useEffect(() => {
    localStorage.setItem("playerCredentials", JSON.stringify(playerCredentials));
  }, [playerCredentials]);

  useEffect(() => {
    localStorage.setItem("currentGame", JSON.stringify(currentGame));
  }, [currentGame]);

  return (
    <>
      {currentGame && currentGame.gameID ? (
        <GameClient
          playerID={currentGame.playerID}
          gameID={currentGame.gameID}
          credentials={playerCredentials[playerName]}
          gameComponent={gameComponents.find((g) => g.game.name === currentGame.gameName)}
        />
      ) : (
        <GameLobby
          lobbyServer={lobbyServer}
          gameComponents={gameComponents}
          playerName={playerName}
          playerCredentials={playerCredentials}
          onUpdateCredentials={setPlayerCredentials}
          currentGame={currentGame}
          onUpdateGame={setCurrentGame}
        />
      )}
    </>
  );
};

export default LobbyPage;
