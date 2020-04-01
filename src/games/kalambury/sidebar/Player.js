import React, { useContext } from "react";
import { Icon, Segment, Feed, Transition, List } from "semantic-ui-react";
import Action from "./Action";
import { useTranslation } from "react-i18next";
import { UserContext } from "contexts/UserContext";
import { useQuery } from "react-query";

const Player = ({
  name,
  isActive,
  empty,
  avatar,
  points,
  actions,
  isWinning,
  isCurrentPlayer,
  handleGuessClick,
}) => {
  const { t } = useTranslation("kalambury");
  const { getNickName } = useContext(UserContext);
  const { data: nickname } = useQuery(["user-nickname", name], (key, id) => getNickName(id));
  if (!name || empty) {
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

  return (
    <Segment disabled={!isActive}>
      <Feed>
        <Feed.Event>
          <Feed.Label image={avatar || "/images/avatar-empty.jpg"} />
          <Feed.Content>
            <Feed.Date>
              {nickname} {isCurrentPlayer && <span>({t("sidebar.player.current")})</span>}{" "}
              {!isActive && <span>({t("sidebar.player.disconnected")})</span>}
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
