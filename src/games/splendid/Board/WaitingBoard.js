import React from "react";
import PropTypes from "prop-types";
import { Segment, Button, Image, Label, Icon } from "semantic-ui-react";
import GameLayout from "components/layout/GameLayout";

import styles from "./Board.module.css";

const propTypes = {
  canManageGame: PropTypes.bool,
  onStartGame: PropTypes.func.isRequired,
  currentPlayers: PropTypes.number.isRequired,
  totalPlayers: PropTypes.number.isRequired,
};

const WaitingBoard = ({ canManageGame, onStartGame, currentPlayers, totalPlayers }) => (
  <GameLayout gameName={"Splendid"} header={<></>} sidebarHeader={<></>} sidebarSize={5}>
    <Segment basic textAlign="center">
      <Image src="/images/hugo-waiting.png" className={styles.waitImage} />
      <p className={styles.waitInfo}>
        <Label as="span">
          <Icon name="male" /> {currentPlayers}/{totalPlayers}
        </Label>
        <br />
        {currentPlayers < totalPlayers && "Waiting for players..."}
      </p>
      {canManageGame && (
        <Button color="green" onClick={onStartGame} disabled={currentPlayers < totalPlayers}>
          Start game
        </Button>
      )}
    </Segment>
  </GameLayout>
);
WaitingBoard.propTypes = propTypes;

export default WaitingBoard;
