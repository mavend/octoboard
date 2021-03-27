import React from "react";
import renderer from "react-test-renderer";
import Board from "./index";
import BoardGameContextMock from "../GameContextMock";
import { MemoryRouter } from "react-router";

describe("scrambled Board component", () => {
  it("renders correctly", () => {
    expect.hasAssertions();
    const component = renderer.create(
      <MemoryRouter>
        <BoardGameContextMock>
          <Board />
        </BoardGameContextMock>
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
