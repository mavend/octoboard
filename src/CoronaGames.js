import React, { useState } from "react";
import LobbyPage from "./lobby";
import LoginPage from "./LoginPage";

const CoronaGames = ({ lobbyServer, gameComponents }) => {
  const [playerName, setPlayerName] = useState(localStorage.getItem("playerName") || "");

  const handleLogin = (name) => {
    name = [name, Math.random().toString(36).substr(2, 5)].join("-");
    setPlayerName(name);
    localStorage.setItem("playerName", name);
  };

  return (
    <div>
      {playerName ? (
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
