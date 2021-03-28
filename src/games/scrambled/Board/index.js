import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import GameBoard from "./GameBoard";
import SettingsBoard from "./SettingsBoard";
import { availableLaguages } from "../data/tiles";
import GameEndingBoard from "components/game/GameEndingBoard";

const Board = () => {
  const {
    ctx: { phase, gameover },
    players,
    player: { stage },
    moves: { StartGame },
  } = useBoardGame();

  const { t, i18n } = useTranslation("scrambled");
  const hasGameStarted = phase === "play";

  const languages = availableLaguages.map((lang) => ({
    key: lang.key,
    value: lang.key,
    text: lang.name,
  }));
  const defaultLanguage = languages.find(({ value }) => value === i18n.language) || languages[0];
  const [language, setLanguage] = useState(defaultLanguage.value);

  const onStartGame = useCallback(() => {
    StartGame(language);
  }, [StartGame, language]);

  if (hasGameStarted) {
    return <GameBoard />;
  }

  return phase ? (
    <GameLayout
      gameName={t("game.name")}
      header={
        <Header as="h2" textAlign="center">
          {t(`header.${phase}`)}
          <Header.Subheader>{t(`subheader.${phase}.${stage}`)}</Header.Subheader>
        </Header>
      }
    >
      <SettingsBoard {...{ languages, language, setLanguage, onStartGame }} />
    </GameLayout>
  ) : (
    <GameLayout gameName={t("game.name")}>
      <GameEndingBoard winners={gameover.winners} players={players} />
    </GameLayout>
  );
};

export default Board;
