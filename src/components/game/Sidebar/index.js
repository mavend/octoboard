import React from "react";
import { func, node } from "prop-types";
import { useTranslation } from "react-i18next";
import { Header, Segment, Icon, Label } from "semantic-ui-react";
import Player from "./Player";
import { useBoardGame } from "contexts/BoardGameContext";
import LeaveButton from "components/game/LeaveButton";

const propTypes = {
  handleActionClick: func,
  header: node,
};

const defaultProps = {
  handleActionClick: () => {},
  header: null,
};

const Sidebar = ({ handleActionClick, header }) => {
  const { players } = useBoardGame();

  return (
    <>
      {header || <SidebarHeader />}
      <Segment.Group style={{ marginTop: "-5px" }}>
        {players.map((player) => (
          <Player key={player.id} player={player} handleActionClick={handleActionClick} />
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
    <Header as="h2" textAlign="center">
      {t("game.players")}
      <Header.Subheader>
        {G.privateRoom ? (
          <Label as="span" size="small" color="grey">
            <Icon name="lock" />
            <Label.Detail>{t("game.private")}</Label.Detail>
          </Label>
        ) : (
          <Label as="span" size="small">
            <Icon name="open lock" />
            <Label.Detail>{t("game.public")}</Label.Detail>
          </Label>
        )}
      </Header.Subheader>
    </Header>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
