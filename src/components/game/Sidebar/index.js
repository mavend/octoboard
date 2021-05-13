import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Header, Segment } from "semantic-ui-react";
import Player from "./Player";
import { useBoardGame } from "contexts/BoardGameContext";
import LeaveButton from "components/game/LeaveButton";
import GameRulesButton from "components/game/GameRulesButton";
import { useUser } from "contexts/UserContext";
import { useHistory } from "react-router-dom";
import { leaveGame } from "utils/game/leave";

import styles from "./Sidebar.module.css";
import { ActionsList } from "./ActionsList";

const propTypes = {
  actionsMapper: PropTypes.func,
  extraPlayerContent: PropTypes.func,
  header: PropTypes.node,
  showCurrentPlayer: PropTypes.bool,
};

const defaultProps = {
  actionsMapper: () => {},
  extraPlayerContent: null,
  header: null,
  noHeader: false,
  showCurrentPlayer: true,
};

const Sidebar = ({ actionsMapper, header, extraPlayerContent, showCurrentPlayer }) => {
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
            maxPoints={G.maxPoints}
            showCurrentPlayer={showCurrentPlayer}
          >
            {extraPlayerContent && player.uid && extraPlayerContent(player)}
            <ActionsList actions={player.actions} actionsMapper={actionsMapper} />
          </Player>
        ))}
      </Segment.Group>
      <Segment basic textAlign="center" className={styles.leaveSegment}>
        <GameRulesButton />
      </Segment>
      <Segment basic textAlign="center" className={styles.leaveSegment}>
        <LeaveButton handleLeave={handleLeave} />
      </Segment>
    </>
  );
};

const SidebarHeader = () => {
  const { t } = useTranslation("lobby");

  return (
    <Header as="h2" textAlign="center" style={{ marginBottom: "-5px" }}>
      {t("game.players")}
    </Header>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default React.memo(Sidebar);
