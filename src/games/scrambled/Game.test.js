import { PlayTiles, DistributeTilesToPlayers } from "./Game";

function setupG(opts) {
  return {
    board: [{ row: [0, 0, 0] }, { row: [0, 0, 0] }, { row: [0, 0, 0] }],
    points: [0],
    players: {
      0: {
        letters: [
          { letter: "A", points: 1, id: 0 },
          { letter: "B", points: 2, id: 1 },
          { letter: "C", points: 2, id: 2 },
          { letter: "D", points: 4, id: 3 },
        ],
      },
    },
    secret: {
      letters: [
        { letter: "X", points: 9, id: 4 },
        { letter: "Y", points: 5, id: 5 },
        { letter: "Z", points: 6, id: 6 },
        { letter: " ", points: 0, id: 7 },
        { letter: "A", points: 1, id: 8 },
      ],
    },
    ...opts,
  };
}

describe("scrambled PlayTiles", () => {
  it("should add letters to the board and not distribute new tiles", () => {
    expect.hasAssertions();
    const G = setupG();

    const playedTiles = [
      { letter: "A", points: 1, id: 0, x: 1, y: 1 },
      { letter: "B", points: 2, id: 1, x: 0, y: 1 },
      { letter: "C", points: 2, id: 2 },
      { letter: "D", points: 4, id: 3, x: 2, y: 1 },
    ];

    PlayTiles(G, { currentPlayer: "0", events: { endTurn: jest.fn() } }, playedTiles);

    expect(G.board).toStrictEqual([
      { row: [0, 0, 0] },
      {
        row: [
          { id: 1, letter: "B", points: 2 },
          { id: 0, letter: "A", points: 1 },
          { id: 3, letter: "D", points: 4 },
        ],
      },
      { row: [0, 0, 0] },
    ]);
    expect(G.players[0].letters).toStrictEqual([{ letter: "C", points: 2, id: 2 }]);
    expect(G.secret.letters).toStrictEqual([
      { letter: "X", points: 9, id: 4 },
      { letter: "Y", points: 5, id: 5 },
      { letter: "Z", points: 6, id: 6 },
      { letter: " ", points: 0, id: 7 },
      { letter: "A", points: 1, id: 8 },
    ]);
  });
});

describe("scrambled DistributeTilesToPlayers", () => {
  it("should distribute tiles to players who don't have enough", () => {
    expect.hasAssertions();
    const G = setupG();

    DistributeTilesToPlayers(G, { currentPlayer: "0", numPlayers: 1 });

    expect(G.players[0].letters).toStrictEqual([
      { letter: "A", points: 1, id: 0 },
      { letter: "B", points: 2, id: 1 },
      { letter: "C", points: 2, id: 2 },
      { letter: "D", points: 4, id: 3 },
      { letter: "X", points: 9, id: 4 },
      { letter: "Y", points: 5, id: 5 },
      { letter: "Z", points: 6, id: 6 },
    ]);
    expect(G.secret.letters).toStrictEqual([
      { letter: " ", points: 0, id: 7 },
      { letter: "A", points: 1, id: 8 },
    ]);
  });
});
