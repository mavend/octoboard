import { PlayerView, INVALID_MOVE } from "boardgame.io/core";
import phrases from "./data/phrases/pl/proverbs.json";
import removeAccents from "remove-accents";

function setupKalambury(ctx, setupData) {
  const G = {
    secret: {
      phrase: "",
      startTime: new Date(),
      phrases: ctx.random.Shuffle(phrases.slice()),
    },
    canChangePhrase: true,
    players: {},
    playersData: {},
    points: Array(ctx.numPlayers).fill(0),
    drawing: [],
    guesses: [],
    remainingSeconds: 120,
  };

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      phrase: "",
    };
  }

  return G;
}

function stripPhrase(phrase) {
  return removeAccents(phrase).toLowerCase().replace(/\W/g, "");
}

function nextActivePlayer(G, { currentPlayer }) {
  const activePlayersIdxs = Object.keys(G.playersData).filter((pid) => G.playersData[pid].isActive);
  const nextActivePlayerIdx =
    (activePlayersIdxs.indexOf(currentPlayer) + 1) % activePlayersIdxs.length;
  return activePlayersIdxs[nextActivePlayerIdx];
}

function Guess(G, ctx, phrase) {
  const { playerID, currentPlayer } = ctx;
  if (!phrase) {
    phrase = G.secret.phrase;
  } // DEBUG
  let success = stripPhrase(phrase).includes(stripPhrase(G.secret.phrase));
  G.guesses.push({
    time: Date.now(),
    playerID,
    phrase,
    success,
  });

  if (success) {
    G.points[playerID] += 1;
    G.points[currentPlayer] += 1;
    ctx.events.endTurn({ next: nextActivePlayer(G, ctx) });
  }
}

function SetNewPhrase(G, ctx) {
  G.secret.phrase = G.secret.phrases.pop();
  G.players[ctx.currentPlayer].phrase = G.secret.phrase;
  G.drawing = [];
}

function ChangePhrase(G, ctx) {
  // TODO: Track number of allowed changes?
  if (!G.canChangePhrase) {
    return INVALID_MOVE;
  }
  G.canChangePhrase = false;
  SetNewPhrase(G, ctx);
}

function UpdateDrawing(G, _ctx, lines) {
  G.drawing = lines;
}

function Forfeit(G, ctx) {
  G.points[ctx.currentPlayer] -= 1;
  ctx.events.endTurn({ next: nextActivePlayer(G, ctx) });
}

function Ping(G, { playerID }, playerData) {
  G.remainingSeconds = 120 - Math.floor((new Date() - G.secret.startTime) / 1000);
  updatePlayersData(G, playerID, playerData);
}

function updatePlayersData(G, playerID, playerData) {
  G.playersData[playerID] = {
    ...(G.playersData[playerID] || {}),
    ...playerData,
    lastActivity: new Date(),
    id: playerID,
  };
  Object.values(G.playersData).forEach((player) => {
    player.isActive = new Date() - player.lastActivity < 5000;
  });
}

function indexOfMax(array) {
  const maxValue = Math.max(...array);
  const maxIndexes = [];
  let index = array.indexOf(maxValue);
  while (index >= 0) {
    maxIndexes.push(index);
    index = array.indexOf(maxValue, index + 1);
  }
  return maxIndexes;
}

export const Kalambury = {
  name: "Kalambury",
  image: "/images/kalambury-icon.png",
  minPlayers: 2,
  maxPlayers: 10,

  seed: "test",
  setup: setupKalambury,

  turn: {
    onBegin: (G, ctx) => {
      G.secret.startTime = new Date();
      G.canChangePhrase = true;
      SetNewPhrase(G, ctx);
      G.remainingSeconds = 120;
      ctx.events.setActivePlayers({ currentPlayer: "draw", others: "guess" });
    },
    onEnd: (G, ctx) => {
      if (G.remainingSeconds <= 0) {
        G.points[ctx.currentPlayer] -= 1;
      }
    },
    endIf: (G, ctx) => G.remainingSeconds <= 0 && { next: nextActivePlayer(G, ctx) },
    stages: {
      draw: {
        moves: {
          UpdateDrawing,
          ChangePhrase: {
            move: ChangePhrase,
            client: false,
          },
          Ping: {
            move: Ping,
            client: false,
          },
          Forfeit: {
            move: Forfeit,
            client: false,
          },
        },
      },
      guess: {
        moves: {
          Guess: {
            move: Guess,
            client: false,
          },
          Ping: {
            move: Ping,
            client: false,
          },
        },
      },
    },
  },

  endIf: (G, ctx) => {
    if (G.secret.phrases.length === 0 && !G.secret.phrase) {
      return { winners: indexOfMax(G.points) };
    }
  },

  playerView: PlayerView.STRIP_SECRETS,
};
