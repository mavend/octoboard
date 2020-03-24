import React, { useState } from "react";
import LobbyPage from "./lobby";
import LoginPage from "./LoginPage";

const CoronaGames = ({ lobbyServer, gameComponents }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [playerName, setPlayerName] = useState(localStorage.getItem("playerName") || "");

  const handleLogin = (name) => {
    setPlayerName(name);
    localStorage.setItem("playerName", name);
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <LobbyPage
          lobbyServer={lobbyServer}
          gameComponents={gameComponents}
          playerName={playerName}
        />
      ) : (
        <LoginPage open={true} playerName={playerName} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default CoronaGames;
