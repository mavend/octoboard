import { PlayerView, Stage, INVALID_MOVE } from "boardgame.io/core";
import { keys, pickBy } from "lodash";

import { getPhrases } from "./data/phrases";

import { currentTime } from "./utils/time";
import removeAccents from "remove-accents";

const modes = ["regular", "infinite"];

function setupGame(ctx, setupData) {
  const G = {
    started: false,
    secret: {
      phrase: "",
      phrases: [],
    },
    privateMatch: setupData && setupData.private,
    actionsCount: 0,
    startTime: currentTime(),
    timePerTurn: 120,
    canChangePhrase: true,
    players: {},
    modes: modes,
    mode: modes[0],
    points: Array(ctx.numPlayers).fill(0),
    maxPoints: 0,
    actions: [],
    connectedPlayers: [],
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
    time: new Date().toISOString(),
    id: G.actionsCount++,
    playerID,
    action,
    ...params,
  });
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

function StartGame(G, ctx, gameMode, maxPoints, language, category) {
  G.started = true;
  G.mode = gameMode;
  if (G.gameMode !== "infinite") {
    G.maxPoints = maxPoints || 0;
  }
  G.secret.phrases = ctx.random.Shuffle(getPhrases(language, category));
  ctx.events.setPhase("play");
}

function NotifyTimeout(G, ctx) {}

function UpdateConnectedPlayers(G, ctx, connectedPlayers) {
  G.connectedPlayers = connectedPlayers;
}

function indexOfMax(array) {
  const maxValue = Math.max(...array);
  return keys(pickBy(array, (p) => p === maxValue)).map(Number);
}

export const Kalambury = {
  name: "Kalambury",
  displayName: "Pictionary",
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
              StartGame: {
                move: StartGame,
                client: false,
              },
              UpdateConnectedPlayers: {
                move: UpdateConnectedPlayers,
                ignoreStaleStateID: true,
              },
            },
          },
          wait: {
            moves: {
              UpdateConnectedPlayers: {
                move: UpdateConnectedPlayers,
                ignoreStaleStateID: true,
              },
            },
          },
        },
      },
    },
    play: {
      turn: {
        onBegin: (G, ctx) => {
          G.startTime = currentTime();
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
            const currentPlayer = parseInt(ctx.currentPlayer);
            if (G.connectedPlayers && G.connectedPlayers.length > 0) {
              const nextActiveIdx =
                (G.connectedPlayers.indexOf(currentPlayer) + 1) % G.connectedPlayers.length;
              return G.connectedPlayers[nextActiveIdx] || 0;
            }
            return (currentPlayer + 1) % ctx.numPlayers;
          },
        },
        stages: {
          draw: {
            moves: {
              ChangePhrase: {
                move: ChangePhrase,
                client: false,
              },
              Forfeit: {
                move: Forfeit,
                client: false,
              },
              NotifyTimeout: {
                move: NotifyTimeout,
                ignoreStaleStateID: true,
              },
              UpdateConnectedPlayers: {
                move: UpdateConnectedPlayers,
                ignoreStaleStateID: true,
              },
            },
          },
          guess: {
            moves: {
              Guess: {
                move: Guess,
                ignoreStaleStateID: true,
                client: false,
              },
              NotifyTimeout,
              UpdateConnectedPlayers: {
                move: UpdateConnectedPlayers,
                ignoreStaleStateID: true,
              },
            },
          },
        },
      },
    },
  },

  endIf: (G, ctx) => {
    if (G.started && G.secret.phrases.length === 0 && !G.secret.phrase) {
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
