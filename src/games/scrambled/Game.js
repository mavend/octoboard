import { INVALID_MOVE, TurnOrder } from "boardgame.io/core";
import { keys, map, pick, pickBy, reduce, remove } from "lodash";
import { getTiles } from "./data/tiles";
import { getBoard } from "./data/boards";
import { tilesPlacementErrors, newWords, filterPlayedTiles, prepareTiles } from "./utils";
import { LogAction } from "../../utils/game/moves/LogAction";

function indexOfMax(array) {
  const maxValue = Math.max(...array);
  return keys(pickBy(array, (p) => p === maxValue)).map(Number);
}

const assists = ["none", "approval", "full"];

function setupGame(ctx, setupData) {
  const G = {
    secret: {
      tiles: [],
    },
    privateRoom: setupData && setupData.private,
    language: "en",
    board: getBoard(),
    actionsCount: 0,
    players: {},
    actions: [],
    pendingTiles: [],
    approvals: [],
    points: Array(ctx.numPlayers).fill(0),
    initialWordPlayed: false,
    skipCount: 0,
    tilesLeft: 0,
    assists: assists,
    assist: assists[1],
  };

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      tiles: [],
      tilesCount: 0,
    };
  }

  return G;
}

export function StartGame(G, ctx, language, assist) {
  G.language = language;
  G.assist = assist;
  G.secret.tiles = ctx.random.Shuffle(getTiles(language));
  G.tilesLeft = G.secret.tiles.length;
  ctx.events.setPhase("play");
}

function LogWords(G, currentPlayer, words, success) {
  words.forEach((word) =>
    LogAction(G, currentPlayer, "guess", { phrase: word.letters.join(""), success: success }, false)
  );
}

export function PlayTiles(G, ctx, state) {
  const playedTiles = filterPlayedTiles(state.tiles);

  if (tilesPlacementErrors(G, ctx.currentPlayer, playedTiles).length > 0) return INVALID_MOVE;

  G.skipCount = 0;
  G.pendingTiles = prepareTiles(playedTiles, G.players[ctx.currentPlayer].tiles);
  G.approvals = [];

  ctx.events.setActivePlayers({ currentPlayer: "wait_for_approval", others: "approve" });
}

function FinalizePlayTiles(G, ctx) {
  G.initialWordPlayed = true;

  // Calculate points before modifying board
  G.points[ctx.currentPlayer] += reduce(
    newWords(G.board, G.pendingTiles),
    (acc, { points }) => acc + points,
    0
  );

  // Give bonus points for playing all tiles
  if (G.pendingTiles.length === 7) {
    G.points[ctx.currentPlayer] += 50;
  }

  G.pendingTiles.forEach(({ id, x, y, replacement }) => {
    G.board[y].row[x] = remove(G.players[ctx.currentPlayer].tiles, (tile) => tile.id === id)[0];
    if (!G.board[y].row[x].letter) G.board[y].row[x].replacement = replacement;
  });

  LogWords(G, ctx.currentPlayer, newWords(G.board, G.pendingTiles), true);

  ctx.events.endTurn();
}

export function Approve(G, ctx, decision) {
  // If anyone disagrees - word is marked invalid
  if (decision === false) {
    LogWords(G, ctx.currentPlayer, newWords(G.board, G.pendingTiles), false);
    ctx.events.endTurn();
  } else {
    if (G.approvals.includes(ctx.playerID)) return INVALID_MOVE; // can't approve twice

    G.approvals.push(ctx.playerID);
    // If everyone agrees - word is played
    if (G.approvals.length === ctx.numPlayers - 1) {
      FinalizePlayTiles(G, ctx);
    }
  }
}

export function SwapTiles(G, ctx, tiles) {
  // Not enough tiles left to make a swap
  if (G.secret.tiles.length < 7) return INVALID_MOVE;

  tiles = prepareTiles(tiles, G.players[ctx.currentPlayer].tiles);

  // Some tiles don't belong to player (illegal move)
  if (!tiles) return INVALID_MOVE;

  const newTiles = [];
  tiles.forEach(({ id }) => {
    remove(G.players[ctx.currentPlayer].tiles, (tile) => tile.id === id);
    newTiles.push(G.secret.tiles.shift());
  });
  G.skipCount = 0;
  G.secret.tiles.push(...tiles);
  G.secret.tiles = ctx.random.Shuffle(G.secret.tiles);
  G.players[ctx.currentPlayer].tiles.push(...newTiles);
  ctx.events.endTurn();
}

export function SkipTurn(G, ctx) {
  G.skipCount += 1;
  if (G.skipCount >= ctx.numPlayers * 2) {
    ctx.events.endGame({ winners: indexOfMax(G.points) });
  } else {
    ctx.events.endTurn();
  }
}

export function DistributeTilesToPlayers(G, ctx) {
  for (let i = 0; i < ctx.numPlayers; i++) {
    while (G.secret.tiles.length > 0 && G.players[i].tiles.length < 7) {
      G.players[i].tiles.push(G.secret.tiles.shift());
    }
    G.players[i].tilesCount = G.players[i].tiles.length;
    if (G.players[i].tiles.length === 0) ctx.events.endGame({ winners: indexOfMax(G.points) });
  }
  G.tilesLeft = G.secret.tiles.length;
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
          LogAction(G, ctx.currentPlayer, "manage");
          ctx.events.setActivePlayers({ currentPlayer: "manage", others: "wait" });
        },
        stages: {
          manage: {
            moves: {
              StartGame: {
                move: StartGame,
                client: false,
              },
            },
          },
          wait: {
            moves: {},
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
          approve: {
            moves: {
              Approve: {
                move: Approve,
                client: false,
              },
            },
          },
          play: {
            moves: {
              PlayTiles: {
                move: PlayTiles,
                client: false,
              },
              SwapTiles: {
                move: SwapTiles,
                client: false,
              },
              SkipTurn: {
                move: SkipTurn,
              },
            },
          },
          wait_for_approval: {
            moves: {},
          },
        },
      },
    },
  },

  // remove secret and players tiles, but keep tilesCount for each player
  playerView: (G, ctx, playerID) => {
    const r = { ...G };

    if (r.secret !== undefined) {
      delete r.secret;
    }

    if (r.players) {
      r.players = map(r.players, (el, id) => (id === playerID ? el : pick(el, ["tilesCount"])));
    }

    return r;
  },
};
