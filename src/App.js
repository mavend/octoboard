import React from "react";
import { Kalambury } from "./Kalambury";
import KalamburyBoard from "./KalamburyBoard";
import LobbyPage from "./lobby";

const App = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return (
    <div>
      <LobbyPage
        lobbyServer="http://localhost:8000"
        gameComponents={[{ game: Kalambury, board: KalamburyBoard }]}
        playerName={urlParams.get("name") || "Patryk"}
      />
    </div>
  );
};

export default App;
