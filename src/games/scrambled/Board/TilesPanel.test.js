import React from "react";
import renderer from "react-test-renderer";
import TilesPanel from "./TilesPanel";

describe("scrambled TilesPanel component", () => {
  it("renders correctly", () => {
    expect.hasAssertions();
    const component = renderer.create(
      <TilesPanel
        t={jest.fn((x) => x)}
        playerTiles={[{ letter: "A", points: 1, id: 1 }]}
        selectTile={jest.fn()}
        onReturnTiles={jest.fn()}
        onSwapTiles={jest.fn()}
        onSkipTurn={jest.fn()}
        onPlayTiles={jest.fn()}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
