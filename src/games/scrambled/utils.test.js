import { canPlaceTile } from "./utils";

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

function setupG(opts) {
  return {
    board: DEFAULT_BOARD(),
    initialWordPlayed: true,
    ...opts,
  };
}

describe("scrambled utils", () => {
  describe("canPlaceTiles", () => {
    describe("when playing first word in a game", () => {
      it("shouldn't allow placing tile in neither row not column of a start tile", () => {
        expect.hasAssertions();
        const G = setupG({
          board: EMPTY_BOARD(),
          initialWordPlayed: false,
        });

        const result = canPlaceTile(G, [], 2, 2);

        expect(result).toBeFalsy();
      });

      it("should allow placing tile in a start row", () => {
        expect.hasAssertions();
        const G = setupG({
          board: EMPTY_BOARD(),
          initialWordPlayed: false,
        });

        const result = canPlaceTile(G, [], 2, 0);

        expect(result).toBeTruthy();
      });

      it("should allow placing tile in a start column", () => {
        expect.hasAssertions();
        const G = setupG({
          board: EMPTY_BOARD(),
          initialWordPlayed: false,
        });

        const result = canPlaceTile(G, [], 0, 2);

        expect(result).toBeTruthy();
      });

      it("should allow placing tile on a start field", () => {
        expect.hasAssertions();
        const G = setupG({
          board: EMPTY_BOARD(),
          initialWordPlayed: false,
        });

        const result = canPlaceTile(G, [], 0, 0);

        expect(result).toBeTruthy();
      });

      // TODO: Only if existing tile is in row
      it("should allow placing a second tile in a start row", () => {
        expect.hasAssertions();
        const G = setupG({
          board: EMPTY_BOARD(),
          initialWordPlayed: false,
        });

        const result = canPlaceTile(G, [{ x: 0, y: 0, ...tiles.A }], 2, 0);

        expect(result).toBeTruthy();
      });

      // TODO: Only if existing tile is in column
      it("should allow placing a second tile in a start column", () => {
        expect.hasAssertions();
        const G = setupG({
          board: EMPTY_BOARD(),
          initialWordPlayed: false,
        });

        const result = canPlaceTile(G, [{ x: 0, y: 0, ...tiles.A }], 0, 2);

        expect(result).toBeTruthy();
      });

      it("should allow placing a second tile on a start field", () => {
        expect.hasAssertions();
        const G = setupG({
          board: EMPTY_BOARD(),
          initialWordPlayed: false,
        });

        const result = canPlaceTile(G, [{ x: 1, y: 0, ...tiles.A }], 0, 0);

        expect(result).toBeTruthy();
      });
    });

    describe("with no temporary tiles", () => {
      it("shouldn't allow placing tile on an existing tile", () => {
        expect.hasAssertions();
        const G = setupG();

        const result = canPlaceTile(G, [], 0, 0);

        expect(result).toBeFalsy();
      });

      it("shouldn't allow placing tile on an existing blank tile", () => {
        expect.hasAssertions();
        const G = setupG({
          board: [
            { row: [{ replacement: "X", ...tiles.BLANK }, 0, 0] },
            { row: [0, 0, 0] },
            { row: [0, 0, 0] },
          ],
        });

        const result = canPlaceTile(G, [], 0, 0);

        expect(result).toBeFalsy();
      });

      it("should allow placing tile on an empty spot", () => {
        expect.hasAssertions();
        const G = setupG();

        const result = canPlaceTile(G, [], 1, 0);

        expect(result).toBeTruthy();
      });
    });

    describe("with one tile already placed", () => {
      it("should allow placing second tile in a same column", () => {
        expect.hasAssertions();
        const G = setupG();

        const result = canPlaceTile(G, [{ x: 1, y: 1, ...tiles.A }], 1, 0);

        expect(result).toBeTruthy();
      });

      it("should allow placing second tile in a same row", () => {
        expect.hasAssertions();
        const G = setupG();

        const result = canPlaceTile(G, [{ x: 1, y: 1, ...tiles.A }], 0, 1);

        expect(result).toBeTruthy();
      });

      it("should allow placing second tile over the existing tile (to replace it)", () => {
        expect.hasAssertions();
        const G = setupG();

        const result = canPlaceTile(G, [{ x: 1, y: 1, ...tiles.A }], 1, 1);

        expect(result).toBeTruthy();
      });

      it("shouldn't allow placing second tile far in neither row nor column", () => {
        expect.hasAssertions();
        const G = setupG();

        const result = canPlaceTile(G, [{ x: 1, y: 1, ...tiles.A }], 2, 2);

        expect(result).toBeFalsy();
      });
    });

    describe("with at least two tiles already placed", () => {
      describe("when tiles placed in a single row", () => {
        it("should allow placing new tile in the same row", () => {
          expect.hasAssertions();
          const G = setupG();

          const result = canPlaceTile(
            G,
            [
              { x: 0, y: 1, ...tiles.A },
              { x: 1, y: 1, ...tiles.B },
            ],
            2,
            1
          );

          expect(result).toBeTruthy();
        });

        it("shouldn't allow placing new tile in a different row", () => {
          expect.hasAssertions();
          const G = setupG();

          const result = canPlaceTile(
            G,
            [
              { x: 0, y: 1, ...tiles.A },
              { x: 1, y: 1, ...tiles.B },
            ],
            2,
            0
          );

          expect(result).toBeFalsy();
        });
      });

      describe("when tiles placed in a single column", () => {
        it("should allow placing new tile in the same column", () => {
          expect.hasAssertions();
          const G = setupG();

          const result = canPlaceTile(
            G,
            [
              { x: 1, y: 0, ...tiles.A },
              { x: 1, y: 1, ...tiles.B },
            ],
            1,
            2
          );

          expect(result).toBeTruthy();
        });

        it("shouldn't allow placing new tile in a different column", () => {
          expect.hasAssertions();
          const G = setupG();

          const result = canPlaceTile(
            G,
            [
              { x: 1, y: 0, ...tiles.A },
              { x: 1, y: 1, ...tiles.B },
            ],
            0,
            2
          );

          expect(result).toBeFalsy();
        });
      });
    });
  });
});
