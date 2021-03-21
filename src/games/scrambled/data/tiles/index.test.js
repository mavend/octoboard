import { getTiles } from "./index";

describe("scrambled getTiles", () => {
  describe("for english language", () => {
    it("returns 100 tiles", () => {
      expect.hasAssertions();
      const tiles = getTiles("en");
      expect(tiles).toHaveLength(100);
    });
    it("returns 2 blanks", () => {
      expect.hasAssertions();
      const tiles = getTiles("en");
      expect(tiles.filter(({ letter }) => letter === null)).toHaveLength(2);
    });
    it("returns tiles with valid number of points", () => {
      expect.hasAssertions();
      const tiles = getTiles("en");
      expect(tiles.reduce((acc, { points }) => acc + points, 0)).toStrictEqual(187);
    });
  });

  describe("for polish language", () => {
    it("returns 100 tiles", () => {
      expect.hasAssertions();
      const tiles = getTiles("pl");
      expect(tiles).toHaveLength(100);
    });
    it("returns 2 blanks", () => {
      expect.hasAssertions();
      const tiles = getTiles("pl");
      expect(tiles.filter(({ letter }) => letter === null)).toHaveLength(2);
    });
    it("returns tiles with valid number of points", () => {
      expect.hasAssertions();
      const tiles = getTiles("pl");
      expect(tiles.reduce((acc, { points }) => acc + points, 0)).toStrictEqual(190);
    });
  });
});
