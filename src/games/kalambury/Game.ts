import { PlayerView, Stage, INVALID_MOVE } from "boardgame.io/core";
import { keys, pickBy } from "lodash";

import { getPhrases } from "./data/phrases";

import { currentTime } from "./utils/time";
import removeAccents from "remove-accents";

import { PluginActions } from "plugins/actions";
import { CustomGame, CustomMoveFn } from "games/types";

const modes = ["regular", "infinite"];

function setupGame({ ctx }, setupData) {
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
    phraseCounter: 0,
    canChangePhrase: true,
    players: {},
    modes,
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

const Guess: CustomMoveFn = ({ G, ctx, actions, events, playerID }, phrase) => {
  if (!stripPhrase(phrase)) return;

  const success = stripPhrase(phrase).includes(stripPhrase(G.secret.phrase));

  if (success) {
    G.points[playerID] += 1;
    G.points[ctx.currentPlayer] += 1;
    events.endTurn();
    actions.clear();
  }

  actions.log(playerID, "guess", { phrase, success });
};

function SetNewPhrase({ G, ctx }) {
  G.secret.phrase = G.secret.phrases.pop();
  G.players[ctx.currentPlayer].phrase = G.secret.phrase;
  G.phraseCounter++;
}

function ChangePhrase({ G, ctx, actions, playerID }) {
  // TODO: Track number of allowed changes?
  if (!G.canChangePhrase) {
    return INVALID_MOVE;
  }
  const { phrase } = G.secret;
  actions.log(playerID, "change", { phrase });
  G.canChangePhrase = false;
  SetNewPhrase({ G, ctx });
}

function Forfeit({ G, ctx, actions, events, playerID }) {
  G.points[playerID] -= 1;
  const { phrase } = G.secret;
  actions.clear();
  actions.log(G, playerID, "forfeit", { phrase });
  events.endTurn();
}

function StartGame({ G, events, random }, gameMode, maxPoints, language, category, timePerTurn) {
  G.started = true;
  G.mode = gameMode;
  if (G.gameMode !== "infinite") {
    G.maxPoints = Number(maxPoints) || 0;
  }
  G.secret.phrases = random.Shuffle(getPhrases(language, category));
  G.timePerTurn = Number(timePerTurn);
  events.setPhase("play");
}

function NotifyTimeout({ G, ctx }) {}

function UpdateConnectedPlayers({ G, ctx }, connectedPlayers) {
  G.connectedPlayers = connectedPlayers;
}

function indexOfMax(array) {
  const maxValue = Math.max(...array);
  return keys(pickBy(array, (p) => p === maxValue)).map(Number);
}

export const Kalambury: CustomGame = {
  name: "Kalambury",
  displayName: "Pictionary",
  image: "/images/games/kalambury/icon.png",
  minPlayers: 2,
  maxPlayers: 10,

  seed: process.env.NODE_ENV === "production" ? undefined : "test",
  setup: setupGame,

  plugins: [PluginActions()],

  phases: {
    wait: {
      start: true,
      next: "play",
      turn: {
        onBegin: ({ G, ctx, actions, events }) => {
          actions.log(ctx.currentPlayer, "manage");
          events.setActivePlayers({ currentPlayer: "manage", others: "wait" });
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
        onBegin: ({ G, ctx, actions, events }) => {
          G.startTime = currentTime();
          G.canChangePhrase = true;
          SetNewPhrase({ G, ctx });
          G.turnEndTime = currentTime() + G.timePerTurn;
          actions.log(ctx.currentPlayer, "draw");
          events.setActivePlayers({ currentPlayer: "draw", others: "guess" });
        },
        onEnd: ({ G, ctx, actions }) => {
          if (currentTime() >= G.turnEndTime) {
            const { phrase } = G.secret;
            actions.clear();
            actions.log(ctx.currentPlayer, "timeout", { phrase });
            G.points[ctx.currentPlayer] -= 1;
          }
        },
        endIf: ({ G }) => currentTime() >= G.turnEndTime,
        order: {
          first: () => 0,
          next: ({ G, ctx }) => {
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

  endIf: ({ G, ctx, events }) => {
    if (G.started && G.secret.phrases.length === 0 && !G.secret.phrase) {
      events.setActivePlayers({ all: Stage.NULL });
      return { winners: indexOfMax(G.points) };
    }
    const winner = G.points.findIndex((points) => points >= G.maxPoints);
    if (G.mode !== "infinite" && G.maxPoints > 0 && winner >= 0) {
      events.setActivePlayers({ all: Stage.NULL });
      return { winners: indexOfMax(G.points) };
    }
  },

  playerView: PlayerView.STRIP_SECRETS,
};
