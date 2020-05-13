import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Header, Segment } from "semantic-ui-react";
import Player from "./Player";
import { useBoardGame } from "contexts/BoardGameContext";
import LeaveButton from "components/game/LeaveButton";
import RoomTypeBadge from "components/game/RoomTypeBadge";

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
  const { G, players } = useBoardGame();

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
      <Segment basic textAlign="center" style={{ marginTop: "-1rem" }}>
        <LeaveButton />
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
      <RoomTypeBadge privateRoom={G.privateRoom} detailed />
    </Header>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
