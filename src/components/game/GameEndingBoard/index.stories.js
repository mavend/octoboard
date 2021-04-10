import React from "react";

import { gameDecorator } from "../GameContextMock";
import GameEndingBoard from ".";

export default {
  component: GameEndingBoard,
  title: "GameEndingBoard",
  excludeStories: /.*Data$/,
  decorators: [gameDecorator],
};

export const Default = () => (
  <GameEndingBoard
    winners={[0, 1]}
    players={[
      { id: 0, uid: "user-0", profile: { displayName: "Player zero" }, points: 10 },
      { id: 1, uid: "user-1", profile: { displayName: "Player one" }, points: 10 },
    ]}
  />
);
