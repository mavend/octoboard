import React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Kalambury } from './Kalambury';
import KalamburyBoard from './KalamburyBoard';

const KalamburyClient = Client({ 
  game: Kalambury, 
  board: KalamburyBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  numPlayers: 3,
  debug: false
});

const App = () => {
  const queryString = window.location.search;
  const urlParams= new URLSearchParams(queryString);
  return (
  <div>
    <KalamburyClient playerID={urlParams.get('id') || "0"} />
  </div>
  );
};

export default App;
