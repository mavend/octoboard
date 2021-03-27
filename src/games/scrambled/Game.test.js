import {
  Scrambled,
  PlayTiles,
  DistributeTilesToPlayers,
  SwapTiles,
  SkipTurn,
  Approve,
  StartGame,
} from "./Game";
import { INVALID_MOVE } from "boardgame.io/core";
import { getTiles } from "./data/tiles";
import { Client } from "boardgame.io/client";

const tiles = {
  A: { letter: "A", points: 1, id: 0 },
  B: { letter: "B", points: 2, id: 1 },
  C: { letter: "C", points: 2, id: 2 },
  D: { letter: "D", points: 4, id: 3 },
  E: { letter: "E", points: 0, id: 4 },
  W: { letter: "W", points: 10, id: 5 },
  X: { letter: "X", points: 10, id: 6 },
  Y: { letter: "Y", points: 10, id: 7 },
  Z: { letter: "Z", points: 10, id: 8 },
  BLANK: { letter: null, points: 0, id: 9 },
  INIT: { letter: "X", points: 0, id: 100 },
  START: { start: true },
  WORD2: { bonus: { type: "word", multiply: 2 } },
  LETTER3: { bonus: { type: "letter", multiply: 3 } },
};
const DEFAULT_BOARD = () => {
  return [{ row: [tiles.INIT, 0, 0] }, { row: [0, 0, 0] }, { row: [0, 0, 0] }];
};
const EMPTY_BOARD = () => {
  return [{ row: [tiles.START, 0, 0] }, { row: [0, 0, 0] }, { row: [0, 0, 0] }];
};
const DEFAULT_TILES_SET = () => {
  return [tiles.A, tiles.B, tiles.C, tiles.D, tiles.E, tiles.BLANK];
};
const VALID_FIRST_MOVE = () => [
  { x: 0, y: 1, ...tiles.B },
  { x: 1, y: 1, ...tiles.A },
  { x: 2, y: 1, ...tiles.D },
];

function setupG(opts) {
  return {
    board: DEFAULT_BOARD(),
    points: [0],
    pendingTiles: [],
    approvals: [],
    players: {
      0: {
        tiles: DEFAULT_TILES_SET(),
      },
      1: {},
      2: {},
    },
    secret: {
      tiles: [tiles.W, tiles.X, tiles.Y, tiles.Z],
    },
    initialWordPlayed: true,
    skipCount: 0,
    actions: [],
    ...opts,
  };
}

describe("scrambled game setup", () => {
  it("should prepare game state and start wait phase", () => {
    expect.hasAssertions();

    const client = Client({
      game: Scrambled,
      numPlayers: 3,
    });

    const { G, ctx } = client.store.getState();

    // Default board is 15x15
    expect(G.board).toHaveLength(15);
    expect(G.initialWordPlayed).toStrictEqual(false);
    expect(G.secret.tiles).toHaveLength(0);
    expect(G.players[0].tiles).toHaveLength(0);
    expect(ctx.activePlayers).toStrictEqual({ 0: "manage", 1: "wait", 2: "wait" });
  });

  it("should distribute tiles once game starts", () => {
    expect.hasAssertions();

    const client = Client({
      game: Scrambled,
      numPlayers: 3,
    });

    client.moves.StartGame("pl");

    const { G, ctx } = client.store.getState();

    expect(G.secret.tiles).toHaveLength(100 - 3 * 7);
    expect(G.players[0].tiles).toHaveLength(7);
    expect(ctx.activePlayers).toStrictEqual({ 0: "play", 1: "wait", 2: "wait" });
  });
});

