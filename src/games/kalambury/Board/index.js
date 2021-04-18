import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header, Button, Icon } from "semantic-ui-react";
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
  const [soundsEnabled, setSoundsEnabled] = useState(false);
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

  const actionsMapper = useCallback(
    (action) => {
      const { success, phrase } = action.data || {};
      switch (action.name) {
        case "guess": {
          return {
            actionType: success ? "success" : "warning",
            icon: success ? "check circle" : "times circle",
            personal: true,
            content: phrase,
            onClick: isDrawing
              ? undefined
              : () => {
                  setGuess(phrase);
                  guessInputRef.current.focus();
                },
          };
        }
        case "draw":
          return { icon: "pencil", content: t("action.draw") };
        case "change":
          return {
            actionType: "alert",
            icon: "exchange",
            content: t("action.change", { phrase }),
          };
        case "forfeit":
          return {
            actionType: "danger",
            icon: "flag",
            content: t("action.forfeit", { phrase }),
          };
        case "timeout":
          return {
            actionType: "danger",
            icon: "clock outline",
            content: t("action.timeout", { phrase }),
          };
        default:
          return null;
      }
    },
    [isDrawing, t]
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

  const extraPlayerContent = useCallback(
    ({ isYou }) =>
      isYou && (
        <Button
          style={{ marginTop: 10 }}
          basic
          color={soundsEnabled ? "green" : "grey"}
          size="tiny"
          icon
          onClick={() => setSoundsEnabled(!soundsEnabled)}
          labelPosition="left"
        >
          <Icon name={soundsEnabled ? "volume up" : "volume off"} />
          {t(`game.settings.sound.${soundsEnabled}`)}
        </Button>
      ),
    [soundsEnabled, t]
  );

  return (
    <GameLayout
      gameName={t("game.name")}
      privateMatch={G.privateMatch}
      extraPlayerContent={extraPlayerContent}
      actionsMapper={actionsMapper}
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
              soundsEnabled={soundsEnabled}
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
