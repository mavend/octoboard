import React from "react";
import { action } from "@storybook/addon-actions";
import { text, boolean, number, object } from "@storybook/addon-knobs";

import Player from "./Player";

export default {
  component: Player,
  title: "Sidebar/Player",
  excludeStories: /.*Data$/,
};

export const Empty = () => <Player />;

export const Default = () => (
  <Player
    player={{
      uid: "user-1",
      isConnected: boolean("Connected", true),
      points: number("Points", 12),
      actions: object("Actions array", [
        { action: "guess", id: "123", phrase: "Baba z wozu?" },
        { action: "manage", id: "456" },
      ]),
      isWinning: boolean("Is player winning?", true),
      isYou: boolean("Are you this player?", true),
      profile: {
        displayName: text("Name", "Mieczysław Czosnek"),
        photoURL: text("Avatar URL", "https://api.adorable.io/avatars/128/Mieczysław-Czosnek.png"),
      },
    }}
    handleActionClick={action("handleActionClick")}
  />
);

export const WithAdditionalContent = () => (
  <Player
    player={{
      uid: "user-1",
      isConnected: boolean("Connected", true),
      points: number("Points", 12),
      actions: object("Actions array", [
        { action: "guess", id: "123", phrase: "Baba z wozu?" },
        { action: "manage", id: "456" },
      ]),
      isWinning: boolean("Is player winning?", true),
      isYou: boolean("Are you this player?", true),
      profile: {
        displayName: text("Name", "Mieczysław Czosnek"),
        photoURL: text("Avatar URL", "https://api.adorable.io/avatars/128/Mieczysław-Czosnek.png"),
      },
    }}
    handleActionClick={action("handleActionClick")}
    additionalContent={({ profile: { displayName } }) => <span>Hello {displayName}!</span>}
  />
);
