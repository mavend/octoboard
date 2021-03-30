import React from "react";
import renderer from "react-test-renderer";
import BoardGameContextMock from "./GameContextMock";
import WordApprovalIcon from "./WordApprovalIcon";

describe("scrambled WordApprovalIcon component", () => {
  it("renders correctly for valid word", () => {
    expect.hasAssertions();
    let component;
    renderer.act(() => {
      component = renderer.create(
        <BoardGameContextMock>
          <WordApprovalIcon letters={["H", "E", "Y"]} checkedIn={["approval"]} />
        </BoardGameContextMock>
      );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly for invalid word", () => {
    expect.hasAssertions();
    let component;
    renderer.act(() => {
      component = renderer.create(
        <BoardGameContextMock>
          <WordApprovalIcon letters={["Z", "X", "W"]} checkedIn={["approval"]} />
        </BoardGameContextMock>
      );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly for long word", () => {
    expect.hasAssertions();
    let component;
    renderer.act(() => {
      component = renderer.create(
        <BoardGameContextMock>
          <WordApprovalIcon letters={["Z", "X", "W", "A", "B"]} checkedIn={["approval"]} />
        </BoardGameContextMock>
      );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with disabled checks", () => {
    expect.hasAssertions();
    let component;
    renderer.act(() => {
      component = renderer.create(
        <BoardGameContextMock>
          <WordApprovalIcon letters={["Z", "X", "W"]} checkedIn={[]} />
        </BoardGameContextMock>
      );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
