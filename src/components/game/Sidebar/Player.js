import React from "react";
import { func } from "prop-types";
import { Icon, Segment, Feed, List, Label } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { PlayerType } from "config/propTypes";
import Action from "./Action";
import Avatar from "components/user/Avatar";

import styles from "./Player.module.css";

const propTypes = {
  player: PlayerType,
  handleActionClick: func,
  extraContent: func,
};

const defaultProps = {
  player: { id: "" },
};

const Player = ({
  player,
  player: { uid, isConnected, points, actions, isWinning, isYou, isCurrentPlayer, profile },
  handleActionClick,
  maxPoints,
  extraContent,
}) => {
  const { t } = useTranslation("lobby");

  if (!uid) {
    return (
      <Segment disabled={true}>
        <Feed>
          <Feed.Event>
            <Feed.Label image={"/images/avatar-empty.jpg"} />
            <Feed.Content>
              <Feed.Date>{t("sidebar.player.waiting")}</Feed.Date>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Segment>
    );
  }

  const { displayName } = profile;
  const visibleActions = actions.slice(0, 3);

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
              {isCurrentPlayer && <Label content={t("sidebar.player.turn")} color="green" />}
              <Icon
                name="broken chain"
                className={`${styles.smoothDisabled} ${isConnected ? "hidden" : ""}`}
                style={{ opacity: isConnected ? 0 : 0.45 }}
              />
            </Feed.Date>
            <Feed.Content>
              <Icon name="trophy" color={isWinning ? "yellow" : "grey"} />
              {t("sidebar.player.points", {
                points: maxPoints ? `${points} / ${maxPoints}` : points,
              })}
            </Feed.Content>
            <Feed.Extra text className={styles.extra}>
              <ActionsList actions={visibleActions} handleActionClick={handleActionClick} />
            </Feed.Extra>
            {extraContent && (
              <Feed.Extra text className={styles.extra}>
                {extraContent(player)}
              </Feed.Extra>
            )}
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Segment>
  );
};

const ActionsList = ({ actions, handleActionClick }) => (
  <List verticalAlign="middle">
    {actions.map((action, idx) => (
      <List.Item
        key={action.id}
        style={{ opacity: ((3 - idx) * 0.5) / 3 + 0.5, marginRight: "8px" }}
      >
        <Action action={action} handleActionClick={handleActionClick} />
      </List.Item>
    ))}
  </List>
);

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

export default React.memo(Player);
