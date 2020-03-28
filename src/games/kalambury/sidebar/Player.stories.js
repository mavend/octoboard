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
    name={text("Name", "Mieczysław Czosnek")}
    isActive={boolean("Active", true)}
    empty={boolean("Empty", false)}
    avatar={text("Avatar URL", "https://api.adorable.io/avatars/128/Mieczysław-Czosnek.png")}
    points={number("Points", 12)}
    actions={object("Actions array", [
      { action: "guess", id: "123", phrase: "Baba z wozu?" },
      { action: "manage", id: "456" },
    ])}
    isWinning={boolean("Is player winning?", true)}
    isCurrentPlayer={boolean("Are you this player?", true)}
    handleGuessClick={action("handleGuessClick")}
  />
);
