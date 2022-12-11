import React from "react";

import GameCard from "./";

export default {
  component: GameCard,
  title: "Splendid/GameCard",
  excludeStories: /.*Data$/,
};

export const Default = (args) => (
  <GameCard
    level={1}
    img="eco.png"
    resource="nature"
    points={1}
    cost={{
      water: 1,
      nature: 1,
      edu: 1,
      tech: 0,
      lab: 0,
    }}
    {...args}
  />
);
