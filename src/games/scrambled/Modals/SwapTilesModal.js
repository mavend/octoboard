import React from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Button, Icon, Modal } from "semantic-ui-react";

import Tile from "../Tile";

const propTypes = {
  t: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  playerTiles: PropTypes.arrayOf(PropTypes.object),
  onSelectForSwap: PropTypes.func,
  selectedForSwap: PropTypes.arrayOf(PropTypes.object),
  onSwap: PropTypes.func,
};

const SwapTilesModal = ({ t, onClose, playerTiles, onSelectForSwap, selectedForSwap, onSwap }) => {
  return (
    <Modal size="tiny" open={true} onClose={onClose}>
      <Modal.Header>{t("game.modals.swap.header")}</Modal.Header>
      <Modal.Content>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {playerTiles.map((tile) => (
            <Tile
              separate
              key={tile.id}
              onClick={() => onSelectForSwap(tile)}
              raised={selectedForSwap.includes(tile)}
              {...tile}
            />
          ))}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onClose}>
          <Icon name="cancel" /> {t("game.modals.swap.cancel")}
        </Button>
        <Button color="green" disabled={selectedForSwap.length === 0} onClick={onSwap}>
          <Icon name="checkmark" /> {t("game.modals.swap.confirm")}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

SwapTilesModal.propTypes = propTypes;
export default withTranslation("scrambled")(SwapTilesModal);
