import React from "react";
import { text, boolean, number } from "@storybook/addon-knobs";

import Player from "./Player";
import { ActionsList } from "./ActionsList";

export default {
  component: Player,
  title: "Sidebar/Player",
  excludeStories: /.*Data$/,
};

export const Empty = () => <Player />;

const actionsMapper = (act) => {
  switch (act.name) {
    case "guess":
      return {
        actionType: "warning",
        icon: "check circle",
        content: act.data.phrase,
      };
  }
};
export const Default = () => (
  <Player
    player={{
      id: 0,
      uid: "user-1",
      isConnected: boolean("Connected", true),
      points: number("Points", 12),
      isWinning: boolean("Is player winning?", true),
      isYou: boolean("Are you this player?", true),
      profile: {
        displayName: text("Name", "Mieczysław Czosnek"),
      },
    }}
    actionsMapper={actionsMapper}
  />
);

export const WithAdditionalContent = () => (
  <Player
    player={{
      id: 0,
      uid: "user-1",
      isConnected: boolean("Connected", true),
      points: number("Points", 12),
      isWinning: boolean("Is player winning?", true),
      isYou: boolean("Are you this player?", true),
      profile: {
        displayName: text("Name", "Mieczysław Czosnek"),
      },
    }}
    actionsMapper={actionsMapper}
    extraContent={({ profile: { displayName } }) => <span>Hello {displayName}!</span>}
  >
    <ActionsList actions={[{ name: "manage", id: "456" }]} />
  </Player>
);
