import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button, Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { MatchType, GameType } from "config/propTypes";
import { useUser, useCredentials, useProfiles } from "contexts/UserContext";
import { leaveGame } from "utils/game/leave";
import LeaveButton from "components/game/LeaveButton";

import styles from "./MatchItem.module.css";

const PlayersCounter = ({ count, total }) => (
  <span className={styles.players}>
    {count}/{total}
    <Icon name="male" className={styles.playersIcon} />
  </span>
);

const JoinGameButton = ({ current, isFull, canJoin, ...props }) => {
  const { t } = useTranslation("lobby", "translation");

  const buttonText = () => {
    if (current) return t("list.game.play");
    if (isFull) return t("list.game.full");
    return t("list.game.join");
  };

  const buttonColor = () => {
    if (current) return "green";
    if (isFull) return "grey";
    return "yellow";
  };

  return (
    <Button {...props} className={styles.button} disabled={!canJoin} color={buttonColor()}>
      {buttonText()}
    </Button>
  );
};

const matchItemPropTypes = {
  match: MatchType.isRequired,
  game: GameType,
  onJoin: PropTypes.func.isRequired,
  current: PropTypes.bool,
  disabled: PropTypes.bool,
};

const MatchesItem = React.memo(
  ({
    match,
    match: { matchID, gameName, players, setupData },
    game,
    onJoin,
    current,
    disabled,
  }) => {
    const { t } = useTranslation(["translation", "info"]);
    const history = useHistory();
    const user = useUser();
    const profiles = useProfiles();
    const credentials = useCredentials();
    const [open, setOpen] = useState(false);

    if (!game) return null;

    const gameCredentials = credentials && credentials[matchID];
    const currentPlayers = players.filter((p) => p.name);
    const maxPlayers = players.length;
    const isFull = currentPlayers.length === maxPlayers;
    const isPrivate = setupData && setupData.private;
    const canJoin = !disabled && (!isFull || current);

    const handleJoin = () => {
      if (canJoin) onJoin(match);
    };

    const handleLeave = () => {
      leaveGame(
        gameName,
        matchID,
        currentPlayers.find(({ name }) => name === user.uid).id.toString(),
        user.uid,
        gameCredentials,
        history
      );
    };

    const playerNames = currentPlayers.map(({ name: uid }) => {
      const profile = profiles.get(uid);
      return profile ? profile.displayName : uid;
    });

    return (
      <div className={classNames(styles.matchItem, { [styles.detailsOpen]: open })}>
        <div className={styles.row}>
          <span className={styles.showDetails} onClick={() => setOpen((open) => !open)}>
            {open
              ? `${t("lobby:list.game.less_details")} ▲`
              : `${t("lobby:list.game.more_details")} ▼`}
          </span>

          <img className={styles.image} src={game.image} alt="game icon" />
          <h3 className={styles.gameName}>{game.displayName || game.name}</h3>
          <h4 className={styles.matchName}>#{matchID}</h4>
          {isPrivate && <Icon name="lock" className={styles.private} size="small" />}
          <span className={styles.filler} />

          {current && <span className={styles.yourGame}>Your game</span>}
          <PlayersCounter count={currentPlayers.length} total={maxPlayers} />
          <JoinGameButton
            current={current}
            isFull={isFull}
            canJoin={canJoin}
            onClick={handleJoin}
          />
        </div>
        <div className={styles.details}>
          <table className={styles.detailsTable}>
            <tr>
              <td className={styles.detailsTableLabel}>{t("lobby:list.game.description")}:</td>
              <td>{t(`info:games.${gameName.toLowerCase()}.description.short`)}</td>
            </tr>
            <tr>
              <td className={styles.detailsTableLabel}>{t("lobby:list.game.players")}:</td>
              <td>{playerNames.join(", ")}</td>
              {current && (
                <td className={styles.detailsTableActions}>
                  <LeaveButton
                    handleLeave={handleLeave}
                    icon={false}
                    basic
                    size="tiny"
                    style={{ fontWeight: "bold" }}
                  />
                </td>
              )}
            </tr>
          </table>
        </div>
      </div>
    );
  }
);

MatchesItem.propTypes = matchItemPropTypes;

export default MatchesItem;