describe("scrambled StartGame", () => {
  it("should store game language", () => {
    expect.hasAssertions();
    const G = setupG();

    expect(G.language).toBeUndefined();

    StartGame(G, { random: { Shuffle: jest.fn() }, events: { setPhase: jest.fn() } }, "en");

    expect(G.language).toStrictEqual("en");
  });

  it("should shuffle tiles matching language", () => {
    expect.hasAssertions();
    const G = setupG({ secret: { tiles: [] } });
    const shuffle = jest.fn((x) => x);

    expect(G.secret.tiles).toHaveLength(0);

    StartGame(G, { random: { Shuffle: shuffle }, events: { setPhase: jest.fn() } }, "pl");

    const expectedTiles = getTiles("pl");
    expect(shuffle).toHaveBeenCalledWith(expectedTiles);
    expect(G.secret.tiles).toStrictEqual(expectedTiles);
  });

  it("should set game phase to play", () => {
    expect.hasAssertions();
    const G = setupG();
    const setPhaseEvent = jest.fn();

    StartGame(G, { random: { Shuffle: jest.fn() }, events: { setPhase: setPhaseEvent } }, "en");

    expect(setPhaseEvent).toHaveBeenCalledWith("play");
  });
});

describe("scrambled PlayTiles", () => {
  it("should add played tiles to the pending tiles", () => {
    expect.hasAssertions();
    const G = setupG();

    const playedTiles = [
      { x: 0, y: 1, ...tiles.B },
      { x: 1, y: 1, ...tiles.A },
      { x: 2, y: 1, ...tiles.D },
    ];

    PlayTiles(G, { currentPlayer: "0", events: { setActivePlayers: jest.fn() } }, playedTiles);

    expect(G.pendingTiles).toStrictEqual(playedTiles);
  });

  it("shouldn't distribute new tiles", () => {
    expect.hasAssertions();
    const G = setupG();

    const playedTiles = [
      { x: 0, y: 1, ...tiles.B },
      { x: 1, y: 1, ...tiles.A },
      { x: 2, y: 1, ...tiles.D },
    ];

    PlayTiles(G, { currentPlayer: "0", events: { setActivePlayers: jest.fn() } }, playedTiles);

    expect(G.players[0].tiles).toStrictEqual(DEFAULT_TILES_SET());
    expect(G.secret.tiles).toStrictEqual([tiles.W, tiles.X, tiles.Y, tiles.Z]);
  });

  it("should reset approvals list", () => {
    expect.hasAssertions();
    const G = setupG({
      approvals: [1, 2, 3],
    });

    const playedTiles = [
      { x: 0, y: 1, ...tiles.B },
      { x: 1, y: 1, ...tiles.A },
      { x: 2, y: 1, ...tiles.D },
    ];

    PlayTiles(G, { currentPlayer: "0", events: { setActivePlayers: jest.fn() } }, playedTiles);

    expect(G.approvals).toStrictEqual([]);
  });

  it("only allows initial word if it passes through start field and is longer than 1 letter", () => {
    expect.hasAssertions();
    const G = setupG({
      board: EMPTY_BOARD(),
      initialWordPlayed: false,
    });

    // First word not placed on start field
    let result = PlayTiles(G, { currentPlayer: "0" }, [
      { x: 2, y: 2, ...tiles.A },
      { x: 1, y: 2, ...tiles.B },
    ]);

    expect(G.pendingTiles).toStrictEqual([]);
    expect(result).toStrictEqual(INVALID_MOVE);

    // First word placed on start field but too short
    result = PlayTiles(G, { currentPlayer: "0" }, [{ x: 0, y: 0, ...tiles.A }]);

    expect(G.pendingTiles).toStrictEqual([]);
    expect(result).toStrictEqual(INVALID_MOVE);

    // First valid word placed on start field
    const validPlay = [
      { x: 0, y: 0, ...tiles.A },
      { x: 1, y: 0, ...tiles.B },
    ];
    PlayTiles(G, { currentPlayer: "0", events: { setActivePlayers: jest.fn() } }, validPlay);

    expect(G.pendingTiles).toStrictEqual(validPlay);
  });

  it("shouldn't allow a blank with no replacement specified", () => {
    expect.hasAssertions();
    const G = setupG();

    // Tiles not placed in a single row or column
    const playedTiles = [{ x: 1, y: 0, ...tiles.BLANK }];

    const result = PlayTiles(G, { currentPlayer: "0" }, playedTiles);

    expect(G.pendingTiles).toStrictEqual([]);
    expect(result).toStrictEqual(INVALID_MOVE);
  });

  it("allows a blank with a replacement specified", () => {
    expect.hasAssertions();
    const G = setupG();

    // Tiles not placed in a single row or column
    const playedTiles = [{ x: 1, y: 0, replacement: "L", ...tiles.BLANK }];

    PlayTiles(G, { currentPlayer: "0", events: { setActivePlayers: jest.fn() } }, playedTiles);

    expect(G.pendingTiles).toStrictEqual(playedTiles);
  });

  it("shouldn't allow playing tiles not in a single row/column", () => {
    expect.hasAssertions();
    const G = setupG();

    // Tiles not placed in a single row or column
    const playedTiles = [
      { x: 1, y: 1, ...tiles.A },
      { x: 0, y: 1, ...tiles.B },
      { x: 0, y: 2, ...tiles.D },
    ];

    const result = PlayTiles(G, { currentPlayer: "0" }, playedTiles);

    expect(G.pendingTiles).toStrictEqual([]);
    expect(result).toStrictEqual(INVALID_MOVE);
  });

  it("shouldn't allow replacing existing tiles", () => {
    expect.hasAssertions();
    const G = setupG();

    // Tiles not placed in a single row or column
    const playedTiles = [{ x: 0, y: 0, ...tiles.A }];

    const result = PlayTiles(G, { currentPlayer: "0" }, playedTiles);

    expect(G.pendingTiles).toStrictEqual([]);
    expect(result).toStrictEqual(INVALID_MOVE);
  });

  it("allows playing initial word not connected to other tiles", () => {
    expect.hasAssertions();
    const G = setupG({
      board: [{ row: [0, 0, 0] }, { row: [0, tiles.START, 0] }, { row: [0, 0, 0] }],
      initialWordPlayed: false,
    });

    const playedTiles = [
      { x: 1, y: 1, ...tiles.A },
      { x: 2, y: 1, ...tiles.B },
    ];

    PlayTiles(G, { currentPlayer: "0", events: { setActivePlayers: jest.fn() } }, playedTiles);

    expect(G.pendingTiles).toStrictEqual(playedTiles);
  });

  it("shouldn't allow playing tiles not connected to other tiles", () => {
    expect.hasAssertions();
    const G = setupG();

    const playedTiles = [
      { x: 2, y: 2, ...tiles.A },
      { x: 1, y: 2, ...tiles.B },
    ];

    const result = PlayTiles(G, { currentPlayer: "0" }, playedTiles);

    expect(G.pendingTiles).toStrictEqual([]);
    expect(result).toStrictEqual(INVALID_MOVE);
  });

  it("should allow playing tiles connected to blanks", () => {
    expect.hasAssertions();
    const playedBlank = { ...tiles.BLANK, replacement: "X" };
    const G = setupG({
      board: [
        { row: [playedBlank, 0, 0] },
        {
          row: [0, 0, 0],
        },
        { row: [0, 0, 0] },
      ],
    });

    const playedTiles = [
      { x: 1, y: 0, ...tiles.A },
      { x: 1, y: 1, ...tiles.B },
    ];

    PlayTiles(G, { currentPlayer: "0", events: { setActivePlayers: jest.fn() } }, playedTiles);

    expect(G.pendingTiles).toStrictEqual(playedTiles);
  });

  it("shouldn't allow playing words conencted to other tiles but with gaps inside", () => {
    expect.hasAssertions();
    const G = setupG();

    let result = PlayTiles(G, { currentPlayer: "0" }, [
      { x: 1, y: 0, ...tiles.A },
      { x: 1, y: 2, ...tiles.B },
    ]);

    expect(G.pendingTiles).toStrictEqual([]);
    expect(result).toStrictEqual(INVALID_MOVE);

    result = PlayTiles(G, { currentPlayer: "0" }, [
      { x: 0, y: 1, ...tiles.A },
      { x: 2, y: 1, ...tiles.B },
    ]);

    expect(G.pendingTiles).toStrictEqual([]);
    expect(result).toStrictEqual(INVALID_MOVE);
  });

  it("shouldn't allow cheating by playing not owned tiles", () => {
    expect.hasAssertions();
    const G = setupG();

    // One of the tiles is not owned by the player
    const playedTiles = [
      { x: 1, y: 1, ...tiles.A },
      { x: 0, y: 1, ...tiles.B },
      { x: 2, y: 1, ...tiles.W },
    ];

    const result = PlayTiles(G, { currentPlayer: "0" }, playedTiles);

    expect(G.pendingTiles).toStrictEqual([]);
    expect(result).toStrictEqual(INVALID_MOVE);
  });

  it("should call setActivePlayers event", () => {
    expect.hasAssertions();
    const G = setupG();

    const playedTiles = [
      { x: 0, y: 1, ...tiles.B },
      { x: 1, y: 1, ...tiles.A },
      { x: 2, y: 1, ...tiles.D },
    ];
    const setActivePlayersEvent = jest.fn();

    PlayTiles(
      G,
      { currentPlayer: "0", events: { setActivePlayers: setActivePlayersEvent } },
      playedTiles
    );

    expect(G.pendingTiles).toStrictEqual(playedTiles);
    expect(setActivePlayersEvent).toHaveBeenCalledWith({
      currentPlayer: "wait_for_approval",
      others: "approve",
    });
  });

  it("should reset skips counter", () => {
    expect.hasAssertions();
    const G = setupG({
      skipCount: 3,
    });
    const playedTiles = [{ x: 0, y: 1, ...tiles.B }];

    PlayTiles(G, { currentPlayer: "0", events: { setActivePlayers: jest.fn() } }, playedTiles);

    expect(G.skipCount).toStrictEqual(0);
  });
});

