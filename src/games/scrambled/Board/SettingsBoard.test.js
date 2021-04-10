import React from "react";
import { render } from "utils/test/render";
import SettingsBoard from "./SettingsBoard";
import BoardGameContextMock from "../GameContextMock";

describe("scrambled SettingsBoard component", () => {
  it("renders correctly", () => {
    expect.hasAssertions();
    const { container } = render(
      <BoardGameContextMock overrideCtx={{ activePlayers: ["manage"] }}>
        <SettingsBoard
          assists={["assist1", "assist2"]}
          defaultAssist={"assist1"}
          StartGame={jest.fn()}
        />
      </BoardGameContextMock>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
