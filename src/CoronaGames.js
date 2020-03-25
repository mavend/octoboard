import React, {useContext} from "react";
import LobbyPage from "./lobby";
import LoginPage from "./LoginPage";
import {UserContext} from "./contexts/UserContext";

const CoronaGames = ({ server, gameComponents }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <LobbyPage server={server} gameComponents={gameComponents} playerName={playerName} />
      ) : (
        <LoginPage open={true} />
      )}
    </div>
  );
};

export default CoronaGames;
