import React, { useCallback, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import Confetti from "react-dom-confetti";

import { currentTime } from "../utils/time";
import { updateLines, UpdateTypes } from "../utils/updateLines";
import { WIDE_CONFETTI } from "config/confetti";
import { useBoardGame } from "contexts/BoardGameContext";
import { throttleAccumulate } from "utils/throttle";

import DrawArea from "../DrawArea";
import GuessingBoard from "./GuessingBoard";
import Countdown from "./Countdown";

import { random } from "lodash";
import { useWhiteboardAudio } from "utils/game/audio";

const propTypes = {
  guess: PropTypes.string,
  setGuess: PropTypes.func,
  envokeLastAnswer: PropTypes.func,
  guessInputRef: PropTypes.object,
  soundsEnabled: PropTypes.bool,
};

const GameBoard = ({ guess, setGuess, envokeLastAnswer, guessInputRef, soundsEnabled }) => {
  const {
    G,
    moves,
    player: { isDrawing, actions },
    matchID,
    chatMessages,
    sendChatMessage,
  } = useBoardGame();
  const [lines, setLines] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(G.turnEndTime - currentTime());
  const [lastSuccess, setLastSuccess] = useState(false);
  const lastUserGuess = actions?.find(({ name }) => name === "guess") || {
    id: null,
    data: {},
  };

  const { whiteboard } = useWhiteboardAudio();

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

  const linesStorageKey = `kalambury-lines-${matchID}-${G.phraseCounter}`;

  // set initial lines
  useEffect(() => {
    // do not execute until player's data is loaded
    if (isDrawing === undefined) return;

    const key = linesStorageKey;
    const savedLines = localStorage.getItem(key);
    if (savedLines) {
      setLines(JSON.parse(savedLines));
    } else {
      setLines([]);
    }
    return () => {
      localStorage.removeItem(key);
    };
  }, [setLines, isDrawing, linesStorageKey]);

  // update copy of lines in localStorage
  useEffect(() => {
    if (lines.length > 0) {
      localStorage.setItem(linesStorageKey, JSON.stringify(lines));
    }
  }, [lines, isDrawing, linesStorageKey]);

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
    setLastSuccess(lastUserGuess.data.success);
    return () => setLastSuccess(false); // Do cleanup of state
  }, [lastUserGuess.id, lastUserGuess.data.success]);

  const PlayAudio = useCallback(
    (updateType) => {
      const audioSettings = {
        add: {
          sampleName: () => `tap${random(2)}`,
          squeakProbability: 0.15,
        },
        append: {
          sampleName: () => `draw${random(7)}`,
          squeakProbability: 0.03,
        },
      }[updateType];
      if (!audioSettings) return;

      whiteboard({ id: audioSettings.sampleName() });
      if (Math.random() > 1 - audioSettings.squeakProbability)
        whiteboard({ id: `squeak${random(2)}` });
    },
    [whiteboard]
  );

  useEffect(() => {
    if (isDrawing || chatMessages.length <= 0) return;
    const lastMessage = chatMessages[chatMessages.length - 1].payload;

    if (lastMessage.type && lastMessage.type.startsWith("UpdateDrawing")) {
      const updateType = lastMessage.type.split(":")[1];
      if (soundsEnabled) PlayAudio(updateType);
      setLines((lines) => updateLines(lines, updateType, lastMessage.data));
    }
  }, [isDrawing, chatMessages, setLines, PlayAudio, soundsEnabled]);

  const handleLinesUpdate = useCallback(
    (type, data) => {
      setLines((lines) => updateLines(lines, type, data));
      if (type === UpdateTypes.append) {
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
GameBoard.propTypes = propTypes;

export default GameBoard;
