import { PlayerView, Stage, INVALID_MOVE } from "boardgame.io/core";
import { keys, pickBy } from "lodash";
import proverbs from "./data/phrases/pl/proverbs.json";
import idioms from "./data/phrases/pl/idioms.json";
import nounPhrases from "./data/phrases/pl/noun_phrases.json";
import { currentTime } from "./utils/time";
import removeAccents from "remove-accents";

const modes = ["regular", "infinite"];

function setupGame(ctx, setupData) {
  const G = {
    secret: {
      phrase: "",
      phrases: ctx.random.Shuffle([...proverbs, ...idioms, ...nounPhrases]),
    },
    privateMatch: setupData && setupData.private,
    actionsCount: 0,
    startTime: new Date(),
    timePerTurn: 120,
    canChangePhrase: true,
    players: {},
    modes: modes,
    mode: modes[0],
    points: Array(ctx.numPlayers).fill(0),
    maxPoints: 0,
    actions: [],
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
  if (!stripPhrase(text)) return;
  LogAction(G, ctx, ctx.playerID, "message", { text: text });
}

function Guess(G, ctx, phrase) {
  if (!stripPhrase(phrase)) return;

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

function StartGame(G, ctx, mode, maxPoints = 0) {
  G.mode = mode;
  if (G.mode !== "infinite") {
    G.maxPoints = maxPoints;
  }
  ctx.events.setPhase("play");
}

function NotifyTimeout(G, ctx) {}

function indexOfMax(array) {
  const maxValue = Math.max(...array);
  return keys(pickBy(array, (p) => p === maxValue)).map(Number);
}

export const Kalambury = {
  name: "Kalambury",
  image: "/images/games/kalambury/icon.png",
  minPlayers: 2,
  maxPlayers: 10,

  seed: process.env.NODE_ENV === "production" ? undefined : "test",
  setup: setupGame,

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
            },
          },
          wait: {
            moves: {
              SendText: {
                move: SendText,
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
          G.turnEndTime = currentTime() + G.timePerTurn;
          LogAction(G, ctx, ctx.currentPlayer, "draw");
          ctx.events.setActivePlayers({ currentPlayer: "draw", others: "guess" });
        },
        onEnd: (G, ctx) => {
          if (currentTime() >= G.turnEndTime) {
            LogAction(G, ctx, ctx.currentPlayer, "timeout", { previous: G.secret.phrase }, true);
            G.points[ctx.currentPlayer] -= 1;
          }
        },
        endIf: (G, _ctx) => currentTime() >= G.turnEndTime,
        order: {
          first: () => 0,
          next: (G, ctx) => {
            const activeIdxs = keys(pickBy(ctx.matchData, "isConnected"));
            const nextActiveIdx = (activeIdxs.indexOf(ctx.currentPlayer) + 1) % activeIdxs.length;
            return parseInt(activeIdxs[nextActiveIdx] || 0);
          },
        },
        stages: {
          draw: {
            moves: {
              UpdateDrawing: {
                move: (_G, _ctx, lines) => {},
                broadcast: true,
              },
              ChangePhrase: {
                move: ChangePhrase,
                client: false,
              },
              Forfeit: {
                move: Forfeit,
                client: false,
              },
              NotifyTimeout,
            },
          },
          guess: {
            moves: {
              Guess: {
                move: Guess,
                unsafe: true,
                client: false,
              },
              NotifyTimeout,
            },
          },
        },
      },
    },
  },

  endIf: (G, ctx) => {
    if (G.secret.phrases.length === 0 && !G.secret.phrase) {
      ctx.events.setActivePlayers({ all: Stage.NULL });
      return { winners: indexOfMax(G.points) };
    }
    let winner = G.points.findIndex((points) => points >= G.maxPoints);
    if (G.mode !== "infinite" && G.maxPoints > 0 && winner >= 0) {
      ctx.events.setActivePlayers({ all: Stage.NULL });
      return { winners: indexOfMax(G.points) };
    }
  },

  playerView: PlayerView.STRIP_SECRETS,
};
