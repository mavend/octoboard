import React from "react";
import { render } from "utils/test/render";
import { BoardGameContextMock } from "./GameContextMock";
import WordApprovalIcon from "./WordApprovalIcon";

describe("scrambled WordApprovalIcon component", () => {
  it("renders correctly for valid word", () => {
    expect.hasAssertions();
    const { container } = render(
      <BoardGameContextMock>
        <WordApprovalIcon letters={["H", "E", "Y"]} checkedIn={["approval"]} />
      </BoardGameContextMock>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly for invalid word", () => {
    expect.hasAssertions();
    const { container } = render(
      <BoardGameContextMock>
        <WordApprovalIcon letters={["Z", "X", "W"]} checkedIn={["approval"]} />
      </BoardGameContextMock>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly for long word", () => {
    expect.hasAssertions();
    const { container } = render(
      <BoardGameContextMock>
        <WordApprovalIcon letters={["Z", "X", "W", "A", "B"]} checkedIn={["approval"]} />
      </BoardGameContextMock>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with disabled checks", () => {
    expect.hasAssertions();
    const { container } = render(
      <BoardGameContextMock>
        <WordApprovalIcon letters={["Z", "X", "W"]} checkedIn={[]} />
      </BoardGameContextMock>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
