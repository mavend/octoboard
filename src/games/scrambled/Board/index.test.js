import React from "react";
import { render, screen } from "utils/test/render";
import Board from "./index";
import { BoardGameContextMock } from "../GameContextMock";

describe("scrambled Board component", () => {
  it("renders correctly", async () => {
    expect.hasAssertions();
    const { container } = render(
      <BoardGameContextMock>
        <Board />
      </BoardGameContextMock>
    );
    expect(await screen.findByText("game.errors.ok")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders waiting board if game not yet started", () => {
    expect.hasAssertions();
    const { container } = render(
      <BoardGameContextMock overrideCtx={{ phase: "wait" }}>
        <Board />
      </BoardGameContextMock>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
