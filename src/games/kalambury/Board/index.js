import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";
import { isEqual } from "lodash";

import { useDeepCompareEffect } from "utils/hooks";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import SettingsBoard from "./SettingsBoard";
import GameBoard from "./GameBoard";
import GameEndingBoard from "components/game/GameEndingBoard";

const Board = () => {
  const {
    G,
    ctx: { phase, gameover },
    players,
    player: { isDrawing, stage, phrase },
    moves: { StartGame, UpdateConnectedPlayers },
  } = useBoardGame();
  const { t } = useTranslation("kalambury");

  const [guess, setGuess] = useState("");
  const guessInputRef = useRef();

  const hasGameStarted = phase === "play";

  const handleStartGame = useCallback(
    ({ gameMode, maxPoints, language, category, timePerTurn }) => {
      StartGame(gameMode, maxPoints, language, category, timePerTurn);
    },
    [StartGame]
  );

  useEffect(() => {
    setGuess("");
  }, [isDrawing]);

  const handleActionClick = useCallback(
    ({ action, phrase }) => {
      if (!isDrawing && action === "guess") {
        setGuess(phrase);
        guessInputRef.current.focus();
      }
    },
    [isDrawing]
  );

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

  const connectedPlayers = players.filter((p) => p.isConnected).map((p) => p.id);

  useDeepCompareEffect(() => {
    if (!isEqual(connectedPlayers, G.connectedPlayers)) {
      UpdateConnectedPlayers(connectedPlayers);
    }
  }, [UpdateConnectedPlayers, connectedPlayers, G.connectedPlayers]);

  return (
    <GameLayout
      gameName={t("game.name")}
      privateMatch={G.privateMatch}
      handleActionClick={handleActionClick}
    >
      {phase ? (
        <>
          <Header as="h2" textAlign="center">
            {hasGameStarted ? t(`header.${phase}.${stage}`) : t(`header.${phase}`)}
            <Header.Subheader>
              {isDrawing ? phrase : t(`subheader.${phase}.${stage}`)}
            </Header.Subheader>
          </Header>
          {hasGameStarted ? (
            <GameBoard
              guess={guess}
              setGuess={setGuess}
              guessInputRef={guessInputRef}
              envokeLastAnswer={envokeLastAnswer}
            />
          ) : (
            <SettingsBoard
              modes={G.modes}
              defaultMode={G.mode}
              defaultTimePerTurn={G.timePerTurn}
              onStartGame={handleStartGame}
            />
          )}
        </>
      ) : (
        <>
          <GameEndingBoard winners={gameover.winners} players={players} />
        </>
      )}
    </GameLayout>
  );
};

export default Board;
