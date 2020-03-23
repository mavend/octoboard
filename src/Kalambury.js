import { PlayerView } from 'boardgame.io/core';
import phrases from './data/phrases/pl/proverbs.json';
import removeAccents  from 'remove-accents';
import { avatarForName } from "./utils/avatar";

const NAMES = ["John Doe", "Jay Query", "Myszojeleń"];

function setupKalambury(ctx, setupData) {
  const G = {
    secret: {
      phrase: "",
      phrases: ctx.random.Shuffle(phrases.slice()),
    },
    players: {},
    playersData: {},
    points: Array(ctx.numPlayers).fill(0),
    drawing: [],
    guesses: [],
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
  let success = stripPhrase(phrase) === stripPhrase(G.secret.phrase);
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
      G.secret.phrase = G.secret.phrases.pop();
      G.players[ctx.currentPlayer].phrase = G.secret.phrase;
      G.drawing = [];
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

