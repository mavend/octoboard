import React from "react";
import { render, screen } from "utils/test/render";
import GameBoard from "./GameBoard";
import { BoardGameContextMock } from "../GameContextMock";

describe("scrambled GameBoard component", () => {
  it("renders correctly", async () => {
    expect.hasAssertions();
    const { container } = render(
      <BoardGameContextMock>
        <GameBoard />
      </BoardGameContextMock>
    );
    expect(await screen.findByText("game.errors.ok")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
