import { PlayerView } from 'boardgame.io/core';
import phrases from './data/phrases/pl/proverbs.json';
import removeAccents  from 'remove-accents';
import { avatarForName } from "./utils/avatar";

const NAMES = ["John Doe", "Jay Query", "Myszojeleń"];

function setupKalambury(ctx, setupData) {
  const G = {
    secret: {
      phrase: "",
      startTime: new Date(),
      phrases: ctx.random.Shuffle(phrases.slice()),
    },
    players: {},
    playersData: {},
    points: Array(ctx.numPlayers).fill(0),
    drawing: [],
    guesses: [],
    remainingSeconds: 120,
  }

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      phrase: "",
    };
    G.playersData[i] = {
      name: NAMES[i],
      avatar: avatarForName(NAMES[i]),
    };
  }

  return G;
}

function stripPhrase(phrase) {
  return removeAccents(phrase).toLowerCase().replace(/\W/g,'');
}

function Guess(G, ctx, phrase) {
  const { playerID, currentPlayer } = ctx;
  if (!phrase) { phrase = G.secret.phrase; } // DEBUG
  let success = stripPhrase(phrase).includes(stripPhrase(G.secret.phrase));
  G.guesses.push({
    time: Date.now(),
    playerID,
    phrase,
    success
  })

  if (success) {
    G.points[playerID] += 1;
    G.points[currentPlayer] += 1;
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

function Ping(G, ctx) {
  G.remainingSeconds = 120 - Math.floor((new Date() - G.secret.startTime) / 1000);
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

export const Kalambury = {
  name: "Kalambury",
  minPlayers: 2,
  maxPlayers: 10,

  seed: "test",
  setup: setupKalambury,

  turn: {
    onBegin: (G, ctx) => {
      G.secret.startTime = new Date();
      G.secret.phrase = G.secret.phrases.pop();
      G.players[ctx.currentPlayer].phrase = G.secret.phrase;
      G.drawing = [];
      G.remainingSeconds = 120;
      ctx.events.setActivePlayers({currentPlayer: 'draw', others: 'guess' });
    },
    onEnd: (G, ctx) => {
      if (G.remainingSeconds <= 0) { G.points[ctx.currentPlayer] -= 1; }
    },
    endIf: (G, ctx) => (G.remainingSeconds <= 0),
    stages: {
      draw: {
        moves: {
          UpdateDrawing,
          Ping: {
            move: Ping,
            client: false
          },
          Forfeit: {
            move: Forfeit,
            client: false
          }
        }
      },
      guess: {
        moves: {
          Guess: {
            move: Guess,
            client: false
          },
          Ping: {
            move: Ping,
            client: false
          }
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

