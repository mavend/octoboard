import { PlayerView, INVALID_MOVE } from "boardgame.io/core";
import proverbs from "./data/phrases/pl/proverbs.json";
import idioms from "./data/phrases/pl/idioms.json";
import nounPhrases from "./data/phrases/pl/noun_phrases.json";
import removeAccents from "remove-accents";

function setupKalambury(ctx, setupData) {
  const G = {
    secret: {
      phrase: "",
      phrases: ctx.random.Shuffle([...proverbs, ...idioms, ...nounPhrases]),
    },
    privateRoom: setupData && setupData.private,
    actionsCount: 0,
    startTime: new Date(),
    canChangePhrase: true,
    players: {},
    playersData: {},
    points: Array(ctx.numPlayers).fill(0),
    actions: [],
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

function LogAction(G, ctx, playerID, action, params = {}, clear = false) {
  if (clear) {
    G.actions = [];
  }
  G.actions.push({
    time: Date.now(),
    id: G.actionsCount++,
    playerID,
    action,
    ...params,
  });
}

function SendText(G, ctx, text) {
  LogAction(G, ctx, ctx.playerID, "message", { text: text });
}

function Guess(G, ctx, phrase) {
  let success = stripPhrase(phrase).includes(stripPhrase(G.secret.phrase));

  if (success) {
    G.points[ctx.playerID] += 1;
    G.points[ctx.currentPlayer] += 1;
    ctx.events.endTurn();
  }

  LogAction(G, ctx, ctx.playerID, "guess", { phrase, success }, success);
}

function SetNewPhrase(G, ctx) {
  G.secret.phrase = G.secret.phrases.pop();
  G.players[ctx.currentPlayer].phrase = G.secret.phrase;
}

function ChangePhrase(G, ctx) {
  // TODO: Track number of allowed changes?
  if (!G.canChangePhrase) {
    return INVALID_MOVE;
  }
  LogAction(G, ctx, ctx.playerID, "change", { previous: G.secret.phrase });
  G.canChangePhrase = false;
  SetNewPhrase(G, ctx);
}

function Forfeit(G, ctx) {
  G.points[ctx.playerID] -= 1;
  LogAction(G, ctx, ctx.playerID, "forfeit", { previous: G.secret.phrase }, true);
  ctx.events.endTurn();
}

function Ping(G, { playerID, phase }, playerData) {
  if (phase === "play") {
    G.remainingSeconds = 120 - Math.floor((new Date() - Date.parse(G.startTime)) / 1000);
  }
  updatePlayersData(G, playerID, playerData);
}

function StartGame(G, ctx) {
  ctx.events.setPhase("play");
}

function updatePlayersData(G, playerID, playerData) {
  G.playersData[playerID] = {
    ...(G.playersData[playerID] || {}),
    ...playerData,
    lastActivity: new Date(),
    id: playerID,
  };
  Object.values(G.playersData).forEach((player) => {
    player.isActive = new Date() - Date.parse(player.lastActivity) < 5000;
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

  seed: process.env.NODE_ENV === "production" ? undefined : "test",
  setup: setupKalambury,

  phases: {
    wait: {
      start: true,
      next: "play",
      turn: {
        onBegin: (G, ctx) => {
          LogAction(G, ctx, ctx.currentPlayer, "manage");
          ctx.events.setActivePlayers({ currentPlayer: "manage", others: "wait" });
        },
        stages: {
          manage: {
            moves: {
              SendText: {
                move: SendText,
                unsafe: true,
              },
              StartGame,
              Ping: {
                move: Ping,
                unsafe: true,
              },
            },
          },
          wait: {
            moves: {
              SendText: {
                move: SendText,
                unsafe: true,
              },
              Ping: {
                move: Ping,
                unsafe: true,
              },
            },
          },
        },
      },
    },
    play: {
      turn: {
        onBegin: (G, ctx) => {
          G.startTime = new Date();
          G.canChangePhrase = true;
          SetNewPhrase(G, ctx);
          G.remainingSeconds = 120;
          LogAction(G, ctx, ctx.currentPlayer, "draw");
          ctx.events.setActivePlayers({ currentPlayer: "draw", others: "guess" });
        },
        onEnd: (G, ctx) => {
          if (G.remainingSeconds <= 0) {
            LogAction(G, ctx, ctx.currentPlayer, "timeout", { previous: G.secret.phrase }, true);
            G.points[ctx.currentPlayer] -= 1;
          }
        },
        endIf: (G, _ctx) => G.remainingSeconds <= 0,
        order: {
          first: () => 0,
          next: (G, ctx) => {
            const activePlayersIdxs = Object.keys(G.playersData).filter(
              (pid) => G.playersData[pid].isActive
            );
            const nextActivePlayerIdx =
              (activePlayersIdxs.indexOf(ctx.currentPlayer) + 1) % activePlayersIdxs.length;
            return parseInt(activePlayersIdxs[nextActivePlayerIdx]);
          },
        },
        stages: {
          draw: {
            moves: {
              UpdateDrawing: {
                move: (_G, _ctx, lines) => {},
                unsafe: true,
                broadcast: true,
              },
              ChangePhrase: {
                move: ChangePhrase,
                client: false,
              },
              Ping: {
                move: Ping,
                unsafe: true,
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
                unsafe: true,
                client: false,
              },
              Ping: {
                move: Ping,
                unsafe: true,
              },
            },
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
