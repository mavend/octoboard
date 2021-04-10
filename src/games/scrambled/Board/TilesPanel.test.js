import React from "react";
import { render } from "utils/test/render";
import TilesPanel from "./TilesPanel";

describe("scrambled TilesPanel component", () => {
  it("renders correctly", () => {
    expect.hasAssertions();
    const { container } = render(
      <TilesPanel
        t={jest.fn((x) => x)}
        playerTiles={[{ letter: "A", points: 1, id: 1 }]}
        selectTile={jest.fn()}
        onReturnTiles={jest.fn()}
        onSwapTiles={jest.fn()}
        onSkipTurn={jest.fn()}
        onPlayTiles={jest.fn()}
        tilesLeft={42}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
