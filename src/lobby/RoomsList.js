import React, { useState, useEffect } from "react";
import { Item, Button, Pagination, Label, Icon } from "semantic-ui-react";
import { paginate } from "../utils/paginate";

const RoomsList = ({ rooms, games, style, onJoinRoom }) => {
  const [pagesCount, setPagesCount] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  const perPage = 6;

  useEffect(() => {
    setPagesCount(Math.ceil(rooms.length / perPage));
  }, [rooms]);

  const handlePageChange = (e, { activePage }) => {
    setPageNum(activePage);
  };

  return (
    <div style={style}>
      <Item.Group divided relaxed="very" size="big">
        {paginate(rooms, perPage, pageNum).map((room) => (
          <RoomsListItem
            key={room.gameID}
            room={room}
            game={games.find((g) => g.name === room.gameName)}
            onJoin={onJoinRoom}
          />
        ))}
      </Item.Group>
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
    <Item>
      <Item.Image avatar size="tiny" src={game.image} />
      <Item.Content>
        <Item.Header style={{ display: "block" }}>
          {game.name}{" "}
          <Label as="span" style={{ marginLeft: "1rem" }}>
            #<Label.Detail>{gameID}</Label.Detail>
          </Label>
          <Button
            floated="right"
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
        </Item.Header>
        <Item.Extra>
          {currentPlayers.map((p) => (
            <Button key={p.id} icon labelPosition="left" compact size="tiny" disabled>
              <Icon name="user" color="grey" />
              {p.name}
            </Button>
          ))}
          {Array(maxPlayers - currentPlayers.length)
            .fill(0)
            .map((_, idx) => (
              <Button key={"dummy" + idx} basic icon compact size="tiny" disabled>
                <Icon name="user outline" color="grey" />
              </Button>
            ))}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default RoomsList;
