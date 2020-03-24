import React from "react";
import { Kalambury } from "./games/kalambury/Kalambury";
import KalamburyBoard from "./games/kalambury/KalamburyBoard";
import CoronaGames from "./CoronaGames";

const App = () => {
  return (
    <div>
      <CoronaGames
        lobbyServer="http://localhost:8000"
        gameComponents={[{ game: Kalambury, board: KalamburyBoard }]}
      />
    </div>
  );
};

export default App;
