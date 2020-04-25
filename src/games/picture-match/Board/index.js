import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import WaitingBoard from "games/kalambury/Board/WaitingBoard";
import MatchingBoard from "./MatchingBoard";

const Board = () => {
  const {
    ctx: { phase },
    player: { stage },
  } = useBoardGame();

  const { t } = useTranslation("picture-match");
  const [guess, setGuess] = useState("");

  const hasGameStarted = phase === "play";

  return (
    <GameLayout gameName={t("game.name")}>
      <Header as="h2" textAlign="center">
        {t(`header.${phase}`)}
        <Header.Subheader>{t(`subheader.${phase}.${stage}`)}</Header.Subheader>
      </Header>
      {hasGameStarted ? <MatchingBoard /> : <WaitingBoard guess={guess} setGuess={setGuess} />}
    </GameLayout>
  );
};

export default Board;
