import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Header, Segment } from "semantic-ui-react";
import Player from "./Player";
import { useBoardGame } from "contexts/BoardGameContext";
import LeaveButton from "components/game/LeaveButton";
import MatchTypeBadge from "components/game/MatchTypeBadge";
import { useUser } from "contexts/UserContext";
import { useHistory } from "react-router-dom";
import { leaveGame } from "utils/game/leave";

import styles from "./Sidebar.module.css";

const propTypes = {
  handleActionClick: PropTypes.func,
  extraPlayerContent: PropTypes.func,
  header: PropTypes.node,
  showCurrentPlayer: PropTypes.bool,
};

const defaultProps = {
  handleActionClick: () => {},
  extraPlayerContent: null,
  header: null,
  noHeader: false,
  showCurrentPlayer: true,
};

const Sidebar = ({ handleActionClick, header, extraPlayerContent, showCurrentPlayer }) => {
  const { G, players, playerID, matchID, gameName, credentials } = useBoardGame();
  const user = useUser();
  const history = useHistory();

  const handleLeave = () => {
    leaveGame(gameName, matchID, playerID, user.uid, credentials, history);
  };

  return (
    <>
      {header || <SidebarHeader />}
      <Segment.Group>
        {players.map((player) => (
          <Player
            key={player.id}
            player={player}
            handleActionClick={handleActionClick}
            extraContent={extraPlayerContent}
            maxPoints={G.maxPoints}
            showCurrentPlayer={showCurrentPlayer}
          />
        ))}
      </Segment.Group>
      <Segment basic textAlign="center" className={styles.leaveSegment}>
        <LeaveButton handleLeave={handleLeave} />
      </Segment>
    </>
  );
};

const SidebarHeader = () => {
  const { t } = useTranslation("lobby");
  const { G } = useBoardGame();

  return (
    <Header as="h2" textAlign="center" style={{ marginBottom: "-5px" }}>
      {t("game.players")}
      <MatchTypeBadge privateMatch={G.privateMatch} detailed />
    </Header>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default React.memo(Sidebar);
