import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";

import Lobby from "./Lobby";

export default {
  component: Lobby,
  title: "Lobby",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <Lobby
    loading={boolean("Loading?", false)}
    matches={[]}
    games={[{ name: "Kalambury", image: "", minPlayers: 0, maxPlayers: 10 }]}
    handleCreate={action("handleCreate")}
    handleJoinMatch={action("handleJoinMatch")}
  />
);

export const WithMatches = () => (
  <Lobby
    loading={boolean("Loading?", false)}
    matches={[
      {
        matchID: "qweasd1",
        gameName: "Kalambury",
        players: [
          { id: 0, name: "Player 0" },
          { id: 1, name: "Player 1" },
        ],
        setupData: {},
      },
      {
        matchID: "qweasd2",
        gameName: "Kalambury",
        players: [{ id: 2, name: "Player 2" }, {}],
        setupData: {},
      },
      {
        matchID: "qweasd3",
        gameName: "Kalambury",
        players: [
          { id: 3, name: "Player 3" },
          { id: 4, name: "Player 4" },
          { id: 5, name: "Player 5" },
        ],
        setupData: {},
      },
      { matchID: "qweasd4", gameName: "Kalambury", players: [{}, {}], setupData: {} },
    ]}
    currentMatch={
      boolean("Is in game?", true) && {
        matchID: "qweasd0",
        gameName: "Kalambury",
        players: [
          { id: 0, name: "user-0" },
          { id: 1, name: "user-1" },
          { id: 2, name: "user-2" },
          {},
          {},
        ],
        setupData: { private: true },
      }
    }
    games={[
      {
        name: "Kalambury",
        image: "https://placeimg.com/120/120/any",
        minPlayers: 0,
        maxPlayers: 10,
      },
    ]}
    handleCreate={action("handleCreate")}
    handleJoinMatch={action("handleJoinMatch")}
  />
);
