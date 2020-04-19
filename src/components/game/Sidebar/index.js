import React from "react";
import { func, node } from "prop-types";
import { useTranslation } from "react-i18next";
import { Header, Segment } from "semantic-ui-react";
import Player from "./Player";
import { useBoardGame } from "contexts/BoardGameContext";
import LeaveButton from "components/game/LeaveButton";
import RoomTypeBadge from "components/game/RoomTypeBadge";

const propTypes = {
  handleActionClick: func,
  extraPlayerContent: func,
  header: node,
};

const defaultProps = {
  handleActionClick: () => {},
  extraPlayerContent: null,
  header: null,
  noHeader: false,
};

const Sidebar = ({ handleActionClick, header, extraPlayerContent }) => {
  const { players } = useBoardGame();

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
