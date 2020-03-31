import React from "react";
import { Header, Segment, Icon, Label } from "semantic-ui-react";
import Player from "./sidebar/Player";
import { withTranslation } from "react-i18next";

const Sidebar = ({
  G: { actions, points, playersData, privateRoom },
  ctx: { activePlayers, numPlayers },
  playerID,
  handleGuessClick,
  getUserActions,
  t,
}) => (
  <>
    <Header as="h2" textAlign="center">
      {t("game.players")}
      <Header.Subheader>
        {privateRoom ? (
          <Label style={{ marginLeft: 0 }} as="span" size="small" color="grey">
            <Icon name="lock" />
            <Label.Detail>{t("game.private")}</Label.Detail>
          </Label>
        ) : (
          <Label style={{ marginLeft: 0 }} as="span" size="small">
            <Icon name="open lock" />
            <Label.Detail>{t("game.public")}</Label.Detail>
          </Label>
        )}
      </Header.Subheader>
    </Header>
    <Segment.Group style={{ marginTop: "-5px" }}>
      {Object.keys(playersData).map((pid) => (
        <Player
          key={pid}
          points={points[pid]}
          actions={getUserActions(actions, pid)}
          isWinning={points[pid] === Math.max(...points)}
          isDrawing={activePlayers[pid] === "draw"}
          canManageGame={activePlayers[pid] === "manage"}
          isCurrentPlayer={pid === playerID}
          handleGuessClick={handleGuessClick}
          {...playersData[pid]}
        />
      ))}
      {Array(numPlayers - Object.keys(playersData).length)
        .fill(0)
        .map((_, idx) => (
          <Player key={"dummy" + idx} empty={true} />
        ))}
    </Segment.Group>
  </>
);

export default withTranslation("lobby")(Sidebar);
