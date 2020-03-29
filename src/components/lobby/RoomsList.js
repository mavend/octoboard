import React, { useState, useEffect } from "react";
import { Item, Button, Pagination, Label, Icon } from "semantic-ui-react";
import { useUser } from "contexts/UserContext";
import { paginate } from "utils/paginate";
import { useTranslation } from "react-i18next";

const RoomsList = ({ rooms, games, onJoinRoom, currentRoom }) => {
  const [pagesCount, setPagesCount] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  const perPage = 6;

  useEffect(() => {
    let filteredRooms = rooms;
    if (currentRoom) {
      filteredRooms = rooms.filter((room) => room.gameID !== currentRoom.gameID);
    }
    setFilteredRooms(filteredRooms);
    setPagesCount(Math.ceil(filteredRooms.length / perPage));
  }, [rooms, currentRoom, setFilteredRooms]);

  const handlePageChange = (e, { activePage }) => {
    setPageNum(activePage);
  };

  return (
    <div>
      <Item.Group divided relaxed="very" size="big">
        {currentRoom && (
          <RoomsListItem
            room={currentRoom}
            game={games.find((g) => g.name === currentRoom.gameName)}
            onJoin={onJoinRoom}
            current
          />
        )}
        {paginate(filteredRooms, perPage, pageNum).map((room) => (
          <RoomsListItem
            key={room.gameID}
            room={room}
            game={games.find((g) => g.name === room.gameName)}
            onJoin={onJoinRoom}
            disabled={!!currentRoom}
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

const RoomsListItem = ({
  room,
  room: { gameID, players, setupData },
  game,
  onJoin,
  current,
  disabled,
}) => {
  const { t } = useTranslation("lobby");
  const user = useUser();

  if (!game) return null;

  const maxPlayers = players.length;
  const currentPlayers = players.filter((p) => p.name);
  const isFull = currentPlayers.length === maxPlayers;
  const canJoin = !disabled && (!isFull || current);

  const handleClick = () => {
    if (canJoin) onJoin(room);
  };

  const buttonLabel = () => {
    if (current) return t("list.game.play");
    if (isFull) return t("list.game.full");
    return t("list.game.join");
  };

  return (
    <Item>
      <Item.Image avatar size="tiny" src={game.image} />
      <Item.Content>
        <Item.Header style={{ display: "block" }}>
          {game.name}{" "}
          <Label as="span" style={{ marginLeft: "1rem" }} color={current ? "green" : null}>
            #<Label.Detail>{gameID}</Label.Detail>
          </Label>
          {current && (
            <Label as="span" style={{ marginLeft: "1rem" }} color="green">
              {t("list.game.your_game")}
            </Label>
          )}
          {setupData && setupData.private ? (
            <Label as="span" style={{ marginLeft: "1rem" }} color="grey">
              <Icon name="lock" />
              <Label.Detail>{t("game.private")}</Label.Detail>
            </Label>
          ) : (
            <Label as="span" style={{ marginLeft: "1rem" }}>
              <Icon name="open lock" />
              <Label.Detail>{t("game.public")}</Label.Detail>
            </Label>
          )}
          <Button
            floated="right"
            content={buttonLabel()}
            color={canJoin ? "green" : "grey"}
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
            <Button
              key={p.id}
              icon
              labelPosition="left"
              compact
              size="tiny"
              color={user.email === p.name ? "green" : null}
            >
              <Icon name="user" color={user.email === p.name ? null : "grey"} />
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
