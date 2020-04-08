import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";
import WaitingBoard from "./board/WaitingBoard";
import GameBoard from "./board/GameBoard";
import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

const Board = () => {
  const { G, ctx, playerID, rawClient } = useBoardGame();
  const { t } = useTranslation("kalambury");
  const profiles = useProfiles();

  const [guess, setGuess] = useState("");
  const isDrawing = ctx.activePlayers[playerID] === "draw";
  const playerSecrets = G.players[playerID];
  const hasGameStarted = ctx.phase === "play";
  const canManageGame = ctx.activePlayers[playerID] === "manage";
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({
    secrets: { phrase: "" },
    isCurrentPlayer: true,
    stage: "wait",
  });

  const hasGameStarted = phase === "play";
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
  });

  useEffect(() => {
    const maxPoints = Math.max(...points);
    const newPlayers = gameMetadata.map(({ id, name: uid, isConnected }) => {
      const stage = activePlayers[id];
      const profile = profiles.get(uid);
      return {
        id,
        uid,
        profile,
        isConnected,
        stage,
        points: points[id],
        actions: getUserActions(actions, id),
        isDrawing: stage === "draw",
        canManageGame: stage === "manage",
        isCurrentPlayer: id.toString() === playerID,
        isWinning: points[id] === maxPoints,
      };
    });
    const currentPlayer = find(newPlayers, "isCurrentPlayer");
    if (currentPlayer) {
      setPlayer((player) => (isEqual(player, currentPlayer) ? player : currentPlayer));
    }

    setPlayers((players) => (isEqual(players, newPlayers) ? players : newPlayers));
  }, [gameMetadata, points, activePlayers, actions, playerID, setPlayers, setPlayer, profiles]);

  const envokeLastAnswer = (lastGuess) => {
    if (!player.isDrawing) {
      setGuess(lastGuess);
      guessInputRef.current.inputRef.current.blur();
      setTimeout(() => guessInputRef.current.focus(), 1);
    }
  };

  return (
    <GameLayout gameName="Kalambury" handleGuessClick={handleGuessClick}>
      <Header as="h2" textAlign="center">
        {t(`header.${ctx.phase}`)}
        <Header.Subheader>
          {player.isDrawing ? playerSecrets.phrase : t(`subheader.${phase}.${player.stage}`)}
        </Header.Subheader>
      </Header>
      {hasGameStarted ? (
        <GameBoard
          isDrawing={player.isDrawing}
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
