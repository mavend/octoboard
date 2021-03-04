import React, { useCallback, useEffect, useState, useMemo } from "react";
import Confetti from "react-dom-confetti";

import { currentTime } from "../utils/time";
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
      throttleAccumulate(sendChatMessage, 200, ([acc], [args]) => [
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

  const updateLines = useCallback(
    (type, data = null) => {
      setLines((lines) => {
        if (type === "add" && lines) {
          return [...lines, data];
        }
        if (type === "append" && lines.length > 0) {
          const last = lines[lines.length - 1];
          return [...lines.slice(0, -1), { ...last, points: [...last.points, ...data] }];
        }
        if (type === "delete" && lines.length > 0) {
          return lines.slice(0, -1);
        }
        if (type === "replace" && data) {
          return data;
        }
        return lines;
      });
    },
    [setLines]
  );

  useEffect(() => {
    if (isDrawing || chatMessages.length <= 0) return;
    const lastMessage = chatMessages[chatMessages.length - 1].payload;

    if (lastMessage.type && lastMessage.type.startsWith("UpdateDrawing")) {
      const updateType = lastMessage.type.split(":")[1];
      updateLines(updateType, lastMessage.data);
    }
  }, [isDrawing, chatMessages, updateLines]);

  const handleLinesUpdate = useCallback(
    (type, data) => {
      updateLines(type, data);
      if (type === "append") {
        throttledSendAppend({ type: `UpdateDrawing:${type}`, data });
      } else {
        throttledSendAppend.flush();
        sendChatMessage({ type: `UpdateDrawing:${type}`, data });
      }
    },
    [updateLines, sendChatMessage, throttledSendAppend]
  );

  return (
    <>
      {isDrawing ? (
        <DrawArea lines={lines} updateLines={handleLinesUpdate} />
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
