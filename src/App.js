import React from "react";
import { KalamburyComponent } from "./games/Games";
import CoronaGames from "./CoronaGames";
import {UserContextProvider} from "./contexts/UserContext";

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <CoronaGames
          server="http://localhost:8000"
          gameComponents={[KalamburyComponent]}
        />
      </UserContextProvider>
    </div>
  );
};

export default App;
