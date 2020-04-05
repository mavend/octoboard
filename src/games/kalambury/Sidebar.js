import React from "react";
import { useTranslation } from "react-i18next";
import { Header, Segment, Icon, Label } from "semantic-ui-react";
import { useProfiles } from "contexts/UserContext";
import Player from "./sidebar/Player";
import { useBoardGame } from "contexts/BoardGameContext";
import filterActions from "utils/user/filterActions";

const Sidebar = ({ handleGuessClick }) => {
  const { t } = useTranslation("lobby");
  const profiles = useProfiles();
  const { G, ctx, playerID, gameMetadata } = useBoardGame();

  return (
    <>
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
      <Segment.Group style={{ marginTop: "-5px" }}>
        {gameMetadata.map(({ id, name: uid }) => (
          <Player
            key={id}
            uid={uid}
            points={G.points[id]}
            actions={filterActions(G.actions, id)}
            isWinning={G.points[id] === Math.max(...G.points)}
            isDrawing={ctx.activePlayers[id] === "draw"}
            canManageGame={ctx.activePlayers[id] === "manage"}
            isCurrentPlayer={id === playerID}
            handleGuessClick={handleGuessClick}
            profile={profiles.get(uid)}
            {...G.playersData[id]}
          />
        ))}
      </Segment.Group>
    </>
  );
};

export default Sidebar;
