import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Header, Confirm, Sticky } from "semantic-ui-react";

import { useBoardGame } from "contexts/BoardGameContext";
import GameLayout from "components/layout/GameLayout";

import Grid from "./Grid";
import TilesPanel from "./TilesPanel";
import InfoPopup from "./InfoPopup";
import { remove, orderBy, pick } from "lodash";
import { availableLaguages } from "../data/tiles";
import { tilesPlacementErrors, newWords, filterPlayedTiles, canPlaceTile } from "../utils";
import ApprovalModal from "../Modals/ApprovalModal";
import SwapTilesModal from "../Modals/SwapTilesModal";
import BlankTileModal from "../Modals/BlankTileModal";

const GameBoard = () => {
  const {
    G,
    ctx: { phase, currentPlayer },
    player: { id, tiles, stage, isCurrentPlayer },
    moves: { PlayTiles, SwapTiles, SkipTurn, Approve },
    chatMessages,
    sendChatMessage,
  } = useBoardGame();

  const { t } = useTranslation("scrambled");
  const [selectedTile, setSelectedTile] = useState(null);
  const [playerTiles, setPlayerTiles] = useState([]);
  const [moveErrors, setMoveErrors] = useState([]);
  const [selectedBlankTile, setSelectedBlankTile] = useState(null);
  const [blankTileReplacement, setBlankTileReplacement] = useState(null);
  const [swapTilesModal, setSwapTilesModal] = useState(false);
  const [skipTurnModal, setSkipTurnModal] = useState(false);
  const [selectedForSwap, setSelectedForSwap] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [previewTiles, setPreviewTiles] = useState(null);
  const popupHandleRef = useRef();
  const stickyRef = useRef();

  const currentLanguage = availableLaguages.find(({ key }) => key === G.language);
  const playedTiles = filterPlayedTiles(playerTiles);
  const canMakeMove = isCurrentPlayer && phase === "play" && stage === "play";
  const canReturnTiles = playedTiles.length > 0;
  const canPlayTiles = playedTiles.length > 0 && moveErrors.length === 0;
  const canSwapTiles = G.tilesLeft >= 7;
  const approvalPhase = phase === "play" && stage === "approve";

  const onReturnTiles = useCallback(() => {
    Object.values(playerTiles).forEach((tile) => {
      delete tile.x;
      delete tile.y;
      delete tile.popupRef;
    });
    setPlayerTiles([...playerTiles]);
    setPopupOpen(false);
  }, [playerTiles]);

  const onPlayTiles = useCallback(() => {
    playerTiles.forEach((tile) => {
      tile.popupRef = undefined;
    });
    setPopupOpen(false);
    PlayTiles({ tiles: playerTiles });
  }, [PlayTiles, playerTiles]);

  const onSkipTurn = useCallback(() => {
    setSkipTurnModal(false);
    playerTiles.forEach((tile) => {
      tile.popupRef = undefined;
    });
    setPopupOpen(false);
    SkipTurn();
  }, [SkipTurn, playerTiles]);

  const onSelectForSwap = useCallback(
    (tile) => {
      selectedForSwap.includes(tile)
        ? remove(selectedForSwap, (el) => el === tile)
        : selectedForSwap.push(tile);
      setSelectedForSwap([...selectedForSwap]);
    },
    [selectedForSwap]
  );

  useEffect(() => {
    if (tiles !== undefined) setPlayerTiles(tiles);
  }, [tiles]);

  useEffect(() => {
    // player.isCurrentPlayer didn't seem to work properly
    if (id !== undefined && id.toString() !== currentPlayer) {
      setMoveErrors(["invalid_player"]);
      return;
    }
    const playedTiles = filterPlayedTiles(playerTiles);
    setMoveErrors(tilesPlacementErrors(G, currentPlayer, playedTiles));
  }, [G, currentPlayer, id, playerTiles]);

  useEffect(() => {
    if (canMakeMove || chatMessages.length <= 0) return;
    const lastMessage = chatMessages[chatMessages.length - 1].payload;

    if (lastMessage.type && lastMessage.type.startsWith("MovePreview")) {
      setPreviewTiles(lastMessage.data.map((el) => ({ preview: true, ...el })));
    }
  }, [canMakeMove, chatMessages]);

  const selectTile = useCallback(
    (tile) => {
      if (!canMakeMove) return;
      if (selectedTile === tile) setSelectedTile(null);
      else setSelectedTile(tile);
    },
    [canMakeMove, selectedTile]
  );

  const canBeClicked = useCallback(
    (x, y) => {
      // Player can't click outside of their turn
      if (!isCurrentPlayer) return false;
      // Player can always click on a temporarily placed tile to remove it
      if (playerTiles.find((tile) => tile.x === x && tile.y === y)) return true;
      if (selectedTile !== null) return canPlaceTile(G, playedTiles, x, y);
      return false;
    },
    [G, isCurrentPlayer, playedTiles, playerTiles, selectedTile]
  );

  const clickBoard = useCallback(
    (x, y) => {
      if (!canBeClicked(x, y)) return;
      setPreviewTiles(null);

      // Remove a tile that's on x,y
      const currentIdx = playerTiles.findIndex((tile) => tile.x === x && tile.y === y);
      if (currentIdx >= 0) {
        delete playerTiles[currentIdx].x;
        delete playerTiles[currentIdx].y;
      }

      // Place new tile on x,y
      if (selectedTile !== null) {
        if (!selectedTile.letter) {
          setSelectedBlankTile(selectedTile);
        }
        selectedTile.x = x;
        selectedTile.y = y;
      }

      setSelectedTile(null);
      // Force re-rendering of placed tiles
      setPlayerTiles([...playerTiles]);

      playerTiles.forEach((tile) => {
        tile.popupRef = undefined;
      });

      const playedTiles = filterPlayedTiles(playerTiles);
      // Select new tile for holding info popup
      if (playedTiles.length > 0)
        orderBy(playedTiles, ["y", "x"], ["asc", "asc"])[0].popupRef = popupHandleRef;
      setPopupOpen(playedTiles.length > 0);

      if (G.preview)
        sendChatMessage({
          type: "MovePreview",
          data: playedTiles.map((el) => pick(el, ["x", "y"])),
        });
    },
    [G.preview, canBeClicked, playerTiles, selectedTile, sendChatMessage]
  );

  const extraPlayerContent = useCallback(
    ({ tilesCount }) => (
      <>
        {t("game.info.tiles.owned")}: {tilesCount}
      </>
    ),
    [t]
  );

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
              <TilesPanel
                disabled={!canMakeMove}
                onSwapTiles={() => setSwapTilesModal(true)}
                onSkipTurn={() => setSkipTurnModal(true)}
                tilesLeft={G.tilesLeft}
                {...{
                  playerTiles,
                  selectTile,
                  selectedTile,
                  onReturnTiles,
                  onPlayTiles,
                  canReturnTiles,
                  canSwapTiles,
                  canPlayTiles,
                }}
              />
            </Sticky>
          </div>
        }
        extraPlayerContent={extraPlayerContent}
      >
        <InfoPopup
          open={popupOpen && !selectedBlankTile && !swapTilesModal}
          errors={moveErrors}
          newWords={newWords(G.board, playerTiles)}
          specialBonus={playedTiles.length === 7}
          {...{ popupHandleRef }}
        />
        <Grid
          board={G.board}
          clickable={canBeClicked}
          handleFieldClick={clickBoard}
          playerTiles={stage === "wait_for_approval" ? G.pendingTiles : previewTiles || playerTiles}
          selectionEnabled={selectedTile !== null}
        />
        {G.pendingTiles && approvalPhase && (
          <ApprovalModal
            newWords={newWords(G.board, G.pendingTiles)}
            onReject={() => Approve(false)}
            onApprove={() => Approve(true)}
          />
        )}
        {swapTilesModal && (
          <SwapTilesModal
            onClose={() => {
              setSelectedForSwap([]);
              setSwapTilesModal(false);
            }}
            onSwap={() => {
              SwapTiles(selectedForSwap);
              setSwapTilesModal(false);
            }}
            {...{ playerTiles, onSelectForSwap, selectedForSwap }}
          />
        )}
        {selectedBlankTile !== null && (
          <BlankTileModal
            letters={currentLanguage.letters}
            onClose={() => {
              selectedBlankTile.replacement = blankTileReplacement;
              setPlayerTiles([...playerTiles]);
              setSelectedBlankTile(null);
            }}
            {...{ setBlankTileReplacement, blankTileReplacement }}
          />
        )}
        <Confirm
          open={skipTurnModal}
          onCancel={() => setSkipTurnModal(false)}
          onConfirm={onSkipTurn}
          cancelButton={t("game.modals.skip.cancel")}
          confirmButton={t("game.modals.skip.confirm")}
          content={t("game.modals.skip.content")}
        />
      </GameLayout>
    </div>
  );
};

export default GameBoard;
