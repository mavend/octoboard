import React from "react";
import { KalamburyComponent } from "./games/Games";
import CoronaGames from "./CoronaGames";

const App = () => {
  return (
    <div>
      <CoronaGames
        lobbyServer="http://localhost:8000"
        gameComponents={[KalamburyComponent]}
      />
    </div>
  );
};

export default App;
