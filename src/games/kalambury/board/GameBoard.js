import React, { useEffect, useState } from "react";
import { Segment, Button, Header } from "semantic-ui-react";
import Confetti from "react-dom-confetti";
import { shuffle } from "lodash";
import { withTranslation } from "react-i18next";
import { timerFormat } from "../utils/time";
import DrawingBoard from "./DrawingBoard";
import GuessingBoard from "./GuessingBoard";
import { COLORS } from "config/constants";

const confettiConfig = {
  angle: 90,
  spread: "54",
  startVelocity: "56",
  elementCount: "55",
  dragFriction: "0.07",
  duration: "2390",
  stagger: 0,
  width: "10px",
  height: "43px",
  colors: shuffle(COLORS).slice(0, 5),
};

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
  const [lastSuccess, setLastSuccess] = useState(false);
  const lastUserGuess = getUserActions(actions, playerID, "guess")[0] || {
    id: null,
    success: false,
  };

  useEffect(() => {
    setLastSuccess(lastUserGuess.success);
    return () => setLastSuccess(false); // Do cleanup of state
  }, [lastUserGuess.id, lastUserGuess.success]);

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
      if (rawClient.transport.socket)
        rawClient.transport.socket.removeListener("broadcast", broadcastHandler);
    };
  }, [isDrawing, rawClient.transport.socket]);

  useEffect(() => {
    if (isDrawing) moves.UpdateDrawing(lines);
  }, [isDrawing, moves, lines]);

  const handleChangePhrase = () => {
    ChangePhrase();
    setLines([]);
  };

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
          <Button color="yellow" disabled={!canChangePhrase} onClick={handleChangePhrase}>
            {t("board.game.new_phrase")}
          </Button>
        </Segment>
      )}
      <Confetti active={lastSuccess} config={confettiConfig} className="confetti" />
    </>
  );
};

export default withTranslation("kalambury")(GameBoard);
