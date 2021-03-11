import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import MatchingBoard from "./MatchingBoard";
import SettingsBoard from "./SettingsBoard";

const Board = () => {
  const {
    G,
    ctx: { phase },
    player: { stage },
    moves: { StartGame },
  } = useBoardGame();

  const { t } = useTranslation("picture-match");

  const hasGameStarted = phase === "play";

  return (
    <GameLayout gameName={t("game.name")} privateMatch={G.privateMatch} showCurrentPlayer={false}>
      <Header as="h2" textAlign="center">
        {t(`header.${phase}`)}
        <Header.Subheader>{t(`subheader.${phase}.${stage}`)}</Header.Subheader>
      </Header>
      {hasGameStarted ? (
        <MatchingBoard />
      ) : (
        <SettingsBoard
          modes={G.modes}
          defaultMode={G.mode}
          styles={G.styles}
          defaultStyle={G.style}
          defaultPicturesCount={G.picturesCount}
          StartGame={StartGame}
        />
      )}
    </GameLayout>
  );
};

export default Board;
