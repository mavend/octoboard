import React from "react";
import { func } from "prop-types";
import { Icon, Segment, Feed, List } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { PlayerType } from "config/propTypes";
import Action from "./Action";
import Avatar from "components/user/Avatar";

import "./Player.css";

const propTypes = {
  player: PlayerType,
  handleGuessClick: func,
};

const Player = ({
  player: { uid, isConnected, points, actions, isWinning, isCurrentPlayer, profile },
  handleGuessClick,
}) => {
  const { t } = useTranslation("kalambury");

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
    <Segment disabled={!isConnected} className="smooth-disabled">
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <Avatar uid={uid} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Date>
              {displayName} {isCurrentPlayer && <span>({t("sidebar.player.current")})</span>}{" "}
              <Icon
                name="broken chain"
                className={`smooth-disabled ${isConnected ? "hidden" : ""}`}
                style={{ opacity: isConnected ? 0 : 0.45 }}
              />
            </Feed.Date>
            <Feed.Content>
              <Icon name="trophy" color={isWinning ? "yellow" : "grey"} />
              {t("sidebar.player.points", { points: points })}
            </Feed.Content>
            <Feed.Extra text style={{ maxWidth: "230px", marginLeft: "-50px" }}>
              <ActionsList actions={visibleActions} handleGuessClick={handleGuessClick} />
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Segment>
  );
};

const ActionsList = ({ actions, handleGuessClick }) => (
  <List verticalAlign="middle">
    {actions.map((action, idx) => (
      <List.Item
        key={action.id}
        style={{ opacity: ((3 - idx) * 0.5) / 3 + 0.5, marginRight: "8px" }}
      >
        <Action action={action} handleGuessClick={handleGuessClick} />
      </List.Item>
    ))}
  </List>
);

Player.propTypes = propTypes;

export default React.memo(Player);
