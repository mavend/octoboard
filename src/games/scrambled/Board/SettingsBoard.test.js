import React from "react";
import renderer from "react-test-renderer";
import SettingsBoard from "./SettingsBoard";
import BoardGameContextMock from "../GameContextMock";

describe("scrambled SettingsBoard component", () => {
  it("renders correctly", () => {
    expect.hasAssertions();
    let component;
    renderer.act(() => {
      component = renderer.create(
        <BoardGameContextMock overrideCtx={{ activePlayers: ["manage"] }}>
          <SettingsBoard
            assists={["assist1", "assist2"]}
            defaultAssist={"assist1"}
            StartGame={jest.fn()}
          />
        </BoardGameContextMock>
      );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
