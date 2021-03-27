import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Label, Button, Segment, Icon, Sticky } from "semantic-ui-react";

import Tile from "../Tile";

const propTypes = {
  t: PropTypes.func.isRequired,
  stickyRef: PropTypes.object,
  disabled: PropTypes.bool,
  playerTiles: PropTypes.arrayOf(PropTypes.object),
  selectTile: PropTypes.func.isRequired,
  selectedTile: PropTypes.object,
  onReturnTiles: PropTypes.func.isRequired,
  onSwapTiles: PropTypes.func.isRequired,
  onSkipTurn: PropTypes.func.isRequired,
  onPlayTiles: PropTypes.func.isRequired,
  canReturnTiles: PropTypes.bool,
  canPlayTiles: PropTypes.bool,
};

const TilesPanel = ({
  t,
  stickyRef,
  disabled,
  playerTiles,
  selectTile,
  selectedTile,
  onReturnTiles,
  onSwapTiles,
  onSkipTurn,
  onPlayTiles,
  canReturnTiles,
  canPlayTiles,
}) => (
  <Sticky context={stickyRef}>
    <Segment disabled={disabled}>
      <Label as="span" color="green" ribbon>
        <Icon name="star" />
        {t("panel.tiles")}
      </Label>
      <div style={{ display: "flex", paddingTop: 10 }}>
        {playerTiles &&
          playerTiles.map((tile) => (
            <Tile
              separate
              key={tile.id}
              onClick={() => selectTile(tile)}
              raised={selectedTile === tile}
              disabled={tile.x !== undefined && tile.y !== undefined}
              {...tile}
            />
          ))}
        <Button color="red" onClick={onReturnTiles} disabled={disabled || !canReturnTiles}>
          <Icon name="undo" />
          {t("panel.actions.return")}
        </Button>
        <Button color="orange" onClick={onSwapTiles} disabled={disabled}>
          <Icon name="refresh" />
          {t("panel.actions.swap")}
        </Button>
        <Button color="yellow" onClick={onSkipTurn} disabled={disabled}>
          <Icon name="forward" />
          {t("panel.actions.skip")}
        </Button>
        <Button color="green" onClick={onPlayTiles} disabled={disabled || !canPlayTiles}>
          <Icon name="check" />
          {t("panel.actions.play")}
        </Button>
      </div>
    </Segment>
  </Sticky>
);

TilesPanel.propTypes = propTypes;
export default withTranslation("scrambled")(TilesPanel);
