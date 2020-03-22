import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { Kalambury } from './Kalambury';
import KalamburyBoard from './KalamburyBoard';

const KalamburyClient = Client({ 
  game: Kalambury, 
  board: KalamburyBoard,
  multiplayer: Local(),
  numPlayers: 3,
  debug: false
});

const App = () => (
  <div>
    <KalamburyClient playerID="0" />
    <KalamburyClient playerID="1" />
    <KalamburyClient playerID="2" />
  </div>
);

export default App;

