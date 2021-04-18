import React from "react";
import PropTypes from "prop-types";
import { Icon, Segment, Feed } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { PlayerType } from "config/propTypes";
import Avatar from "components/user/Avatar";

import styles from "./Player.module.css";

const propTypes = {
  player: PlayerType,
  showCurrentPlayer: PropTypes.bool,
  maxPoints: PropTypes.number,
};

const defaultProps = {
  player: { id: "" },
};

const Player = ({
  player: { uid, isConnected, points, isWinning, isYou, isCurrentPlayer, profile },
  maxPoints,
  showCurrentPlayer,
  children,
}) => {
  const { t } = useTranslation("lobby");

  if (!uid) {
    return (
      <Segment disabled={true}>
        <Feed>
          <Feed.Event>
            <Feed.Label>
              <Avatar empty />
            </Feed.Label>
            <Feed.Content>
              <Feed.Date>{t("sidebar.player.waiting")}</Feed.Date>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Segment>
    );
  }

  const { displayName } = profile;

  return (
    <Segment disabled={!isConnected} className={`${styles.player} ${styles.smoothDisabled}`}>
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <Avatar uid={uid} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Date>
              {displayName} {isYou && <span>({t("sidebar.player.you")})</span>}{" "}
              {showCurrentPlayer && isCurrentPlayer && <Icon name="check circle" color="green" />}
              <Icon
                name="broken chain"
                className={`${styles.smoothDisabled} ${isConnected ? "hidden" : ""}`}
                style={{ opacity: isConnected ? 0 : 0.45 }}
              />
            </Feed.Date>
            <Feed.Content>
              <Icon name="trophy" color={isWinning ? "yellow" : "grey"} />
              {points !== undefined &&
                t("sidebar.player.points", {
                  points: maxPoints ? `${points} / ${maxPoints}` : points,
                })}
            </Feed.Content>
            {children && (
              <Feed.Extra text className={styles.extra}>
                {children}
              </Feed.Extra>
            )}
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Segment>
  );
};
Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

export default React.memo(Player);
