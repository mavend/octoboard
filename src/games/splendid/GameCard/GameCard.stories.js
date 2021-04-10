import React from "react";
import { select, number } from "@storybook/addon-knobs";

import GameCard from "./";
import { RESOURCES } from "../config";
import cards from "../data/cards.json";

export default {
  component: GameCard,
  title: "Splendid/GameCard",
  excludeStories: /.*Data$/,
};

const images = Object.values(cards).flatMap((level) => level.map(({ img }) => img));

const costOptions = {
  range: true,
  min: 0,
  max: 9,
  step: 1,
};

export const Default = () => (
  <GameCard
    level={select(
      "level",
      Object.values(cards).map((level) => level.key),
      1
    )}
    img={select("image", images, "eco.png")}
    resource={select("resource", RESOURCES, "nature")}
    points={number("points", 1, costOptions)}
    cost={{
      water: number("cost water", 1, costOptions),
      nature: number("cost nature", 1, costOptions),
      edu: number("cost edu", 1, costOptions),
      tech: number("cost tech", 0, costOptions),
      lab: number("cost lab", 0, costOptions),
    }}
  />
);