describe("scrambled Approve", () => {
  describe("after first disapproval", () => {
    it("should call endTurn", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE() });

      const endTurnEvent = jest.fn();
      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: endTurnEvent } },
        false
      );

      expect(endTurnEvent).toHaveBeenCalledWith();
    });

    it("shouldn't modify board", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE() });

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        false
      );

      expect(G.board).toStrictEqual(DEFAULT_BOARD());
    });

    it("shouldn't increase player score", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE() });

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        false
      );

      expect(G.points[0]).toStrictEqual(0);
    });
  });

  describe("after single approval", () => {
    it("should save playerID in approvals list", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE() });

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.approvals).toStrictEqual([1]);
    });

    it("shouldn't modify board", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE() });

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.board).toStrictEqual(DEFAULT_BOARD());
    });

    it("shouldn't allow approving again", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE(), approvals: [1] });

      const result = Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.approvals).toStrictEqual([1]);
      expect(result).toStrictEqual(INVALID_MOVE);
    });

    it("still allows disapproving", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE(), approvals: [1] });

      const endTurnEvent = jest.fn();
      const result = Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: endTurnEvent } },
        false
      );

      expect(endTurnEvent).toHaveBeenCalledWith();
      expect(result).not.toStrictEqual(INVALID_MOVE);
    });

    it("shouldn't increase player score", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE(), approvals: [1] });

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.points[0]).toStrictEqual(0);
    });
  });

  describe("after last approval", () => {
    it("should add tiles to the board", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE(), approvals: [2] });

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.board).toStrictEqual([
        { row: [tiles.INIT, 0, 0] },
        { row: [tiles.B, tiles.A, tiles.D] },
        { row: [0, 0, 0] },
      ]);
    });

    it("shouldn't distribute new tiles", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE(), approvals: [2] });

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.players[0].tiles).toStrictEqual([tiles.C, tiles.E, tiles.BLANK]);
      expect(G.secret.tiles).toStrictEqual([tiles.W, tiles.X, tiles.Y, tiles.Z]);
    });

    it("should apply replacement to all played blanks", () => {
      expect.hasAssertions();
      const G = setupG({
        pendingTiles: [
          { x: 0, y: 1, replacement: "X", ...tiles.BLANK },
          { x: 1, y: 1, ...tiles.A },
          { x: 2, y: 1, ...tiles.D },
        ],
        approvals: [2],
        initialWordPlayed: false,
      });

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.board).toStrictEqual([
        { row: [tiles.INIT, 0, 0] },
        { row: [tiles.BLANK, tiles.A, tiles.D] },
        { row: [0, 0, 0] },
      ]);
      expect(G.board[1].row[0].letter).toBeNull();
      expect(G.board[1].row[0].replacement).toStrictEqual("X");
    });

    it("should set intialWordPlayed flag", () => {
      expect.hasAssertions();
      const G = setupG({
        pendingTiles: VALID_FIRST_MOVE(),
        approvals: [2],
        initialWordPlayed: false,
      });

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.initialWordPlayed).toStrictEqual(true);
    });

    it("should increase player score", () => {
      expect.hasAssertions();
      const G = setupG({
        board: [
          { row: [tiles.START, tiles.LETTER3, 0] },
          {
            row: [0, 0, tiles.WORD2],
          },
          { row: [0, 0, 0] },
        ],
        initialWordPlayed: false,
      });

      let playerScore = 0;
      expect(G.points[0]).toStrictEqual(playerScore);

      // Starting word (no bonus in this setup)
      G.approvals = [2];
      G.pendingTiles = [
        { x: 0, y: 1, ...tiles.A },
        { x: 0, y: 0, ...tiles.E },
      ];
      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.points[0]).toStrictEqual(tiles.E.points + tiles.A.points);
      playerScore = G.points[0];

      // Letter bonus + existing tiles points
      G.approvals = [2];
      G.pendingTiles = [{ x: 1, y: 0, ...tiles.B }];
      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.points[0]).toStrictEqual(
        playerScore + (tiles.B.points * tiles.LETTER3.bonus.multiply + tiles.E.points)
      );
      playerScore = G.points[0];

      // Word bonus + existing tiles points (bonus not counted again)
      G.approvals = [2];
      G.pendingTiles = [
        { x: 1, y: 1, ...tiles.C },
        { x: 2, y: 1, ...tiles.D },
      ];

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.points[0]).toStrictEqual(
        playerScore +
          (tiles.A.points + tiles.C.points + tiles.D.points) * tiles.WORD2.bonus.multiply +
          (tiles.B.points + tiles.C.points)
      );
    });

    it("should give 50 bonus points when all 7 tiles got placed", () => {
      expect.hasAssertions();
      const G = setupG({
        board: [{ row: [tiles.START, tiles.LETTER3, tiles.WORD2, 0, 0, 0, 0] }],
        players: {
          0: {
            tiles: [tiles.A, tiles.B, tiles.C, tiles.D, tiles.E, tiles.W, tiles.X],
          },
        },
        initialWordPlayed: false,
      });

      expect(G.points[0]).toStrictEqual(0);

      G.approvals = [2];
      G.pendingTiles = [
        { x: 0, y: 0, ...tiles.A },
        { x: 1, y: 0, ...tiles.B },
        { x: 2, y: 0, ...tiles.C },
        { x: 3, y: 0, ...tiles.D },
        { x: 4, y: 0, ...tiles.E },
        { x: 5, y: 0, ...tiles.W },
        { x: 6, y: 0, ...tiles.X },
      ];
      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: jest.fn() } },
        true
      );

      expect(G.points[0]).toStrictEqual(
        (tiles.A.points +
          tiles.B.points * tiles.LETTER3.bonus.multiply +
          tiles.C.points +
          tiles.D.points +
          tiles.E.points +
          tiles.W.points +
          tiles.X.points) *
          tiles.WORD2.bonus.multiply +
          50
      );
    });

    it("should call endTurn event", () => {
      expect.hasAssertions();
      const G = setupG({ pendingTiles: VALID_FIRST_MOVE(), approvals: [2] });

      const endTurnEvent = jest.fn();

      Approve(
        G,
        { currentPlayer: "0", playerID: 1, numPlayers: 3, events: { endTurn: endTurnEvent } },
        true
      );

      expect(G.board).toStrictEqual([
        { row: [tiles.INIT, 0, 0] },
        { row: [tiles.B, tiles.A, tiles.D] },
        { row: [0, 0, 0] },
      ]);
      expect(endTurnEvent).toHaveBeenCalledWith();
    });
  });
});

