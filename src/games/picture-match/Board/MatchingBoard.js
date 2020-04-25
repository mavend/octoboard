import React, { useState } from "react";
import { Grid, Transition } from "semantic-ui-react";
import Card from "./Card";
import { useBoardGame } from "contexts/BoardGameContext";
import Confetti from "react-dom-confetti";
import { shuffle } from "lodash";
import { COLORS } from "config/constants";

const confettiConfig = {
  angle: 90,
  spread: "74",
  startVelocity: "56",
  elementCount: "55",
  dragFriction: "0.07",
  duration: "1290",
  stagger: 0,
  width: "10px",
  height: "43px",
  colors: shuffle(COLORS).slice(0, 5),
};

const MatchingBoard = () => {
  const { G, moves, player } = useBoardGame();
  const [guessingEnabled, setGuessingEnabled] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleClick = (picture) => {
    if (!guessingEnabled) {
      return;
    }
    if (
      player.secrets.card.pictures.indexOf(picture) === -1 ||
      G.currentCard.pictures.indexOf(picture) === -1
    ) {
      setTimeout(() => setGuessingEnabled(true), 700);
      setGuessingEnabled(false);
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1);
    moves.Match(picture);
  };

  return (
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column style={{ display: "flex", justifyContent: "center" }}>
          <Transition animation={"tada"} duration={700} visible={guessingEnabled}>
            {/*
            Transition doesn't seem to work on a Component so we wrap it in a `div`
            It's required anyway for inner transform to work
            */}
            <div>
              <Card card={player.secrets.card} style={G.style} handleClick={handleClick} />
            </div>
          </Transition>
        </Grid.Column>
        <Grid.Column style={{ display: "flex", justifyContent: "center" }}>
          <Transition animation={"tada"} duration={700} visible={guessingEnabled}>
            <div>
              <Card card={G.currentCard} style={G.style} handleClick={handleClick} />
            </div>
          </Transition>
        </Grid.Column>
      </Grid.Row>
      <Confetti active={success} config={confettiConfig} className="confetti" />
    </Grid>
  );
};

export default MatchingBoard;