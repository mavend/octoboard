import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";

import MatchesList from "./MatchesList";

export default {
  component: MatchesList,
  title: "Lobby/MatchesList",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <MatchesList
    matches={[
      { matchID: "qweasd1", gameName: "Kalambury", players: [{}, {}, {}], setupData: {} },
      { matchID: "qweasd2", gameName: "Kalambury", players: [{}, {}, {}], setupData: {} },
      { matchID: "qweasd3", gameName: "Kalambury", players: [{}, {}, {}], setupData: {} },
      { matchID: "qweasd4", gameName: "Kalambury", players: [{}, {}, {}], setupData: {} },
    ]}
    currentMatch={
      boolean("Is in game?", true) && {
        matchID: "qweasd0",
        gameName: "Kalambury",
        players: [
          { id: "0", name: "user-0" },
          { id: "1", name: "user-1" },
          { id: "2", name: "user-2" },
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
    onJoinMatch={action("onJoinMatch")}
  />
);
