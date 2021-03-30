import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import GameBoard from "./GameBoard";
import SettingsBoard from "./SettingsBoard";
import GameEndingBoard from "components/game/GameEndingBoard";

const Board = () => {
  const {
    G,
    ctx: { phase, gameover },
    players,
    player: { stage },
    moves: { StartGame },
  } = useBoardGame();

  const { t } = useTranslation("scrambled");
  const hasGameStarted = phase === "play";

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
      <SettingsBoard assists={G.assists} defaultAssist={G.assist} {...{ StartGame }} />
    </GameLayout>
  ) : (
    <GameLayout gameName={t("game.name")}>
      <GameEndingBoard winners={gameover.winners} players={players} />
    </GameLayout>
  );
};

export default Board;
