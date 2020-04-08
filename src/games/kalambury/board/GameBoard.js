import React, { useEffect, useState } from "react";
import { Segment, Button, Header } from "semantic-ui-react";
import Confetti from "react-dom-confetti";
import { shuffle } from "lodash";
import { useTranslation } from "react-i18next";
import { timerFormat, currentTime } from "../utils/time";
import DrawArea from "../DrawArea";
import GuessingBoard from "./GuessingBoard";
import { COLORS } from "config/constants";
import { useBoardGame } from "contexts/BoardGameContext";
import filterActions from "utils/user/filterActions";

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
  envokeLastAnswer,
  guessInputRef,
  guess,
  setGuess,
  canChangePhrase,
  ChangePhrase,
}) => {
  const { G, ctx, moves, playerID, rawClient } = useBoardGame();
  const { t } = useTranslation("kalambury");
  const [lines, setLines] = useState([]);
  const isDrawing = ctx.activePlayers[playerID] === "draw";
  const [remainingSeconds, setRemainingSeconds] = useState(G.turnEndTime - currentTime());
  const [lastSuccess, setLastSuccess] = useState(false);
  const lastUserGuess = filterActions(G.actions, playerID, "guess")[0] || {
    id: null,
    success: false,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = G.turnEndTime - currentTime();
      if ((seconds <= 0 && isDrawing) || seconds < 5) {
        moves.NotifyTimeout();
      }
      setRemainingSeconds(Math.max(seconds, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [G.turnEndTime, setRemainingSeconds, moves, isDrawing]);

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
      if (!rawClient.transport.socket) return; // TODO: we should show some error here
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
        <DrawArea lines={lines} setLines={setLines} remainingSeconds={remainingSeconds} />
      ) : (
        <GuessingBoard
          lastUserGuess={lastUserGuess}
          envokeLastAnswer={envokeLastAnswer}
          guessInputRef={guessInputRef}
          guess={guess}
          setGuess={setGuess}
          lines={lines}
          remainingSeconds={remainingSeconds}
        />
      )}
      <Header as="h3" attached="bottom" textAlign="center">
        {timerFormat(remainingSeconds)}
      </Header>
      {isDrawing && (
        <Segment basic textAlign="center" style={{ marginTop: "-1rem" }}>
          <Button color="yellow" disabled={!canChangePhrase} onClick={handleChangePhrase}>
            {t("board.game.new_phrase")}
          </Button>
        </Segment>
      )}
      <Confetti active={lastSuccess} config={confettiConfig} className="confetti" />
    </>
  );
};

export default GameBoard;
