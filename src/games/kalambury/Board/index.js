import React, { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import WaitingBoard from "./WaitingBoard";
import GameBoard from "./GameBoard";

const Board = () => {
  const {
    ctx: { phase },
    player: { isDrawing, stage, phrase },
  } = useBoardGame();

  const { t } = useTranslation("kalambury");
  const [guess, setGuess] = useState("");
  const guessInputRef = useRef();

  const hasGameStarted = phase === "play";

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

  return (
    <GameLayout gameName={t("game.name")} handleActionClick={handleActionClick}>
      <Header as="h2" textAlign="center">
        {hasGameStarted ? t(`header.${phase}.${stage}`) : t(`header.${phase}`)}
        <Header.Subheader>
          {isDrawing ? secrets.phrase : t(`subheader.${phase}.${stage}`)}
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
        <WaitingBoard guess={guess} setGuess={setGuess} />
      )}
    </GameLayout>
  );
};

export default Board;
