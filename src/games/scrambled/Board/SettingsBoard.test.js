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
            languages={[{ key: "en", value: "en", text: "English" }]}
            language={"en"}
            setLanguage={jest.fn()}
            onStartGame={jest.fn()}
          />
        </BoardGameContextMock>
      );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
