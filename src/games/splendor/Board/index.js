import React from "react";
import { Segment, Card } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import GameCard, { PlaceholderCard } from "../GameCard";

const LEVELS = ["3", "2", "1"];

const Board = () => {
  const { G } = useBoardGame();

  return (
    <GameLayout gameName={"Splendor"}>
      <Segment style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {LEVELS.map((level) => (
          <Card.Group itemsPerRow={4}>
            {(G.table[level] || []).map((card) =>
              card ? <GameCard {...card} /> : <PlaceholderCard />
            )}
          </Card.Group>
        ))}
      </Segment>
    </GameLayout>
  );
};

export default Board;
