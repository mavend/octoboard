import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header, Form, Segment } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import WaitingBoard from "components/game/WaitingBoard";
import GameBoard from "./GameBoard";

const Board = () => {
  const {
    G,
    ctx: { phase },
    players,
    player: { isDrawing, stage, phrase },
    moves: { StartGame, UpdateConnectedPlayers },
  } = useBoardGame();

  const { t } = useTranslation("kalambury");
  const [guess, setGuess] = useState("");
  const [gameMode, setGameMode] = useState(G.mode);
  const [maxPoints, setMaxPoints] = useState(10);
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

  const connectedPlayers = players.filter((p) => p.isConnected).map((p) => p.id);

  useEffect(() => {
    console.log("Updating connected players:", connectedPlayers);
    UpdateConnectedPlayers(connectedPlayers);
  }, [JSON.stringify(connectedPlayers)]);

  return (
    <GameLayout gameName={t("game.name")} handleActionClick={handleActionClick}>
      <Header as="h2" textAlign="center">
        {hasGameStarted ? t(`header.${phase}.${stage}`) : t(`header.${phase}`)}
        <Header.Subheader>{isDrawing ? phrase : t(`subheader.${phase}.${stage}`)}</Header.Subheader>
      </Header>
      {hasGameStarted ? (
        <GameBoard
          guess={guess}
          setGuess={setGuess}
          guessInputRef={guessInputRef}
          envokeLastAnswer={envokeLastAnswer}
        />
      ) : (
        <WaitingBoard
          guess={guess}
          setGuess={setGuess}
          onStartGame={() => StartGame(gameMode, maxPoints)}
        >
          <Segment style={{ minWidth: "260px" }}>
            <Header>{t("game.settings.mode")}</Header>
            <Form>
              {G.modes.map((mode) => (
                <Form.Field>
                  <Form.Radio
                    toggle
                    label={t(`game.settings.modes.${mode}`)}
                    value={mode}
                    checked={gameMode === mode}
                    onChange={(e, { value }) => setGameMode(value)}
                  />
                </Form.Field>
              ))}
            </Form>
            <Header>{t("game.settings.maxPoints")}</Header>
            <Form>
              <Form.Input
                fluid
                type="range"
                min="1"
                max="50"
                step="1"
                disabled={gameMode === "infinite"}
                value={maxPoints}
                onChange={(e, { value }) => setMaxPoints(value)}
              />
              <Form.Input
                fluid
                type="number"
                min="1"
                max="50"
                step="1"
                disabled={gameMode === "infinite"}
                value={maxPoints}
                onChange={(e, { value }) => setMaxPoints(value)}
              />
            </Form>
          </Segment>
        </WaitingBoard>
      )}
    </GameLayout>
  );
};

export default Board;
