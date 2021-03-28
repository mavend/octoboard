import React from "react";
import renderer from "react-test-renderer";
import GameBoard from "./GameBoard";
import BoardGameContextMock from "../GameContextMock";
import { MemoryRouter } from "react-router";

describe("scrambled GameBoard component", () => {
  it("renders correctly", () => {
    expect.hasAssertions();
    let component;
    renderer.act(() => {
      component = renderer.create(
        <MemoryRouter>
          <BoardGameContextMock>
            <GameBoard />
          </BoardGameContextMock>
        </MemoryRouter>
      );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
