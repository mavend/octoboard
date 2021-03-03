import React, { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

import { currentTime } from "../utils/time";
import { WIDE_CONFETTI } from "config/confetti";
import { useBoardGame } from "contexts/BoardGameContext";
import filterActions from "utils/user/filterActions";

import DrawArea from "../DrawArea";
import GuessingBoard from "./GuessingBoard";
import Countdown from "./Countdown";

const GameBoard = ({ guess, setGuess, envokeLastAnswer, guessInputRef }) => {
  const {
    G,
    moves,
    player: { isDrawing, phrase },
    playerID,
    chatMessages,
    sendChatMessage,
  } = useBoardGame();
  const [lines, setLines] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(G.turnEndTime - currentTime());
  const [lastSuccess, setLastSuccess] = useState(false);
  const lastUserGuess = filterActions(G.actions, playerID, "guess")[0] || {
    id: null,
    success: false,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = G.turnEndTime - currentTime();
      if ((seconds <= 0 && isDrawing) || seconds < -5) {
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
    if (isDrawing) {
      setLines([]);
    }
  }, [isDrawing, phrase]);

  useEffect(() => {
    if (isDrawing || chatMessages.length <= 0) return;
    const lastMessage = chatMessages[chatMessages.length - 1].payload;
    if (lastMessage.type === "UpdateDrawing") {
      setLines(lastMessage.data);
    }
  }, [isDrawing, chatMessages]);

  useEffect(() => {
    if (isDrawing) {
      sendChatMessage({ type: "UpdateDrawing", data: lines });
    }
  }, [isDrawing, lines, sendChatMessage]);

  return (
    <>
      {isDrawing ? (
        <DrawArea lines={lines} setLines={setLines} />
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
      <Countdown remainingSeconds={remainingSeconds} totalTime={G.timePerTurn} />
      <Confetti active={lastSuccess} config={WIDE_CONFETTI} className="confetti" />
    </>
  );
};

export default GameBoard;
