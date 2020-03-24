import React from "react";
import { 
  Image,
  List,
  Button,
  Pagination,
  Label,
} from "semantic-ui-react";

const RoomsList = ({ rooms, games, style }) => (
  <div style={style}>
    <List divided relaxed size="big">
      {rooms.map(room => (
        <RoomsListItem room={room} game={games.find(g => g.id === room.gameId)} />
      ))}
    </List>
    <div style={{textAlign: "center"}}>
      <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={10}
      />
    </div>
  </div>
);

const RoomsListItem = ({
  room: {
    roomId,
    description,
    maxPlayers,
    currentPlayers
  },
  game: {
    name: gameName,
    image
  }
}) => {
  const isFull = currentPlayers === maxPlayers;
  
  return (
    <List.Item>
      <Image avatar src={image} />
      <List.Content>
        <List.Header>{gameName}</List.Header>
        <Label>#{roomId}</Label> {description}
      </List.Content>
      <List.Content floated='right'>
        <Button
          content={isFull ? "Full" : "Join"}
          color={isFull ? "grey" : "green"}
          label={{
            basic: true,
            pointing: "right",
            content: `${currentPlayers}/${maxPlayers}`,
            icon: "male",
            color: isFull ? "red" : null,
          }}
          labelPosition='left'
        />
      </List.Content>
    </List.Item>
  );
}

export default RoomsList;