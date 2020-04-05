import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number, object } from "@storybook/addon-knobs";

import Player from "./Player";

export default {
  component: Player,
  title: "Kalambury/Sidebar/Player",
  excludeStories: /.*Data$/,
};

export const Empty = () => <Player empty={true} />;

export const Default = () => (
  <Player
    uid={"user-1"}
    isActive={boolean("Active", true)}
    points={number("Points", 12)}
    actions={object("Actions array", [
      { action: "guess", id: "123", phrase: "Baba z wozu?" },
      { action: "manage", id: "456" },
    ])}
    isWinning={boolean("Is player winning?", true)}
    isCurrentPlayer={boolean("Are you this player?", true)}
    handleGuessClick={action("handleGuessClick")}
    profile={{
      displayName: text("Name", "Mieczysław Czosnek"),
      photoURL: text("Avatar URL", "https://api.adorable.io/avatars/128/Mieczysław-Czosnek.png"),
    }}
  />
);
