import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";
import WaitingBoard from "./board/WaitingBoard";
import GameBoard from "./board/GameBoard";
import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

const Board = () => {
  const { G, ctx, moves, playerID, rawClient } = useBoardGame();
  const { t } = useTranslation("kalambury");

  const [guess, setGuess] = useState("");
  const isDrawing = ctx.activePlayers[playerID] === "draw";
  const playerData = G.players[playerID];
  const hasGameStarted = ctx.phase === "play";
  const canManageGame = ctx.activePlayers[playerID] === "manage";

  const guessInputRef = useRef();

  const handleGuessClick = useCallback(
    (e) => {
      if (!isDrawing) {
        setGuess(e.target.textContent);
        guessInputRef.current.focus();
      }
    },
    [isDrawing]
  );

  useEffect(() => {
    // resync after connection to broadcast updated gameMetadata
    if (rawClient) {
      const {
        transport: { socket, gameID, playerID, numPlayers },
      } = rawClient;
      const timeout = setTimeout(() => socket.emit("sync", gameID, playerID, numPlayers), 500);
      return () => clearTimeout(timeout);
    }
  }, [rawClient]);

  useEffect(() => {
    moves.Ping();
    let interval = setInterval(moves.Ping, 1000);
    return () => clearInterval(interval);
  }, [moves, moves.Ping]);

  const envokeLastAnswer = useCallback(
    (lastGuess) => {
      if (!isDrawing) {
        setGuess(lastGuess);
        guessInputRef.current.inputRef.current.blur();
        setTimeout(() => guessInputRef.current.focus(), 1);
      }
    },
    [isDrawing]
  );

  return (
    <GameLayout gameName="Kalambury" handleGuessClick={handleGuessClick}>
      <Header as="h2" textAlign="center">
        {t(`header.${ctx.phase}`)}
        <Header.Subheader>
          {isDrawing
            ? playerData.phrase
            : t(`subheader.${ctx.phase}.${ctx.activePlayers[playerID]}`)}
        </Header.Subheader>
      </Header>
      {hasGameStarted ? (
        <GameBoard
          {...{
            envokeLastAnswer,
            guessInputRef,
            guess,
            setGuess,
          }}
        />
      ) : (
        <WaitingBoard {...{ canManageGame, setGuess, guess }} />
      )}
    </GameLayout>
  );
};

export default Board;
