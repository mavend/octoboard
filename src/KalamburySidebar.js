import React from "react";
import * as moment from 'moment';
import {
  Header,
  Card,
  Image,
  Icon,
  Feed,
  Divider
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
    {Object.keys(playersData).map(playerID => (
      <PlayerCard
        key={playerID}
        points={points[playerID] }
        isDrawing={activePlayers[playerID] === "draw"}
        {...playersData[playerID]} />
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
        {[...guesses].reverse().map(({playerID, time, phrase, success}) => (
          <React.Fragment key={time}>
            {success ? <Divider /> : null}
            <Feed.Event
              image={playersData[playerID].avatar}
              date={moment(time).format("H:mm:ss")}
              summary={phrase}
              meta={success ? "Success +1 point!" : null}
            />
          </React.Fragment>
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
        circular
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
