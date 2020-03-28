import React, { useState } from "react";
import LobbyPage from "./lobby";
import LoginPage from "./LoginPage";
import { KalamburyComponent } from "./games/Games";

const CoronaGames = ({ server, gameComponents}) => {
  const [playerName, setPlayerName] = useState(localStorage.getItem("playerName") || "");

  const handleLogin = (name) => {
    name = [name, Math.random().toString(36).substr(2, 5)].join("-");
    setPlayerName(name);
    localStorage.setItem("playerName", name);
  };

  return (
    <>
    <div>
      {playerName ? (
        <LobbyPage server={'http://localhost:8000'} gameComponents={[KalamburyComponent]} playerName={playerName} />
      ) : (
        <LoginPage open={true} playerName={playerName} onLogin={handleLogin} />
      )}
    </div>
    </>
  );
};

export default CoronaGames;
