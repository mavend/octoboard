import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Label, Button, Segment, Icon, Header } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import Tile from "../Tile";
import Grid from "./Grid";
import SettingsBoard from "./SettingsBoard";

const Board = () => {
  const {
    G,
    ctx: { phase },
    player: { letters, stage },
    moves: { StartGame, PlayTiles },
  } = useBoardGame();

  const { t } = useTranslation("scrambled");
  const [selectedLetterIdx, setSelectedLetterIdx] = useState(null);
  const [playerLetters, setPlayerLetters] = useState([]);

  const hasGameStarted = phase === "play";

  useEffect(() => {
    if (letters !== undefined) setPlayerLetters(letters);
  }, [letters]);

  const selectLetter = useCallback(
    (idx) => {
      if (playerLetters[idx].x !== undefined && playerLetters[idx].y !== undefined) return;

      if (selectedLetterIdx === idx) setSelectedLetterIdx(null);
      else setSelectedLetterIdx(idx);
    },
    [playerLetters, selectedLetterIdx, setSelectedLetterIdx]
  );

  const clickBoard = useCallback(
    (x, y) => {
      // Remove a tile that's on x,y
      const current = playerLetters.find((tile) => tile.x === x && tile.y === y);
      if (current) {
        delete current.x;
        delete current.y;
      }

      // Place new tile on x,y
      if (selectedLetterIdx !== null) {
        playerLetters[selectedLetterIdx].x = x;
        playerLetters[selectedLetterIdx].y = y;
      }

      setSelectedLetterIdx(null);
      // Force re-rendering of placed tiles
      setPlayerLetters([...playerLetters]);
    },
    [selectedLetterIdx, setSelectedLetterIdx, playerLetters, setPlayerLetters]
  );

  const onReturnLetters = useCallback(() => {
    Object.values(playerLetters).forEach((tile) => {
      delete tile.x;
      delete tile.y;
    });
    setPlayerLetters([...playerLetters]);
  }, [playerLetters, setPlayerLetters]);

  const onPlayTiles = useCallback(() => {
    PlayTiles(playerLetters);
  }, [PlayTiles, playerLetters]);

  const canBeClicked = (x, y) => {
    if (selectedLetterIdx !== null) return !G.board[y].row[x].letter;
    if (playerLetters.find((tile) => tile.x === x && tile.y === y)) return true;
    return false;
  };

  if (!hasGameStarted) {
    return (
      <GameLayout
        gameName={t("game.name")}
        header={
          <Header as="h2" textAlign="center">
            {t(`header.${phase}`)}
            <Header.Subheader>{t(`subheader.${phase}.${stage}`)}</Header.Subheader>
          </Header>
        }
      >
        <SettingsBoard
          modes={G.modes}
          defaultMode={G.mode}
          styles={G.styles}
          defaultStyle={G.style}
          defaultPicturesCount={G.picturesCount}
          onStartGame={StartGame}
        />
      </GameLayout>
    );
  }

  return (
    <GameLayout
      gameName={t("game.name")}
      header={
        <>
          <Header as="h2" textAlign="center">
            {t(`header.${phase}.${stage}`)}
            <Header.Subheader>{t(`subheader.${phase}.${stage}`)}</Header.Subheader>
          </Header>
          <Segment disabled={phase !== "play" || stage !== "play"}>
            <Label as="span" color="green" ribbon>
              <Icon name="star" />
              Your tiles
            </Label>
            <div style={{ display: "flex", paddingTop: 10 }}>
              {playerLetters &&
                playerLetters.map((letter, idx) => (
                  <Tile
                    separate
                    key={idx}
                    onClick={() => selectLetter(idx)}
                    raised={selectedLetterIdx === idx}
                    disabled={letter.x !== undefined && letter.y !== undefined}
                    {...letter}
                  />
                ))}
              <Button color="red" onClick={onReturnLetters}>
                <Icon name="undo" />
                Return letters
              </Button>
              <Button color="green" onClick={onPlayTiles}>
                <Icon name="check" />
                Submit
              </Button>
            </div>
          </Segment>
        </>
      }
    >
      <Grid
        board={G.board}
        clickable={canBeClicked}
        handleFieldClick={clickBoard}
        playerLetters={playerLetters}
        selectionEnabled={selectedLetterIdx !== null}
      />
    </GameLayout>
  );
};

export default Board;
