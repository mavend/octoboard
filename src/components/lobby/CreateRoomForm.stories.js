import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

import CreateRoomForm from "./CreateRoomForm";

export default {
  component: CreateRoomForm,
  title: "Lobby/CreateRoomForm",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <CreateRoomForm
    loading={boolean("Loading?", false)}
    disabled={boolean("Disabled?", false)}
    games={[
      {
        name: "Kalambury",
        image: "https://placeimg.com/120/120/any",
        minPlayers: 0,
        maxPlayers: 10,
      },
    ]}
    onCreate={action("onCreate")}
  />
);
