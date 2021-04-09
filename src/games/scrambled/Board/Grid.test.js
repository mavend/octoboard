import React from "react";
import renderer from "react-test-renderer";
import Grid from "./Grid";

describe("scrambled Grid component", () => {
  it("renders correctly when empty", () => {
    expect.hasAssertions();
    const component = renderer.create(
      <Grid
        board={[{ row: [0, 0, 0] }, { row: [0, 0, 0] }, { row: [0, 0, 0] }]}
        playerTiles={[]}
        clickable={jest.fn()}
        handleFieldClick={jest.fn()}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with some tiles", () => {
    expect.hasAssertions();
    const component = renderer.create(
      <Grid
        board={[
          {
            row: [
              { letter: "A", points: 1 },
              0,
              { bonus: { type: "letter", multiply: 3 }, start: true },
            ],
          },
          { row: [{ bonus: { type: "word", multiply: 2 } }, 0, 0] },
          { row: [0, 0, 0] },
        ]}
        playerTiles={[]}
        clickable={jest.fn()}
        handleFieldClick={jest.fn()}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with temporary tiles", () => {
    expect.hasAssertions();
    const component = renderer.create(
      <Grid
        board={[
          {
            row: [
              { letter: "A", points: 1 },
              0,
              { bonus: { type: "letter", multiply: 3 }, start: true },
            ],
          },
          { row: [{ bonus: { type: "word", multiply: 2 } }, 0, 0] },
          { row: [0, 0, 0] },
        ]}
        playerTiles={[
          { letter: "B", points: 3, x: 1, y: 0 },
          { letter: null, points: 0, replacement: "C", x: 2, y: 0 },
        ]}
        clickable={jest.fn()}
        handleFieldClick={jest.fn()}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with preview tiles", () => {
    expect.hasAssertions();
    const component = renderer.create(
      <Grid
        board={[
          {
            row: [
              { letter: "A", points: 1 },
              0,
              { bonus: { type: "letter", multiply: 3 }, start: true },
            ],
          },
          { row: [{ bonus: { type: "word", multiply: 2 } }, 0, 0] },
          { row: [0, 0, 0] },
        ]}
        playerTiles={[
          { x: 1, y: 0, preview: true },
          { x: 2, y: 0, preview: true },
        ]}
        clickable={jest.fn()}
        handleFieldClick={jest.fn()}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
