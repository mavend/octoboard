import React, { useEffect, useState } from "react";
import { Header } from "semantic-ui-react";
import Confetti from "react-dom-confetti";

import { timerFormat, currentTime } from "../utils/time";
import { WIDE_CONFETTI } from "config/confetti";
import { useBoardGame } from "contexts/BoardGameContext";
import filterActions from "utils/user/filterActions";

import { socket } from "utils/socket";

import DrawArea from "../DrawArea";
import GuessingBoard from "./GuessingBoard";

const GameBoard = ({ guess, setGuess, envokeLastAnswer, guessInputRef }) => {
  const {
    G,
    moves,
    player: { isDrawing },
    playerID,
  } = useBoardGame();
  const [lines, setLines] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(G.turnEndTime - currentTime());
  const [lastSuccess, setLastSuccess] = useState(false);
  const lastUserGuess = filterActions(G.actions, playerID, "guess")[0] || {
    id: null,
    success: false,
  };
  const [connectedSocket, setConnectedSocket] = useState(undefined);

  useEffect(() => {
    if (connectedSocket !== undefined) return;
    var s = socket();
    s.connect();
    setConnectedSocket(s.socket);
  }, [connectedSocket]);

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
    const broadcastHandler = (matchID, data) => {
      console.log("WOAH", matchID, data);
      if (data.type === "UpdateDrawing" && !isDrawing) {
        setLines(data.args[0]);
      }
    };
    if (isDrawing) {
      setLines([]);
    } else {
      if (!connectedSocket) return; // TODO: we should show some error here
      connectedSocket.on("update", broadcastHandler);
    }
    return () => {
      if (connectedSocket) connectedSocket.removeListener("update", broadcastHandler);
    };
  }, [isDrawing, connectedSocket]);

  useEffect(() => {
    if (isDrawing) {
      if (connectedSocket) {
        connectedSocket.emit("update", "action", "stateID", "matchID", "playerID");
      }
    }
  }, [isDrawing, lines, connectedSocket]);

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
      <Confetti active={lastSuccess} config={WIDE_CONFETTI} className="confetti" />
    </>
  );
};

export default GameBoard;
