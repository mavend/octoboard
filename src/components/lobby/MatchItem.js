import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { MatchType, GameType } from "config/propTypes";
import { useUser, useCredentials, useProfiles } from "contexts/UserContext";
import { leaveGame } from "utils/game/leave";
import LeaveButton from "components/game/LeaveButton";

import styles from "./MatchItem.module.scss";

const PlayersCounter = ({ count, total }) => (
  <span className={styles.players}>
    {count}/{total}
    <Icon name="male" className={styles.playersIcon} />
  </span>
);
PlayersCounter.propTypes = {
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

const JoinGameButton = ({ current, isFull, canJoin, ...props }) => {
  const { t } = useTranslation("lobby");
  const type = current ? "play" : isFull ? "full" : "join";

  const buttonText = {
    play: t("list.game.play"),
    full: t("list.game.full"),
    join: t("list.game.join"),
  };

  const buttonColor = {
    play: "green",
    full: "grey",
    join: "yellow",
  };

  return (
    <Button {...props} className={styles.button} disabled={!canJoin} color={buttonColor[type]}>
      {buttonText[type]}
    </Button>
  );
};
JoinGameButton.propTypes = {
  current: PropTypes.bool,
  isFull: PropTypes.bool,
  canJoin: PropTypes.bool,
};

const MatchDetails = React.memo(({ gameName, playerNames, current, onLeave }) => {
  const { t } = useTranslation(["lobby", "info"]);

  return (
    <div className={styles.details}>
      <table className={styles.detailsTable}>
        <tbody>
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
                  handleLeave={onLeave}
                  icon={false}
                  basic
                  size="tiny"
                  style={{ fontWeight: "bold" }}
                />
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
});
MatchDetails.displayName = "MatchDetails";
MatchDetails.propTypes = {
  gameName: PropTypes.string.isRequired,
  playerNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  current: PropTypes.bool,
  onLeave: PropTypes.func.isRequired,
};

const matchItemPropTypes = {
  match: MatchType.isRequired,
  game: GameType.isRequired,
  current: PropTypes.bool,
  disabled: PropTypes.bool,
  onJoin: PropTypes.func.isRequired,
};

const MatchRow = React.memo(
  ({ game, match: { matchID, setupData, players }, current, disabled, onJoin }) => {
    const { t } = useTranslation("lobby");
    const isPrivate = setupData && setupData.private;
    const maxPlayers = players.length;
    const currentPlayers = players.filter((p) => p.name);
    const isFull = currentPlayers.length === maxPlayers;
    const canJoin = !disabled && (!isFull || current);

    return (
      <div className={styles.row}>
        <img className={styles.image} src={game.image} alt="game icon" />
        <h3 className={styles.gameName}>{game.displayName || game.name}</h3>
        <h4 className={styles.matchName}>{setupData?.name || `#${matchID}`}</h4>
        {isPrivate && <Icon name="lock" className={styles.private} size="small" />}
        <span className={styles.filler} />

        {current && <span className={styles.yourGame}>{t("list.game.your_match")}</span>}
        <PlayersCounter count={currentPlayers.length} total={maxPlayers} />
        <JoinGameButton current={current} isFull={isFull} canJoin={canJoin} onClick={onJoin} />
      </div>
    );
  }
);
MatchRow.displayName = "MatchRow";
MatchRow.propTypes = matchItemPropTypes;

const MatchItem = React.memo(
  ({ match, match: { matchID, gameName, players }, game, onJoin, current, disabled }) => {
    const { t } = useTranslation("lobby");
    const history = useHistory();
    const user = useUser();
    const profiles = useProfiles();
    const credentials = useCredentials();
    const [open, setOpen] = useState(false);

    const handleJoin = useCallback(() => {
      onJoin(match);
    }, [onJoin, match]);

    if (!game) return null;

    const gameCredentials = credentials && credentials[matchID];
    const currentPlayers = players.filter((p) => p.name);

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
      <div className={clsx(styles.matchItem, { [styles.detailsOpen]: open })}>
        <MatchRow
          game={game}
          match={match}
          current={current}
          disabled={disabled}
          onJoin={handleJoin}
        />
        <span className={styles.showDetails} onClick={() => setOpen((open) => !open)}>
          {open ? `${t("list.game.less_details")} ▲` : `${t("list.game.more_details")} ▼`}
        </span>
        <MatchDetails
          playerNames={playerNames}
          current={current}
          gameName={gameName}
          onLeave={handleLeave}
        />
      </div>
    );
  }
);
MatchItem.displayName = "MatchItem";
MatchItem.propTypes = matchItemPropTypes;

export default MatchItem;
