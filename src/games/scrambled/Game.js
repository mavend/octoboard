import { INVALID_MOVE, PlayerView, TurnOrder } from "boardgame.io/core";
import { intersectionBy } from "lodash";
import { getTiles } from "./data/tiles";

const A = { bonus: { type: "letter", multiply: 2 } };
const B = { bonus: { type: "letter", multiply: 3 } };
const C = { bonus: { type: "word", multiply: 2 } };
const D = { bonus: { type: "word", multiply: 3 } };
const S = { ...C, start: true };

const board = [
  { row: [D, 0, 0, A, 0, 0, 0, D, 0, 0, 0, A, 0, 0, D] },
  { row: [0, C, 0, 0, 0, B, 0, 0, 0, B, 0, 0, 0, C, 0] },
  { row: [0, 0, C, 0, 0, 0, A, 0, A, 0, 0, 0, C, 0, 0] },
  { row: [A, 0, 0, C, 0, 0, 0, A, 0, 0, 0, C, 0, 0, A] },
  { row: [0, 0, 0, 0, C, 0, 0, 0, 0, 0, C, 0, 0, 0, 0] },
  { row: [0, B, 0, 0, 0, B, 0, 0, 0, B, 0, 0, 0, B, 0] },
  { row: [0, 0, A, 0, 0, 0, A, 0, A, 0, 0, 0, A, 0, 0] },
  { row: [D, 0, 0, A, 0, 0, 0, S, 0, 0, 0, A, 0, 0, D] },
  { row: [0, 0, A, 0, 0, 0, A, 0, A, 0, 0, 0, A, 0, 0] },
  { row: [0, B, 0, 0, 0, B, 0, 0, 0, B, 0, 0, 0, B, 0] },
  { row: [0, 0, 0, 0, C, 0, 0, 0, 0, 0, C, 0, 0, 0, 0] },
  { row: [A, 0, 0, C, 0, 0, 0, A, 0, 0, 0, C, 0, 0, A] },
  { row: [0, 0, C, 0, 0, 0, A, 0, A, 0, 0, 0, C, 0, 0] },
  { row: [0, C, 0, 0, 0, B, 0, 0, 0, B, 0, 0, 0, C, 0] },
  { row: [D, 0, 0, A, 0, 0, 0, D, 0, 0, 0, A, 0, 0, D] },
];

function setupGame(ctx, setupData) {
  const G = {
    secret: {
      letters: [],
    },
    privateRoom: setupData && setupData.private,
    language: "en",
    board: board,
    actionsCount: 0,
    players: {},
    actions: [],
    points: Array(ctx.numPlayers).fill(0),
  };

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      letters: [],
    };
  }

  return G;
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

function SendText(G, ctx, text) {
  if (!text) return;
  LogAction(G, ctx, ctx.playerID, "message", { text: text });
}

function StartGame(G, ctx, language) {
  G.language = language;
  G.secret.letters = ctx.random.Shuffle(getTiles(language));
  ctx.events.setPhase("play");
}

export function PlayTiles(G, ctx, tiles) {
  const playedTiles = tiles.filter((tile) => tile.x !== undefined && tile.y !== undefined);
  if (
    intersectionBy(playedTiles, G.players[ctx.currentPlayer].letters, "id").length !==
    playedTiles.length
  ) {
    return INVALID_MOVE;
  }

  playedTiles.forEach(({ id, x, y }) => {
    const letterIdx = G.players[ctx.currentPlayer].letters.findIndex((tile) => tile.id === id);
    G.board[y].row[x] = G.players[ctx.currentPlayer].letters.splice(letterIdx, 1)[0];
  });

  G.points[ctx.currentPlayer] += 10; // TODO: Calculate points
  ctx.events.endTurn(); // TODO: Add verification phase
}

export function DistributeTilesToPlayers(G, ctx) {
  for (let i = 0; i < ctx.numPlayers; i++) {
    while (G.players[i].letters.length < 7) {
      G.players[i].letters.push(G.secret.letters.shift());
    }
  }
}

export const Scrambled = {
  name: "Scrambled",
  image: "/images/games/scrambled/icon.png",
  minPlayers: 2,
  maxPlayers: 4,

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
              StartGame: {
                move: StartGame,
                client: false,
              },
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
      onBegin: (G, ctx) => {
        DistributeTilesToPlayers(G, ctx);
      },
      turn: {
        onBegin: (G, ctx) => {
          ctx.events.setActivePlayers({ currentPlayer: "play", others: "wait" });
        },
        onEnd: (G, ctx) => {
          DistributeTilesToPlayers(G, ctx);
        },
        order: TurnOrder.RESET,
        stages: {
          wait: {
            moves: {},
          },
          play: {
            moves: {
              PlayTiles: {
                move: PlayTiles,
                client: false,
              },
            },
          },
        },
      },
    },
  },

  playerView: PlayerView.STRIP_SECRETS,
};