describe("scrambled SwapTiles", () => {
  it("shouldn't allow swapping tiles if there are less than 7 tiles left", () => {
    expect.hasAssertions();
    const G = setupG();

    expect(G.secret.tiles.length).toBeLessThan(7);

    const result = SwapTiles(
      G,
      {
        currentPlayer: "0",
        events: { endTurn: jest.fn() },
        random: { Shuffle: jest.fn((arg) => arg) },
      },
      [tiles.A, tiles.B]
    );

    expect(G.players["0"].tiles).toStrictEqual(DEFAULT_TILES_SET());
    expect(result).toStrictEqual(INVALID_MOVE);
  });

  it("allows swapping tiles if there are more than 7 tiles left", () => {
    expect.hasAssertions();
    const G = setupG({
      players: {
        0: {
          tiles: [tiles.A, tiles.B],
        },
      },
      secret: {
        tiles: [tiles.C, tiles.D, tiles.E, tiles.W, tiles.X, tiles.Y, tiles.Z, tiles.BLANK],
      },
    });

    expect(G.secret.tiles.length).toBeGreaterThan(7);

    SwapTiles(
      G,
      {
        currentPlayer: "0",
        events: { endTurn: jest.fn() },
        random: { Shuffle: jest.fn((arg) => arg) },
      },
      [tiles.A]
    );

    expect(G.players["0"].tiles).not.toStrictEqual(expect.arrayContaining([tiles.A]));
    expect(G.players["0"].tiles).toStrictEqual(expect.arrayContaining([tiles.B]));
    expect(G.secret.tiles).toStrictEqual(expect.arrayContaining([tiles.A]));
  });

  it("allows swapping tiles if there are exactly 7 tiles left", () => {
    expect.hasAssertions();
    const G = setupG({
      players: {
        0: {
          tiles: [tiles.A, tiles.B, tiles.C],
        },
      },
      secret: {
        tiles: [tiles.D, tiles.E, tiles.W, tiles.X, tiles.Y, tiles.Z, tiles.BLANK],
      },
    });

    expect(G.secret.tiles).toHaveLength(7);

    SwapTiles(
      G,
      {
        currentPlayer: "0",
        events: { endTurn: jest.fn() },
        random: { Shuffle: jest.fn((arg) => arg) },
      },
      [tiles.A]
    );

    expect(G.players["0"].tiles).not.toStrictEqual(expect.arrayContaining([tiles.A]));
    expect(G.players["0"].tiles).toStrictEqual(expect.arrayContaining([tiles.B, tiles.C]));
    expect(G.secret.tiles).toStrictEqual(expect.arrayContaining([tiles.A]));
  });

  it("shouldn't allow cheating by swapping not owned tiles", () => {
    expect.hasAssertions();
    const G = setupG({
      players: {
        0: {
          tiles: [tiles.A, tiles.B],
        },
      },
      secret: {
        tiles: [tiles.C, tiles.D, tiles.E, tiles.W, tiles.X, tiles.Y, tiles.Z, tiles.BLANK],
      },
    });

    expect(G.secret.tiles.length).toBeGreaterThan(7);

    // One of the tiles is not owned by the player
    const result = SwapTiles(
      G,
      {
        currentPlayer: "0",
        events: { endTurn: jest.fn() },
        random: { Shuffle: jest.fn((arg) => arg) },
      },
      [tiles.A, tiles.B, tiles.C]
    );

    expect(G.players["0"].tiles).toStrictEqual([tiles.A, tiles.B]);
    expect(result).toStrictEqual(INVALID_MOVE);
  });

  it("should call endTurn event", () => {
    expect.hasAssertions();
    const G = setupG({
      players: {
        0: {
          tiles: [tiles.A, tiles.B],
        },
      },
      secret: {
        tiles: [tiles.C, tiles.D, tiles.E, tiles.W, tiles.X, tiles.Y, tiles.Z, tiles.BLANK],
      },
    });
    const endTurnEvent = jest.fn();

    expect(G.secret.tiles.length).toBeGreaterThan(7);

    SwapTiles(
      G,
      {
        currentPlayer: "0",
        events: { endTurn: endTurnEvent },
        random: { Shuffle: jest.fn((arg) => arg) },
      },
      [tiles.A]
    );

    expect(endTurnEvent).toHaveBeenCalledWith();
  });

  it("should reset skips counter", () => {
    expect.hasAssertions();
    const G = setupG({
      players: {
        0: {
          tiles: [tiles.A, tiles.B],
        },
      },
      secret: {
        tiles: [tiles.C, tiles.D, tiles.E, tiles.W, tiles.X, tiles.Y, tiles.Z, tiles.BLANK],
      },
      skipCount: 3,
    });

    SwapTiles(
      G,
      {
        currentPlayer: "0",
        events: { endTurn: jest.fn() },
        random: { Shuffle: jest.fn((arg) => arg) },
      },
      [tiles.A]
    );

    expect(G.skipCount).toStrictEqual(0);
  });

  it("should shuffle secret tiles with returned tiles", () => {
    expect.hasAssertions();
    const G = setupG({
      players: {
        0: {
          tiles: [tiles.A, tiles.B],
        },
      },
      secret: {
        tiles: [tiles.C, tiles.D, tiles.E, tiles.W, tiles.X, tiles.Y, tiles.Z, tiles.BLANK],
      },
      skipCount: 3,
    });

    const shuffle = jest.fn((arg) => arg);

    SwapTiles(
      G,
      { currentPlayer: "0", events: { endTurn: jest.fn() }, random: { Shuffle: shuffle } },
      [tiles.A]
    );

    expect(shuffle).toHaveBeenCalledWith([
      tiles.D,
      tiles.E,
      tiles.W,
      tiles.X,
      tiles.Y,
      tiles.Z,
      tiles.BLANK,
      tiles.A,
    ]);
  });
});

