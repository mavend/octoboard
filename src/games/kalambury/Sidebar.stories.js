import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number, object } from "@storybook/addon-knobs";

import Sidebar from "./Sidebar";

export default {
  component: Sidebar,
  title: "Kalambury/Sidebar",
  excludeStories: /.*Data$/,
};

export const WithoutPlayers = () => (
  <Sidebar
    G={{ playersData: {} }}
    ctx={{ numPlayers: number("Room size", 4, { range: true, min: 0, max: 10, step: 1 }) }}
  />
);

export const Default = () => (
  <Sidebar
    G={{
      playersData: {
        "0": { name: "Mieczysław Czosnek" },
        "1": { name: "Janko Muzykant", isActive: true },
      },
      points: [10, 3],
      actions: [],
      privateRoom: boolean("Private", true),
    }}
    ctx={{ activePlayers: ["draw", "guess"], numPlayers: 4 }}
    playerID={1}
    handleGuessClick={action("handleGuessClick")}
    getUserActions={() => {
      action("getUserActions");
      return [{ action: "message", id: "123", text: "Hello" }];
    }}
  />
);
