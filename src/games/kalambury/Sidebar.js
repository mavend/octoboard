import React from "react";
import { useTranslation } from "react-i18next";
import { Header, Segment, Icon, Label } from "semantic-ui-react";
import Player from "./sidebar/Player";

const Sidebar = ({
  G: { actions, points, playersData, privateRoom },
  ctx: { activePlayers },
  playerID,
  handleGuessClick,
  getUserActions,
  gameMetadata,
}) => {
  const { t } = useTranslation("lobby");

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
        {gameMetadata.map(({ id, name }) => (
          <Player
            key={id}
            uid={name}
            points={points[id]}
            actions={getUserActions(actions, id)}
            isWinning={points[id] === Math.max(...points)}
            isDrawing={activePlayers[id] === "draw"}
            canManageGame={activePlayers[id] === "manage"}
            isCurrentPlayer={id === playerID}
            handleGuessClick={handleGuessClick}
            {...playersData[id]}
          />
        ))}
      </Segment.Group>
    </>
  );
};

export default Sidebar;
