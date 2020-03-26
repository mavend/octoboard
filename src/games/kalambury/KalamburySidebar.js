import React from "react";
import { Icon, Transition, Header, List, Label, Segment, Feed } from "semantic-ui-react";

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
  isDrawing,
  canManageGame,
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

  const ActionComponent = (action) => {
    switch (action.action) {
      case "message":
        return <ActionMessage {...{ action }} />;
      case "guess":
        return <ActionGuess {...{ action, handleGuessClick }} />;
      case "change":
        return <ActionChange {...{ action }} />;
      case "forfeit":
        return <ActionForfeit {...{ action }} />;
      case "manage":
        return <ActionManage {...{ action }} />;
      case "draw":
        return <ActionDraw {...{ action }} />;
      case "timeout":
        return <ActionTimeout {...{ action }} />;
      default:
        return null;
    }
  };

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
                    style={{ opacity: (3 - idx) / 3, marginRight: "8px" }}
                  >
                    {ActionComponent(action)}
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

const ActionMessage = ({ action: { text } }) => (
  <Label basic pointing="left" color="blue" style={{ maxWidth: "100%", marginLeft: 0 }}>
    <Icon name="chat" color="blue" />
    {text}
  </Label>
);

const ActionGuess = ({ action: { phrase, success }, handleGuessClick }) => (
  <Label
    basic
    color={success ? "green" : "red"}
    pointing="left"
    style={{ maxWidth: "100%", marginLeft: 0, cursor: "pointer" }}
    onClick={handleGuessClick}
  >
    {success ? (
      <Icon name="check circle" color="green" />
    ) : (
      <Icon name="times circle" color="red" />
    )}

    {phrase}
  </Label>
);

const ActionChange = ({ action: { previous } }) => (
  <Label style={{ maxWidth: "100%" }}>
    <Icon name="exchange" color="yellow" />
    Changed phrase. Old one was "{previous}"
  </Label>
);

const ActionForfeit = ({ action: { previous } }) => (
  <Label style={{ maxWidth: "100%" }}>
    <Icon name="flag" color="red" />
    Gave up. The phrase was "{previous}"
  </Label>
);

const ActionManage = () => (
  <Label style={{ maxWidth: "100%" }}>
    <Icon name="chess king" color="yellow" />
    Can now manage game.
  </Label>
);

const ActionDraw = () => (
  <Label style={{ maxWidth: "100%" }}>
    <Icon name="pencil" />
    Is now drawing...
  </Label>
);

const ActionTimeout = ({ action: { previous } }) => (
  <Label style={{ maxWidth: "100%" }}>
    <Icon name="clock outline" color="red" />
    Ran out of time. Phrase was "{previous}"
  </Label>
);

export default KalamburySidebar;
