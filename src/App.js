import React from 'react';
import { Client, Lobby } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Kalambury } from './Kalambury';
import KalamburyBoard from './KalamburyBoard';
import Loading from './Loading';
import GameLobby from "./lobby";

const KalamburyClient = Client({ 
  game: Kalambury, 
  board: KalamburyBoard,
  loading: Loading,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  numPlayers: 3,
  debug: new URLSearchParams(window.location.search).get('debug') || false
});

const App = () => {
  const queryString = window.location.search;
  const urlParams= new URLSearchParams(queryString);
  return (
    <div>
      <GameLobby
        lobbyServer="http://localhost:8000"
        gameComponents={[{game: Kalambury, board: KalamburyBoard}]}
        playerName={"Patryk"}
        />
      <Lobby
        lobbyServer="http://localhost:8000"
        gameComponents={[{game: Kalambury, board: KalamburyBoard}]} />
      {/* <KalamburyClient playerID={urlParams.get('id') || "0"} /> */}
    </div>
  );
};

export default App;
