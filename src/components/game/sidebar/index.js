import React from "react";
import { useTranslation } from "react-i18next";
import { Header, Segment, Icon, Label } from "semantic-ui-react";
import Player from "./Player";
import { useBoardGame } from "contexts/BoardGameContext";
import LeaveButton from "components/game/LeaveButton";

const Sidebar = ({ handleGuessClick }) => {
  const { t } = useTranslation("lobby");
  const {
    G: { privateRoom },
    players,
  } = useBoardGame();

  return (
    <>
      <Header as="h2" textAlign="center">
        {t("game.players")}
        <Header.Subheader>
          {privateRoom ? (
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
      <Segment.Group style={{ marginTop: "-5px" }}>
        {players.map((player) => (
          <Player key={player.id} handleGuessClick={handleGuessClick} {...player} />
        ))}
      </Segment.Group>
      <Segment basic textAlign="center" style={{ marginTop: "-1rem" }}>
        <LeaveButton />
      </Segment>
    </>
  );
};

export default Sidebar;
