import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Label, Button, Segment, Icon, Header, Modal, Popup, Sticky } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import Tile from "../Tile";
import Grid from "./Grid";
import SettingsBoard from "./SettingsBoard";
import { reject, remove, keys, groupBy, orderBy } from "lodash";
import { availableLaguages } from "../data/tiles";
import { tilesPlacementErrors, newWords, filterPlayedTiles } from "../utils";
import { BONUSES } from "../config";
import GameEndingBoard from "components/game/GameEndingBoard";

const Board = () => {
  const {
    G,
    ctx,
    ctx: { phase, gameover },
    players,
    player: { id, letters, stage, isCurrentPlayer },
    moves: { StartGame, PlayTiles, SwapTiles, SkipTurn, Approve },
  } = useBoardGame();

  const { t } = useTranslation("scrambled");
  const [selectedLetterIdx, setSelectedLetterIdx] = useState(null);
  const [playerLetters, setPlayerLetters] = useState([]);
  const [playedTilesCount, setPlayedTilesCount] = useState(0);
  const [moveErrors, setMoveErrors] = useState([]);
  const [selectedBlankTile, setSelectedBlankTile] = useState(null);
  const [blankTileReplacement, setBlankTileReplacement] = useState(null);
  const [swapTilesModal, setSwapTilesModal] = useState(false);
  const [selectedForSwap, setSelectedForSwap] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const popupHandleRef = useRef();
  const stickyRef = useRef();

  const currentLanguage = availableLaguages.find(({ key }) => key === G.language);

  const hasGameStarted = phase === "play";

  const SHORTCUTS = useMemo(() => ["q", "w", "e", "r", "a", "s", "d", "f"], []);

  const onReturnLetters = useCallback(() => {
    Object.values(playerLetters).forEach((tile) => {
      delete tile.x;
      delete tile.y;
      delete tile.popupRef;
    });
    setPlayerLetters([...playerLetters]);
    setPopupOpen(false);
  }, [playerLetters, setPlayerLetters]);

  const onPlayTiles = useCallback(() => {
    playerLetters.forEach((tile) => {
      tile.popupRef = undefined;
    });
    setPopupOpen(false);
    PlayTiles(playerLetters);
  }, [PlayTiles, playerLetters]);

  const onSkipTurn = useCallback(() => {
    playerLetters.forEach((tile) => {
      tile.popupRef = undefined;
    });
    setPopupOpen(false);
    SkipTurn();
  }, [SkipTurn, playerLetters]);

  const onSelectForSwap = useCallback(
    (idx) => {
      selectedForSwap.includes(idx)
        ? remove(selectedForSwap, (el) => el === idx)
        : selectedForSwap.push(idx);
      setSelectedForSwap([...selectedForSwap]);
    },
    [selectedForSwap]
  );

  const onMouseMove = useCallback(({ x, y }) => {
    // Viewport relative coordinates
    const popup = document.getElementById("words-info-popup");
    if (popup) {
      const rect = popup.getBoundingClientRect();
      popup.style.transition = "opacity 0.3s, transform 0.3s";
      if (
        x >= rect.left - 10 &&
        x <= rect.right + 10 &&
        y >= rect.top - 10 &&
        y <= rect.bottom + 10
      ) {
        popup.style.opacity = 0;
      } else {
        popup.style.opacity = 1.0;
      }
    }
  }, []);

  const onKeyDown = useCallback(
    ({ key }) => {
      if (selectedBlankTile) {
        const letters = currentLanguage.letters;
        if (letters.includes(key.toUpperCase())) {
          setBlankTileReplacement(key.toUpperCase());
        }
        if (key === "Enter") {
          playerLetters[selectedBlankTile].replacement = blankTileReplacement;
          setSelectedBlankTile(null);
        }
        return;
      }
      if (SHORTCUTS.includes(key)) {
        const idx = SHORTCUTS.indexOf(key);
        switch (idx) {
          case 7:
            onReturnLetters();
            break;
          default:
            selectedLetterIdx === idx ? setSelectedLetterIdx(null) : setSelectedLetterIdx(idx);
            break;
        }
      }
    },
    [
      G.language,
      SHORTCUTS,
      blankTileReplacement,
      onReturnLetters,
      playerLetters,
      selectedBlankTile,
      selectedLetterIdx,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onKeyDown, onMouseMove]);

  useEffect(() => {
    if (letters !== undefined) setPlayerLetters(letters);
  }, [letters]);

  useEffect(() => {
    // player.isCurrentPlayer didn't seem to work properly
    if (id !== undefined && id.toString() !== ctx.currentPlayer) {
      setMoveErrors(["invalid_player"]);
      return;
    }
    const playedTiles = filterPlayedTiles(playerLetters);
    setMoveErrors(tilesPlacementErrors(G, ctx, playedTiles));
    setPlayedTilesCount(playedTiles.length);
  }, [playerLetters, setPlayedTilesCount, G, ctx, id]);

  const selectLetter = useCallback(
    (idx) => {
      if (selectedLetterIdx === idx) setSelectedLetterIdx(null);
      else setSelectedLetterIdx(idx);
    },
    [selectedLetterIdx, setSelectedLetterIdx]
  );

  const canBeClicked = useCallback(
    (x, y) => {
      // Player can't click outside of their turn
      if (!isCurrentPlayer) return false;
      // Player can always click on a temporarily placed tile to remove it
      if (playerLetters.find((tile) => tile.x === x && tile.y === y)) return true;
      if (selectedLetterIdx !== null) {
        // TODO: Make this more generic - find starting tiles
        if (!G.initialWordPlayed && !playerLetters.find(({ x, y }) => x === 7 && y === 7))
          return x === 7 || y === 7;
        const placedLetters = playerLetters.filter(
          (el) => el.x !== undefined && el.y !== undefined
        );
        const wordInRow = keys(groupBy(placedLetters, "y")).length === 1;
        switch (placedLetters.length) {
          case 0:
            // If a letter is selected it can't be placed on a permanently placed tile
            return !G.board[y].row[x].letter;
          case 1:
            // If there is one letter already placed, new tiles can only be placed in a row or in a column
            return (
              !G.board[y].row[x].letter && (x === placedLetters[0].x || y === placedLetters[0].y)
            );
          default:
            // If more than one letter is already there there is only one way
            return (
              !G.board[y].row[x].letter &&
              (wordInRow ? y === placedLetters[0].y : x === placedLetters[0].x)
            );
        }
      }
      return false;
    },
    [G.board, G.initialWordPlayed, playerLetters, selectedLetterIdx, isCurrentPlayer]
  );

  const clickBoard = useCallback(
    (x, y) => {
      if (!canBeClicked(x, y)) return;

      // Remove a tile that's on x,y
      const currentIdx = playerLetters.findIndex((tile) => tile.x === x && tile.y === y);
      if (currentIdx >= 0) {
        delete playerLetters[currentIdx].x;
        delete playerLetters[currentIdx].y;
      }

      // Place new tile on x,y
      if (selectedLetterIdx !== null) {
        if (!playerLetters[selectedLetterIdx].letter) {
          setSelectedBlankTile(selectedLetterIdx);
        }
        playerLetters[selectedLetterIdx].x = x;
        playerLetters[selectedLetterIdx].y = y;
      }

      setSelectedLetterIdx(null);
      // Force re-rendering of placed tiles
      setPlayerLetters([...playerLetters]);

      playerLetters.forEach((tile) => {
        tile.popupRef = undefined;
      });
      const playedTiles = reject(playerLetters, (el) => el.x === undefined || el.y === undefined);
      if (playedTiles.length > 0)
        orderBy(playedTiles, ["y", "x"], ["asc", "asc"])[0].popupRef = popupHandleRef;
      setPopupOpen(playedTiles.length > 0);
    },
    [canBeClicked, playerLetters, selectedLetterIdx]
  );

  if (!hasGameStarted) {
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
        <SettingsBoard
          modes={G.modes}
          defaultMode={G.mode}
          styles={G.styles}
          defaultStyle={G.style}
          defaultPicturesCount={G.picturesCount}
          onStartGame={StartGame}
        />
      </GameLayout>
    ) : (
      <GameLayout gameName={t("game.name")}>
        <GameEndingBoard winners={gameover.winners} players={players} />
      </GameLayout>
    );
  }

  return (
    <div ref={stickyRef}>
      <GameLayout
        gameName={t("game.name")}
        header={
          <div style={{ marginBottom: "14px" }}>
            <Header as="h2" textAlign="center">
              {t(`header.${phase}.${stage}`)}
              <Header.Subheader>{t(`subheader.${phase}.${stage}`)}</Header.Subheader>
            </Header>
            <Sticky context={stickyRef}>
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
                        label={SHORTCUTS[idx]}
                        {...letter}
                      />
                    ))}
                  <Button
                    color="red"
                    onClick={onReturnLetters}
                    disabled={!isCurrentPlayer || playedTilesCount === 0}
                  >
                    <Icon name="undo" />
                    Return letters
                  </Button>
                  <Button
                    color="orange"
                    onClick={() => setSwapTilesModal(true)}
                    disabled={!isCurrentPlayer}
                  >
                    <Icon name="refresh" />
                    Swap tiles
                  </Button>
                  <Button color="yellow" onClick={onSkipTurn} disabled={!isCurrentPlayer}>
                    <Icon name="forward" />
                    Skip turn
                  </Button>
                  <Button
                    color="green"
                    onClick={onPlayTiles}
                    disabled={!isCurrentPlayer || moveErrors.length > 0}
                  >
                    <Icon name="check" />
                    Submit
                  </Button>
                </div>
              </Segment>
            </Sticky>
          </div>
        }
      >
        <Popup
          context={popupHandleRef}
          position="top center"
          open={popupOpen && !selectedBlankTile && !swapTilesModal}
          offset={[0, 5]}
          style={{ opacity: 0.95, border: 0, borderRadius: 10, background: "#f5f5f5" }}
          popper={{
            id: "words-info-popup",
            style: { pointerEvents: "none", transition: "opacity 0.3s" },
          }}
          flowing
          basic
        >
          {moveErrors.length > 0 ? (
            moveErrors.map((error) => {
              return (
                <p key={error}>
                  <Icon color="orange" name="warning sign" /> {t(`game.errors.${error}`)}
                </p>
              );
            })
          ) : (
            <>
              <Icon color="green" name="check circle" /> <strong>{t("game.errors.ok")}</strong>
              {newWords(G.board, playerLetters).map(({ letters, points, wordBonuses }, idx) => {
                return (
                  <div
                    key={idx}
                    style={{
                      textTransform: "uppercase",
                      fontSize: 16,
                      margin: "15px 0",
                      lineHeight: 1,
                      fontWeight: 600,
                    }}
                  >
                    {letters.map((letter, jdx) => (
                      <span key={`${idx}-${jdx}`} style={{ margin: 3, fontSize: 18 }}>
                        {letter}
                      </span>
                    ))}
                    {wordBonuses.map((multiply, jdx) => (
                      <span
                        key={`${idx}-${jdx}`}
                        style={{
                          margin: 5,
                          background: BONUSES.word[multiply],
                          color: "#ffffff",
                          textTransform: "lowercase",
                          padding: "5px 10px",
                          borderRadius: 5,
                        }}
                      >
                        x{multiply}
                      </span>
                    ))}
                    <span
                      style={{
                        margin: 5,
                        background: "#bbbbbb",
                        padding: "5px 10px",
                        color: "#ffffff",
                        borderRadius: 5,
                      }}
                    >
                      {points}
                    </span>
                  </div>
                );
              })}
              {filterPlayedTiles(playerLetters).length === 7 && (
                <div
                  style={{
                    textTransform: "uppercase",
                    fontSize: 16,
                    margin: "15px 0",
                    lineHeight: 1,
                    fontWeight: 600,
                  }}
                >
                  <strong>Special bonus:</strong>
                  <span
                    style={{
                      margin: 5,
                      background: "#16ab39",
                      padding: "5px 10px",
                      color: "#ffffff",
                      borderRadius: 5,
                    }}
                  >
                    +50
                  </span>
                </div>
              )}
            </>
          )}
        </Popup>
        <Grid
          board={G.board}
          clickable={canBeClicked}
          handleFieldClick={clickBoard}
          playerLetters={stage === "wait_for_approval" ? G.pendingTiles : playerLetters}
          selectionEnabled={selectedLetterIdx !== null}
        />
        {G && G.pendingTiles && (
          <Modal
            basic
            dimmer="blurring"
            open={phase === "play" && stage === "approve"}
            onClose={() => {}}
          >
            <Modal.Header>Are those words valid?</Modal.Header>
            <Modal.Content>
              {newWords(G.board, G.pendingTiles).map(({ letters }, idx) => {
                return (
                  <div style={{ display: "flex", flexWrap: "wrap", margin: "20px 0" }} key={idx}>
                    {letters.map((letter, jdx) => (
                      <Tile separate key={jdx} letter={letter} />
                    ))}
                    {console.log(currentLanguage.shorts, letters.join(""))}
                    {letters.length <= 3 &&
                      (currentLanguage.shorts.includes(letters.join("")) ? (
                        <Icon name="check circle" color="green" />
                      ) : (
                        <Icon name="remove circle" color="red" />
                      ))}
                  </div>
                );
              })}
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="red"
                onClick={() => {
                  Approve(false);
                }}
              >
                <Icon name="close" /> Reject
              </Button>
              <Button
                color="green"
                onClick={() => {
                  Approve(true);
                }}
              >
                <Icon name="checkmark" /> Confirm
              </Button>
            </Modal.Actions>
          </Modal>
        )}
        <Modal
          size="tiny"
          open={swapTilesModal}
          onClose={() => {
            setSwapTilesModal(false);
            setSelectedForSwap([]);
          }}
        >
          <Modal.Header>What letters do you want to swap?</Modal.Header>
          <Modal.Content>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {playerLetters &&
                playerLetters.map((letter) => (
                  <Tile
                    separate
                    key={letter.id}
                    onClick={() => onSelectForSwap(letter.id)}
                    raised={selectedForSwap.includes(letter.id)}
                    {...letter}
                  />
                ))}
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="green"
              disabled={selectedForSwap.length === 0}
              onClick={() => {
                SwapTiles(
                  selectedForSwap.map((idx) => playerLetters.find((tile) => tile.id === idx))
                );
                setSwapTilesModal(false);
                setSelectedForSwap([]);
              }}
            >
              <Icon name="checkmark" /> Confirm
            </Button>
          </Modal.Actions>
        </Modal>
        {selectedBlankTile !== null && (
          <Modal
            dimmer="blurring"
            size="tiny"
            open={selectedBlankTile !== null}
            closeOnEscape={false}
            closeOnDimmerClick={false}
          >
            <Modal.Header>What letter do you want to use for this tile?</Modal.Header>
            <Modal.Content>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {currentLanguage.letters.map((letter, idx) => (
                  <div key={idx} style={{ margin: 5 }}>
                    <Tile
                      letter={letter}
                      raised={blankTileReplacement === letter} // check if selected blank letter is this one
                      onClick={() => setBlankTileReplacement(letter)} // mark this letter as blank replacement
                    />
                  </div>
                ))}
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                disabled={!blankTileReplacement}
                onClick={() => {
                  playerLetters[selectedBlankTile].replacement = blankTileReplacement;
                  setPlayerLetters([...playerLetters]);
                  setSelectedBlankTile(null);
                }}
              >
                <Icon name="checkmark" /> Confirm
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </GameLayout>
    </div>
  );
};

export default Board;
