import React, { useState, useEffect } from "react";
import { Image, List, Button, Pagination, Label, Icon } from "semantic-ui-react";
import { paginate } from "../utils/paginate";

const RoomsList = ({ rooms, games, style, onJoinRoom }) => {
  const [pagesCount, setPagesCount] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  const perPage = 6;

  useEffect(() => {
    setPagesCount(Math.ceil(rooms.length / perPage));
  }, [rooms]);

  const handlePageChange = (e, {activePage}) => {
    setPageNum(activePage);
  }

  return (
    <div style={style}>
      <List divided relaxed="very" size="big">
        {paginate(rooms, perPage, pageNum).map((room) => (
          <RoomsListItem
            key={room.gameID}
            room={room}
            game={games.find((g) => g.name === room.gameName)}
            onJoin={onJoinRoom}
          />
        ))}
      </List>
      <div style={{ textAlign: "center" }}>
        <Pagination
          onPageChange={handlePageChange}
          activePage={pageNum}
          boundaryRange={0}
          siblingRange={1}
          totalPages={pagesCount}
        />
      </div>
    </div>
  );
};

const RoomsListItem = ({ room: { gameID, description, players }, game, onJoin }) => {
  if (!game) return null;

  const maxPlayers = players.length;
  const currentPlayers = players.filter((p) => p.name);
  const isFull = currentPlayers.length === maxPlayers;

  const handleClick = () => {
    if (!isFull) {
      const freeSpotId = players.find((p) => !p.name).id;
      onJoin(game.name, gameID, freeSpotId);
    }
  };

  return (
    <List.Item>
      <Image avatar src={game.image} />
      <List.Content>
        <List.Header>{game.name} <Label as="span" style={{ marginLeft: "1rem" }}>#<Label.Detail>{gameID}</Label.Detail></Label></List.Header>
        <List horizontal size="small">{currentPlayers.map((p) => (<List.Item key={p.id}><List.Content><Icon name="user" size="small" color="grey" />{p.name}</List.Content></List.Item>))}</List>
      </List.Content>
      <List.Content floated="right">
        <Button
          content={isFull ? "Full" : "Join"}
          color={isFull ? "grey" : "green"}
          label={{
            basic: true,
            pointing: "right",
            content: `${currentPlayers.length}/${maxPlayers}`,
            icon: "male",
            color: isFull ? "red" : null,
          }}
          labelPosition="left"
          onClick={handleClick}
        />
      </List.Content>
    </List.Item>
  );
};

export default RoomsList;
