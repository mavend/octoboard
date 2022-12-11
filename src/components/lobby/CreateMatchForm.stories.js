import React from "react";
import { action } from "@storybook/addon-actions";

import CreateMatchForm from "./CreateMatchForm";

export default {
  component: CreateMatchForm,
  title: "Lobby/CreateMatchForm",
  excludeStories: /.*Data$/,
};

export const Default = (args) => (
  <CreateMatchForm
    games={[
      {
        name: "Kalambury",
        image: "https://placeimg.com/120/120/any",
        minPlayers: 0,
        maxPlayers: 10,
      },
    ]}
    onCreate={action("onCreate")}
    {...args}
  />
);
