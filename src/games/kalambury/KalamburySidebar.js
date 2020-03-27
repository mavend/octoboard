import React from "react";
import { Icon, Transition, Header, List, Label, Segment, Feed } from "semantic-ui-react";
import SidebarAction from "./SidebarAction";

const KalamburySidebar = ({
  G: { actions, points, playersData },
  ctx: { activePlayers, numPlayers },
  playerID,
  handleGuessClick,
  getUserActions,
}) => (
  <>
    <Header as="h2" textAlign="center">
      Players
    </Header>
    <Segment.Group>
      {Object.keys(playersData).map((pid) => (
        <PlayerEntry
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
          <PlayerEntry key={"dummy" + idx} empty={true} />
        ))}
    </Segment.Group>
  </>
);

const PlayerEntry = ({
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
  if (!name || empty) {
    return (
      <Segment disabled={true}>
        <Feed>
          <Feed.Event>
            <Feed.Label image={"/images/avatar-empty.jpg"} />
            <Feed.Content>
              <Feed.Date>Waiting for player...</Feed.Date>
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
              {name} {isCurrentPlayer && <span>(You)</span>}{" "}
              {!isActive && <span>(Disconnected)</span>}
            </Feed.Date>
            <Feed.Content>
              <Icon name="trophy" color={isWinning ? "yellow" : "grey"} />
              {points}
              <span> Points</span>
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
                    key={action.time}
                    style={{ opacity: ((3 - idx) * 0.5) / 3 + 0.5, marginRight: "8px" }}
                  >
                    <SidebarAction action={action} handleGuessClick={handleGuessClick} />
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

export default KalamburySidebar;
