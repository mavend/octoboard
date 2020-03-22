import { PlayerView } from 'boardgame.io/core';
import { Client } from 'boardgame.io/react';
import KalamburyBoard from './KalamburyBoard';

function setupKalambury(ctx, setupData) {
  const G = {
    secret: {
      phrase: "",
      phrases: PHRASES.slice().shuffle(),
    },
    players: {},
    points: Array(ctx.numPlayers).fill(0),
    drawing: [],
  }

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      phrase: "",
    };
  }

  return G;
}

function Guess(G, ctx, phrase) {
  if (!phrase) { phrase = G.secret.phrase; } // DEBUG
  if (phrase.toLowerCase() === G.secret.phrase.toLowerCase()) {
    G.points[ctx.playerID] += 1;
    G.points[ctx.currentPlayer] += 1;
    ctx.events.endTurn();
  }
}

function UpdateDrawing(G, _ctx, lines) {
  G.drawing = lines;
}

function Forfeit(G, ctx) {
  G.points[ctx.currentPlayer] -= 1;
  ctx.events.endTurn();
}

function IndexOfMax(array) {
  let max = array[0];
  let maxIndexes = [0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
      maxIndexes = [i]
    } else if (array[i] === max) {
      maxIndexes.push(i);
    }
  }

  return maxIndexes;
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
  setup: setupKalambury,

  turn: {
    onBegin: (G, ctx) => {
      G.secret.phrase = G.secret.phrases.pop();
      G.players[ctx.currentPlayer].phrase = G.secret.phrase;
      ctx.events.setActivePlayers({currentPlayer: 'draw', others: 'guess' });
    },
    stages: {
      draw: {
        moves: { UpdateDrawing, Forfeit }
      },
      guess: {
        moves: {
          Guess: {
            move: Guess,
            client: false,
          },
        },
      },
    },
  },

  endIf: (G, ctx) => {
    if (G.secret.phrases.length === 0 && !G.secret.phrase) {
      return { winners: IndexOfMax(G.points) };
    }
  },

  playerView: PlayerView.STRIP_SECRETS,
};

const App = Client({ 
  game: Kalambury, 
  board: KalamburyBoard,
  numPlayers: 3
});

export default App;

