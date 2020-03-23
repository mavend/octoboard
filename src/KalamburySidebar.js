import React from "react";
import * as moment from 'moment';
import {
  Header,
  Card,
  Image,
  Icon,
  Feed,
} from "semantic-ui-react";

const KalamburySidebar = ({
  G: { playersData, guesses, points },
  ctx: { activePlayers }
}) => (
  <>
    <Header as='h2' textAlign="center">
      Recent guesses
    </Header>
    <RecentGuesses guesses={guesses} playersData={playersData} />

    <Header as='h2' textAlign="center">
      Players
    </Header>
    {Object.keys(playersData).map(playerId => (
      <PlayerCard
        key={playerId}
        points={points[playerId] }
        isDrawing={activePlayers[playerId] === "draw"}
        {...playersData[playerId]} />
    ))}
  </>
);

const RecentGuesses = ({ guesses, playersData }) => (
  <Card style={{
    height: "300px",
    overflowY: "scroll",
  }}>
    <Card.Content>
      <Feed>
        {[...guesses].reverse().map(({playerId, time, phrase}) => (
          <Feed.Event 
            key={time}
            image={playersData[playerId].avatar}
            date={moment(time).format("H:mm:ss")}
            summary={phrase}
          />
        ))}
      </Feed>
    </Card.Content>
  </Card>
);

const PlayerCard = ({name, avatar, points, isDrawing}) => (
  <Card color={isDrawing ? "orange" : null}>
    <Card.Content>
      <Image
        floated='right'
        size='mini'
        src={avatar}
      />
      <Card.Header>{name}</Card.Header>
      <Card.Meta>Points: {points}</Card.Meta>
      { isDrawing && (
        <Card.Description>
          <Icon name="pencil" /> Drawing...
      </Card.Description>
      )}
    </Card.Content>
  </Card>
)

export default KalamburySidebar;
