import React, { useCallback, useEffect, useState, useMemo } from "react";
import Confetti from "react-dom-confetti";

import { currentTime } from "../utils/time";
import { updateLines, UpdateTypes } from "../utils/update_lines";
import { WIDE_CONFETTI } from "config/confetti";
import { useBoardGame } from "contexts/BoardGameContext";
import filterActions from "utils/user/filterActions";
import { throttleAccumulate } from "utils/throttle";

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

  const throttledSendAppend = useMemo(
    () =>
      throttleAccumulate(sendChatMessage, 50, ([acc], [args]) => [
        {
          type: acc.type,
          data: [...acc.data, ...args.data],
        },
      ]),
    [sendChatMessage]
  );

  // send full drawing every 1sec
  useEffect(() => {
    if (isDrawing) {
      const interval = setInterval(() => {
        throttledSendAppend.flush();
        sendChatMessage({ type: "UpdateDrawing:replace", data: lines });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isDrawing, lines, sendChatMessage, throttledSendAppend]);

  // countdown timer
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

    if (lastMessage.type && lastMessage.type.startsWith("UpdateDrawing")) {
      const updateType = lastMessage.type.split(":")[1];
      setLines((lines) => updateLines(lines, updateType, lastMessage.data));
    }
  }, [isDrawing, chatMessages, setLines]);

  const handleLinesUpdate = useCallback(
    (type, data) => {
      setLines((lines) => updateLines(lines, type, data));
      if (type === UpdateTypes.add) {
        throttledSendAppend({ type: `UpdateDrawing:${type}`, data });
      } else {
        throttledSendAppend.flush();
        sendChatMessage({ type: `UpdateDrawing:${type}`, data });
      }
    },
    [setLines, sendChatMessage, throttledSendAppend]
  );

  return (
    <>
      {isDrawing ? (
        <DrawArea lines={lines} onLinesUpdate={handleLinesUpdate} />
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
