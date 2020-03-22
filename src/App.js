import { Client } from 'boardgame.io/react';
import KalamburyBoard from './KalamburyBoard';

function SetPhrase(G, ctx, phrase) {
  G.phrase = phrase;
  ctx.events.setActivePlayers({ others: 'guess' });
}

function Guess(G, ctx, phrase) {
  G.guesses.push(ctx.playerID + ": " + phrase);
  if(phrase === G.phrase) {
    G.points[ctx.playerID] += 1;
    ctx.events.endTurn();
  }
}

const DICTIONARY = ["kot", "pies", "słoń"];

const Kalambury = {
  setup: (ctx) => ({ phrase: "", points: Array(ctx.numPlayers).fill(0), guesses: [] }),
  
  moves: { SetPhrase },
  
  turn: {
    onBegin: (G, ctx) => {
      G.phrase = DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];
      ctx.events.setActivePlayers({ others: 'guess' });
    },
    
    stages: {
      guess: {
        moves: { Guess }
      }
    }
  },
};

const App = Client({ 
  game: Kalambury, 
  board: KalamburyBoard,
  numPlayers: 3
});

export default App;

