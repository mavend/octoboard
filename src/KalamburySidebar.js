import React from "react";
import {
  Icon,
  Transition,
  Header,
  List,
  Label,
  Segment,
  Feed,
} from "semantic-ui-react";

const KalamburySidebar = ({
  G: { playersData, guesses, points },
  ctx: { activePlayers },
  playerID
}) => (
  <>
    <Header as="h2" textAlign="center">
      Players
    </Header>
    <Segment.Group>
      {Object.keys(playersData).map(pid => (
        <PlayerEntry
          key={pid}
          points={points[pid]}
          guesses={[...guesses].reverse().filter(({playerID}) => playerID === pid)}
          isWinning={points[pid] === Math.max(...points)}
          isDrawing={activePlayers[pid] === "draw"}
          isCurrentPlayer={pid === playerID}
          {...playersData[pid]} />
      ))}
    </Segment.Group>
  </>
);

const PlayerEntry = ({ name, avatar, points, guesses, isDrawing, isWinning, isCurrentPlayer }) => (
  <Segment disabled={isDrawing}>
    <Feed>
      <Feed.Event>
        <Feed.Label image={avatar} />
        <Feed.Content>
          <Feed.Date>
            {name} {isCurrentPlayer && <span>(You)</span>}
          </Feed.Date>
          <Feed.Content>
            <Icon name="star" color={isWinning ? "yellow" : "grey"} />{points}<span> Points</span>
          </Feed.Content>
          <Feed.Extra text>
            {
              isDrawing
                ?
                  <Label>
                    <Icon name="pencil" />
                    Drawing...
                  </Label>
                  :
                  <Transition.Group
                    as={List}
                    animation='fade right'
                    duration={200}
                    verticalAlign='middle'
                  >
                    {
                      guesses.slice(0, 3).map(({time, phrase}, idx) => (
                        <List.Item key={time} style={{opacity: (3-idx)/3}}>
                          <Label basic pointing="left">{phrase}</Label>
                        </List.Item>
                      ))
                    }
                  </Transition.Group>
            }
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  </Segment>
)

export default KalamburySidebar;
