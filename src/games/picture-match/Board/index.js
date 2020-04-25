import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header, Image, Segment } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import WaitingBoard from "components/game/WaitingBoard";
import MatchingBoard from "./MatchingBoard";

const Board = () => {
  const {
    G,
    ctx: { phase },
    player: { stage },
    moves: { StartGame },
  } = useBoardGame();

  const { t } = useTranslation("picture-match");
  const [guess, setGuess] = useState("");
  const [chosenStyle, setChosenStyle] = useState(G.style);

  const hasGameStarted = phase === "play";

  return (
    <GameLayout gameName={t("game.name")}>
      <Header as="h2" textAlign="center">
        {t(`header.${phase}`)}
        <Header.Subheader>{t(`subheader.${phase}.${stage}`)}</Header.Subheader>
      </Header>
      {hasGameStarted ? (
        <MatchingBoard />
      ) : (
        <WaitingBoard guess={guess} setGuess={setGuess} onStartGame={() => StartGame(chosenStyle)}>
          <Segment>
            <Header>{t("game.settings.style")}</Header>
            <Image.Group>
              {G.styles.map((style) => (
                <Image
                  bordered
                  key={style}
                  style={{ cursor: "pointer" }}
                  src={`/images/games/picture-match/styles/${style}.png`}
                  label={
                    chosenStyle === style
                      ? { as: "a", color: "green", corner: "left", icon: "check", size: "mini" }
                      : null
                  }
                  onClick={() => setChosenStyle(style)}
                />
              ))}
            </Image.Group>
          </Segment>
        </WaitingBoard>
      )}
    </GameLayout>
  );
};

export default Board;
