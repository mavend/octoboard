import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Card from "./Card";
import { useBoardGame } from "contexts/BoardGameContext";

const MatchingBoard = () => {
  const { G, moves, player } = useBoardGame();
  const [selected, setSelected] = useState({ type: null, picture: null });

  const handleMatch = (type, picture) => {
    if (selected.picture === picture && selected.type === type) {
      setSelected({ type: null, picture: null });
      return;
    }
    if (selected.picture === null || selected.type === type || selected.picture !== picture) {
      setSelected({ type, picture });
      return;
    }
    setSelected({ type: null, picture: null });
    moves.Match(picture);
  };

  useEffect(() => {
    setSelected({ type: null, picture: null });
  }, [G.currentCard]);

  return (
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column style={{ display: "flex", justifyContent: "center" }}>
          <Card
            card={player.secrets.card}
            type="player"
            selected={selected}
            handleClick={handleMatch}
          />
        </Grid.Column>
        <Grid.Column style={{ display: "flex", justifyContent: "center" }}>
          <Card card={G.currentCard} type="current" selected={selected} handleClick={handleMatch} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default MatchingBoard;
