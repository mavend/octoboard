import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Header, Segment, Card, Button, Icon, Dimmer } from "semantic-ui-react";

import Avatar from "components/user/Avatar";
import { lobbyClient } from "services/LobbyClient";
import DataStore from "services/DataStore";

import { useUser } from "contexts/UserContext";
import { useHistory } from "react-router-dom";
import { routes } from "config/routes";
import { PlayerType } from "config/propTypes";

import { useBoardGame } from "contexts/BoardGameContext";
import Loading from "components/game/Loading";

const propTypes = {
  winners: PropTypes.arrayOf(PropTypes.number).isRequired,
  players: PropTypes.arrayOf(PlayerType).isRequired,
};

const GameEndingBoard = ({ winners, players }) => {
  const { t } = useTranslation(["translation", "lobby"]);
  const { playerID, matchID, gameName, credentials } = useBoardGame();
  const [loading, setLoading] = useState(false);

  const user = useUser();
  const history = useHistory();

  const handleNewMatch = useCallback(() => {
    setLoading(true);
    lobbyClient
      .playAgain(gameName, matchID, { playerID: playerID, credentials: credentials })
      .then(async ({ nextMatchID }) => {
        await lobbyClient.leaveMatch(gameName, matchID, {
          playerID: playerID,
          credentials: credentials,
        });
        await lobbyClient
          .joinMatch(gameName, nextMatchID, { playerID: playerID, playerName: user.uid })
          .then(async ({ playerCredentials }) => {
            await DataStore.addCredentials(user.uid, nextMatchID, playerCredentials);
            history.push(routes.game(gameName, nextMatchID));
          });
      })
      .catch((e) => history.push(routes.lobby(), { error: e.message }));
  }, [credentials, playerID, matchID, gameName, history, user.uid]);

  return (
    <>
      <Header as="h2" textAlign="center">
        {t("game.gameover.header")}
        <Header.Subheader>{t("game.gameover.subheader")}</Header.Subheader>
      </Header>
      <Segment basic textAlign="center">
        <Header>{t("game.gameover.winners")}</Header>
        <Card.Group centered stackable>
          {winners
            .map((pid) => players.find(({ id }) => id === pid))
            .filter((player) => player !== undefined)
            .map((player) => (
              <Card key={player.id}>
                <Avatar uid={player.uid} style={{ padding: 15 }} />
                <Card.Content>
                  <Card.Header>{player.profile.displayName}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="trophy" color="yellow" />
                  {player.points}
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
        <Segment basic>
          <Button content={t("game.gameover.rematch")} color={"green"} onClick={handleNewMatch} />
        </Segment>
      </Segment>
      {loading && (
        <Dimmer active inverted>
          <Loading />
        </Dimmer>
      )}
    </>
  );
};
GameEndingBoard.propTypes = propTypes;

export default React.memo(GameEndingBoard);
