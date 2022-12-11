/* eslint-disable react/prop-types */
import React from "react";

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
export const Default = ({ isConnected, points, isWinning, isYou, displayName, ...args }) => (
  <Player
    player={{
      id: 0,
      uid: "user-1",
      isConnected,
      points,
      isWinning,
      isYou,
      profile: {
        displayName,
      },
    }}
    actionsMapper={actionsMapper}
    {...args}
  />
);

export const WithAdditionalContent = ({
  isConnected,
  points,
  isWinning,
  isYou,
  displayName,
  ...args
}) => (
  <Player
    player={{
      id: 0,
      uid: "user-1",
      isConnected,
      points,
      isWinning,
      isYou,
      profile: {
        displayName,
      },
    }}
    actionsMapper={actionsMapper}
    extraContent={({ profile: { displayName } }) => <span>Hello {displayName}!</span>}
    {...args}
  >
    <ActionsList actions={[{ name: "manage", id: "456" }]} />
  </Player>
);

Default.args = {
  isConnected: true,
  points: 12,
  isWinning: true,
  isYou: true,
  displayName: "Mieczysław Czosnek",
};

WithAdditionalContent.args = Default.args;
