import { Client } from 'boardgame.io/react';
import KalamburyBoard from './KalamburyBoard';

function Guess(G, ctx, phrase) {
  G.guesses.push(ctx.playerID + ": " + phrase);
  if(phrase === G.phrase) {
    G.points[ctx.playerID] += 1;
    ctx.events.endTurn();
  }
}

Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
}

const PHRASES = [
  "Baba z wozu koniom lżej",
  "Gdzie kucharek sześć tam nie ma co jeść",
  "Mądry Polak po szkodzie",
  "Gdyby kózka nie skakała to by nóżki nie złamała",
  "Apetyt rośnie w miarę jedzenia",
  "Biednemu zawsze wiatr w oczy",
  "Gdzie dwóch się bije, tam trzeci korzysta",
  "Na bezrybiu i rak ryba",
  "Prawda w oczy kole",
]

const Kalambury = {
  setup: (ctx, setupData) => ({ phrase: "", points: Array(ctx.numPlayers).fill(0), phrases: PHRASES.slice().shuffle() }),

  moves: {},

  turn: {
    onBegin: (G, ctx) => {
      G.phrase = G.phrases.pop();
      ctx.events.setActivePlayers({ others: 'guess' });
    },
    stages: {
      guess: {
        moves: { Guess }
      }
    }
  }
};

const App = Client({ 
  game: Kalambury, 
  board: KalamburyBoard,
  numPlayers: 3
});

export default App;

