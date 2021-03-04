import React from "react";
import { action } from "@storybook/addon-actions";

import { gameDecorator } from "../GameContextMock";
import WaitingBoard from ".";

export default {
  component: WaitingBoard,
  title: "WaitingBoard",
  excludeStories: /.*Data$/,
  decorators: [gameDecorator],
};

export const Default = () => <WaitingBoard onStartGame={action("onStartGame")} />;

export const WithSettings = () => (
  <WaitingBoard onStartGame={action("onStartGame")}>
    <h1>Some form or whatever</h1>
  </WaitingBoard>
);
