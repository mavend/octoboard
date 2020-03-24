import React from "react";
import { Icon, Transition, Header, List, Label, Segment, Feed } from "semantic-ui-react";

const KalamburySidebar = ({
  G: { guesses, points, playersData },
  ctx: { activePlayers },
  playerID,
  handleGuessClick,
  getUserGuesses,
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
          guesses={getUserGuesses(guesses, pid)}
          isWinning={points[pid] === Math.max(...points)}
          isDrawing={activePlayers[pid] === "draw"}
          isCurrentPlayer={pid === playerID}
          handleGuessClick={handleGuessClick}
          {...playersData[pid]}
        />
      ))}
    </Segment.Group>
  </>
);

const PlayerEntry = ({
  name,
  isActive,
  avatar,
  points,
  guesses,
  isDrawing,
  isWinning,
  isCurrentPlayer,
  handleGuessClick,
}) => {
  if (!name) {
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
              {isDrawing ? (
                <Label>
                  <Icon name="pencil" />
                  Drawing...
                </Label>
              ) : (
                <Transition.Group
                  as={List}
                  animation="fade left"
                  duration={200}
                  verticalAlign="middle"
                >
                  {guesses.slice(0, 3).map(({ time, phrase, success }, idx) => (
                    <List.Item key={time} style={{ opacity: (3 - idx) / 3, marginRight: "8px" }}>
                      <Label
                        basic={!success}
                        pointing="left"
                        style={{ maxWidth: "100%", cursor: "pointer" }}
                        onClick={handleGuessClick}
                      >
                        {phrase}
                      </Label>
                    </List.Item>
                  ))}
                </Transition.Group>
              )}
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Segment>
  );
};

export default KalamburySidebar;