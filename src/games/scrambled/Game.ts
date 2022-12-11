import { INVALID_MOVE, TurnOrder } from "boardgame.io/core";
import { keys, map, pick, pickBy, reduce, remove } from "lodash";
import { getTiles, Tile } from "./data/tiles";
import { getBoard } from "./data/boards";
import { tilesPlacementErrors, newWords, filterPlayedTiles, prepareTiles } from "./utils";
import { PluginActions } from "plugins/actions";
import { CustomGame, CustomMoveFn } from "games/types";

function indexOfMax(array) {
  const maxValue = Math.max(...array);
  return keys(pickBy(array, (p) => p === maxValue)).map(Number);
}

const assists = ["none", "approval", "full"];

function setupGame({ ctx }, setupData) {
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
    assists,
    assist: assists[1],
    preview: true,
  };

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      tiles: [],
      tilesCount: 0,
    };
  }

  return G;
}

export const StartGame: CustomMoveFn = ({ G, events, random }, language, assist, preview) => {
  G.language = language;
  G.assist = assist;
  G.preview = preview;
  G.secret.tiles = random.Shuffle(getTiles(language));
  G.tilesLeft = G.secret.tiles.length;
  events.setPhase("play");
};

function LogWords({ ctx, actions }, words, success) {
  words.forEach((word) =>
    actions.log(ctx.currentPlayer, "word", { word: word.letters.join(""), success })
  );
}

export const PlayTiles: CustomMoveFn = ({ G, ctx, events }, state) => {
  const playedTiles = filterPlayedTiles(state.tiles);

  if (tilesPlacementErrors(G, ctx.currentPlayer, playedTiles).length > 0) return INVALID_MOVE;

  G.skipCount = 0;
  G.pendingTiles = prepareTiles(playedTiles, G.players[ctx.currentPlayer].tiles);
  G.approvals = [];

  events.setActivePlayers({ currentPlayer: "wait_for_approval", others: "approve" });
};

function FinalizePlayTiles({ G, ctx, actions, events }) {
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
    G.board[y].row[x] = remove(
      G.players[ctx.currentPlayer].tiles,
      (tile: Tile) => tile.id === id
    )[0];
    if (!G.board[y].row[x].letter) G.board[y].row[x].replacement = replacement;
  });

  LogWords({ ctx, actions }, newWords(G.board, G.pendingTiles), true);

  events.endTurn();
}

export const Approve: CustomMoveFn = ({ G, ctx, actions, events, playerID }, decision) => {
  // If anyone disagrees - word is marked invalid
  if (decision === false) {
    LogWords({ ctx, actions }, newWords(G.board, G.pendingTiles), false);
    events.endTurn();
  } else {
    if (G.approvals.includes(playerID)) return INVALID_MOVE; // can't approve twice

    G.approvals.push(playerID);
    // If everyone agrees - word is played
    if (G.approvals.length === ctx.numPlayers - 1) {
      FinalizePlayTiles({ G, ctx, actions, events });
    }
  }
};

export const SwapTiles: CustomMoveFn = ({ G, ctx, events, random }, tiles) => {
  // Not enough tiles left to make a swap
  if (G.secret.tiles.length < 7) return INVALID_MOVE;

  tiles = prepareTiles(tiles, G.players[ctx.currentPlayer].tiles);

  // Some tiles don't belong to player (illegal move)
  if (!tiles) return INVALID_MOVE;

  const newTiles: Tile[] = [];
  tiles.forEach(({ id }) => {
    remove(G.players[ctx.currentPlayer].tiles, (tile: Tile) => tile.id === id);
    newTiles.push(G.secret.tiles.shift());
  });
  G.skipCount = 0;
  G.secret.tiles.push(...tiles);
  G.secret.tiles = random.Shuffle(G.secret.tiles);
  G.players[ctx.currentPlayer].tiles.push(...newTiles);
  events.endTurn();
};

export function SkipTurn({ G, ctx, events }) {
  G.skipCount += 1;
  if (G.skipCount >= ctx.numPlayers * 2) {
    events.endGame({ winners: indexOfMax(G.points) });
  } else {
    events.endTurn();
  }
}

export function DistributeTilesToPlayers({ G, ctx, events }) {
  for (let i = 0; i < ctx.numPlayers; i++) {
    while (G.secret.tiles.length > 0 && G.players[i].tiles.length < 7) {
      G.players[i].tiles.push(G.secret.tiles.shift());
    }
    G.players[i].tilesCount = G.players[i].tiles.length;
    if (G.players[i].tiles.length === 0) events.endGame({ winners: indexOfMax(G.points) });
  }
  G.tilesLeft = G.secret.tiles.length;
}

export const Scrambled: CustomGame = {
  name: "Scrambled",
  image: "/images/games/scrambled/icon.png",
  minPlayers: 2,
  maxPlayers: 4,

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
            },
          },
          wait: {
            moves: {},
          },
        },
      },
    },
    play: {
      onBegin: (gctx) => {
        DistributeTilesToPlayers(gctx);
      },
      turn: {
        onBegin: ({ events }) => {
          events.setActivePlayers({ currentPlayer: "play", others: "wait" });
        },
        onEnd: (gctx) => {
          DistributeTilesToPlayers(gctx);
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
  playerView: ({ G, playerID }) => {
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
