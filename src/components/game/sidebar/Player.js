import React from "react";
import { Icon, Segment, Feed, Transition, List } from "semantic-ui-react";
import Action from "./Action";
import { useTranslation } from "react-i18next";

const Player = ({
  uid,
  isConnected,
  points,
  actions,
  isWinning,
  isCurrentPlayer,
  handleGuessClick,
  profile,
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

  return (
    <Segment disabled={!isConnected && false}>
      <Feed>
        <Feed.Event>
          <Feed.Label image={photoURL} />
          <Feed.Content>
            <Feed.Date>
              {displayName} {isCurrentPlayer && <span>({t("sidebar.player.current")})</span>}{" "}
              {!isConnected && <span>({t("sidebar.player.disconnected")})</span>}
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
                {actions.slice(0, 3).map((action, idx) => (
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

export default Player;