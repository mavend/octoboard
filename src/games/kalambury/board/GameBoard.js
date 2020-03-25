import React, { useEffect, useState } from "react";
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
  rawClient,
}) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const broadcastHandler = (gameID, data) => {
      if (data.type === "UpdateDrawing" && !isDrawing) {
        setLines(data.args[0]);
      }
    };
    if (isDrawing) {
      setLines([]);
    } else {
      rawClient.transport.socket.on("broadcast", broadcastHandler);
    }
    return () => {
      rawClient.transport.socket.off("broadcast", broadcastHandler);
    };
  }, [isDrawing, rawClient.transport.socket]);

  useEffect(() => {
    if (isDrawing) moves.UpdateDrawing(lines);
  }, [isDrawing, moves, lines]);

  return (
    <>
      {isDrawing ? (
        <DrawingBoard playerData={playerData} {...{ G, ctx, moves, lines, setLines }} />
      ) : (
        <GuessingBoard
          envokeLastAnswer={envokeLastAnswer}
          previousUserGuesses={getUserActions(actions, playerID, "guess")}
          playerID={playerID}
          guessInputRef={guessInputRef}
          guess={guess}
          setGuess={setGuess}
          {...{ G, ctx, moves, rawClient, lines }}
        />
      )}
      <Header as="h3" textAlign="center" style={{ marginTop: 0 }}>
        {timerFormat(G.remainingSeconds)}
      </Header>
      {isDrawing && (
        <Segment basic textAlign="center">
          <Button
            color="yellow"
            disabled={!canChangePhrase}
            onClick={() => setLines([]) && ChangePhrase()}
          >
            {t("board.game.new_phrase")}
          </Button>
        </Segment>
      )}
    </>
  );
};

export default withTranslation("kalambury")(GameBoard);
