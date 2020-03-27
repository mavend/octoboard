import React from "react";
import { Segment, Button, Header } from "semantic-ui-react";
import { timerFormat } from "../utils/time";
import { withTranslation } from "react-i18next";
import DrawingBoard from "./DrawingBoard";
import GuessingBoard from "./GuessingBoard";

const GameBoard = ({
  isDrawing,
  playerData,
  G,
  ctx,
  moves,
  envokeLastAnswer,
  getUserActions,
  actions,
  playerID,
  guessInputRef,
  guess,
  setGuess,
  canChangePhrase,
  ChangePhrase,
  t,
}) => (
  <>
    {isDrawing ? (
      <DrawingBoard playerData={playerData} {...{ G, ctx, moves }} />
    ) : (
      <GuessingBoard
        envokeLastAnswer={envokeLastAnswer}
        previousUserGuesses={getUserActions(actions, playerID, "guess")}
        playerID={playerID}
        guessInputRef={guessInputRef}
        guess={guess}
        setGuess={setGuess}
        {...{ G, ctx, moves }}
      />
    )}
    <Header as="h3" textAlign="center" style={{ marginTop: 0 }}>
      {timerFormat(G.remainingSeconds)}
    </Header>
    {isDrawing ? (
      <Segment basic textAlign="center">
        <Button color="yellow" disabled={!canChangePhrase} onClick={() => ChangePhrase()}>
          {t("board.game.new_phrase")}
        </Button>
      </Segment>
    ) : (
      <></>
    )}
  </>
);

export default withTranslation("kalambury")(GameBoard);
