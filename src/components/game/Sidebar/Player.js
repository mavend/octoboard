import React from "react";
import { func } from "prop-types";
import { Icon, Segment, Feed, Transition, List } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { PlayerType } from "config/propTypes";
import Action from "./Action";

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

  const { displayName, photoURL } = profile;
  const visibleActions = actions.slice(0, 3);

  return (
    <Segment disabled={!isConnected} className="smooth-disabled">
      <Feed>
        <Feed.Event>
          <Feed.Label image={photoURL} />
          <Feed.Content>
            <Feed.Date>
              {displayName} {isCurrentPlayer && <span>({t("sidebar.player.current")})</span>}{" "}
              <Icon
                name="broken chain"
                className="smooth-disabled"
                style={{ opacity: isConnected ? 0 : 0.45 }}
              />
            </Feed.Date>
            <Feed.Content>
              <Icon name="trophy" color={isWinning ? "yellow" : "grey"} />
              {t("sidebar.player.points", { points: points })}
            </Feed.Content>
            <Feed.Extra text style={{ maxWidth: "230px", marginLeft: "-50px" }}>
              <Transition.Group
                as={List}
                animation="fade left"
                duration={200}
                verticalAlign="middle"
              >
                {visibleActions.map((action, idx) => (
                  <List.Item
                    key={action.id}
                    style={{ opacity: ((3 - idx) * 0.5) / 3 + 0.5, marginRight: "8px" }}
                  >
                    <Action action={action} handleGuessClick={handleGuessClick} />
                  </List.Item>
                ))}
              </Transition.Group>
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Segment>
  );
};

Player.propTypes = propTypes;

export default React.memo(Player);
