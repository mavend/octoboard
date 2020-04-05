import React, { useState, useEffect } from "react";
import { Item, Button, Pagination, Label, Icon, Responsive } from "semantic-ui-react";
import { useUser, useProfiles } from "contexts/UserContext";
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

  const JoinGameButton = (props) => (
    <Button
      {...props}
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
  );

  const RoomLabels = ({ labelsStyle, detailed }) => (
    <>
      <Label as="span" style={labelsStyle} color={current ? "green" : null}>
        #<Label.Detail>{gameID}</Label.Detail>
      </Label>
      {current && (
        <Label as="span" style={labelsStyle} color="green">
          {t("list.game.your_game")}
        </Label>
      )}
      {setupData && setupData.private ? (
        <Label as="span" style={labelsStyle} color="grey">
          <Icon name="lock" />
          {detailed && <Label.Detail>{t("game.private")}</Label.Detail>}
        </Label>
      ) : (
        <Label as="span" style={labelsStyle}>
          <Icon name="open lock" />
          {detailed && <Label.Detail>{t("game.public")}</Label.Detail>}
        </Label>
      )}
    </>
  );

  const RoomMembers = ({ detailed }) => (
    <>
      {currentPlayers.map((p) => (
        <RoomsPlayerListItem player={p} key={p.id} detailed={detailed} />
      ))}
      {Array(maxPlayers - currentPlayers.length)
        .fill(0)
        .map((_, idx) => (
          <Button key={"dummy" + idx} basic icon compact size="tiny" disabled>
            <Icon name="user outline" color="grey" />
          </Button>
        ))}
    </>
  );

  return (
    <Item>
      <Responsive
        as={Item.Image}
        avatar
        size="tiny"
        src={game.image}
        minWidth={Responsive.onlyComputer.minWidth}
      />
      <Item.Content>
        <Item.Header style={{ display: "block" }}>
          {game.name}
          <Responsive as={"span"} minWidth={Responsive.onlyComputer.minWidth}>
            <RoomLabels detailed labelsStyle={{ marginLeft: "1rem" }} />
            <JoinGameButton floated="right" />
          </Responsive>
          <Responsive as={"span"} maxWidth={Responsive.onlyTablet.maxWidth}>
            <JoinGameButton style={{ marginLeft: "1rem" }} size="small" />
          </Responsive>
        </Item.Header>
        <Responsive as={Item.Description} maxWidth={Responsive.onlyTablet.maxWidth}>
          <RoomLabels />
        </Responsive>
        <Item.Extra>
          <Responsive as={"span"} minWidth={Responsive.onlyComputer.minWidth}>
            <RoomMembers detailed />
          </Responsive>
          <Responsive as={"span"} maxWidth={Responsive.onlyTablet.maxWidth}>
            <RoomMembers />
          </Responsive>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

const RoomsPlayerListItem = ({ player: { name }, detailed }) => {
  const { uid } = useUser();
  const profiles = useProfiles();
  const profile = profiles.get(name);

  return (
    <Button
      icon
      labelPosition={detailed && "left"}
      compact
      size="tiny"
      color={uid === name ? "green" : null}
    >
      <Icon name="user" color={uid === name ? null : "grey"} />
      {detailed && profile.displayName}
    </Button>
  );
};

export default RoomsList;