describe("scrambled SkipTurn", () => {
  it("should call endTurn event without placing any tiles", () => {
    expect.hasAssertions();
    const G = setupG();
    const endTurnEvent = jest.fn();

    SkipTurn(G, { currentPlayer: "0", events: { endTurn: endTurnEvent } });

    expect(endTurnEvent).toHaveBeenCalledWith();
    expect(G.board).toStrictEqual(DEFAULT_BOARD());
  });

  it("should increase number of skips counter", () => {
    expect.hasAssertions();
    const G = setupG();

    expect(G.skipCount).toStrictEqual(0);

    SkipTurn(G, { currentPlayer: "0", events: { endTurn: jest.fn() } });

    expect(G.skipCount).toStrictEqual(1);
  });

  it("should end game when everybody skips twice in a row", () => {
    expect.hasAssertions();
    const G = setupG({
      skipCount: 1,
    });

    const endGameEvent = jest.fn();

    SkipTurn(G, { currentPlayer: "0", numPlayers: 1, events: { endGame: endGameEvent } });

    expect(endGameEvent).toHaveBeenCalledWith({ winners: [0] });
  });
});

describe("scrambled DistributeTilesToPlayers", () => {
  it("should distribute tiles to players who don't have enough", () => {
    expect.hasAssertions();
    const G = setupG();

    DistributeTilesToPlayers(G, { currentPlayer: "0", numPlayers: 1 });

    expect(G.players[0].tiles).toStrictEqual([
      tiles.A,
      tiles.B,
      tiles.C,
      tiles.D,
      tiles.E,
      tiles.BLANK,
      tiles.W,
    ]);
    expect(G.secret.tiles).toStrictEqual([tiles.X, tiles.Y, tiles.Z]);
  });

  describe("when tiles run out", () => {
    it("should let player have less than 7 tiles", () => {
      expect.hasAssertions();
      const G = setupG({
        players: {
          0: {
            tiles: [],
          },
        },
      });

      DistributeTilesToPlayers(G, { currentPlayer: "0", numPlayers: 1 });

      expect(G.players[0].tiles).toStrictEqual([tiles.W, tiles.X, tiles.Y, tiles.Z]);
      expect(G.secret.tiles).toHaveLength(0);
    });

    it("should end game when one of the players ends up with 0 tiles", () => {
      expect.hasAssertions();
      const G = setupG({
        players: {
          0: {
            tiles: [],
          },
        },
        secret: {
          tiles: [],
        },
      });

      const endGameEvent = jest.fn();
      DistributeTilesToPlayers(G, {
        currentPlayer: "0",
        numPlayers: 1,
        events: { endGame: endGameEvent },
      });

      expect(G.players[0].tiles).toHaveLength(0);
      expect(G.secret.tiles).toHaveLength(0);
      expect(endGameEvent).toHaveBeenCalledWith({ winners: [0] });
    });
  });
});
