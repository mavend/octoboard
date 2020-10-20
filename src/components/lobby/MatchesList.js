import React, { useState, useEffect } from "react";
import { string, func, bool, arrayOf, shape } from "prop-types";
import { useTranslation } from "react-i18next";
import { Item, Button, Pagination, Label, Icon } from "semantic-ui-react";
import { MatchType, GameType } from "config/propTypes";
import { paginate } from "utils/paginate";
import { useUser, useProfiles } from "contexts/UserContext";
import MatchTypeBadge from "components/game/MatchTypeBadge";
import { Media } from "config/media";

const matchesListPropTypes = {
  matches: arrayOf(MatchType).isRequired,
  games: arrayOf(GameType).isRequired,
  onJoinMatch: func,
  currentMatch: MatchType,
};

const MatchesList = ({ matches, games, onJoinMatch, currentMatch }) => {
  const [pagesCount, setPagesCount] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [filteredMatches, setFilteredMatches] = useState(matches);

  const perPage = 6;

  useEffect(() => {
    let filteredMatches = matches;
    if (currentMatch) {
      filteredMatches = matches.filter((match) => match.matchID !== currentMatch.matchID);
    }
    setFilteredMatches(filteredMatches);
    setPagesCount(Math.ceil(filteredMatches.length / perPage));
  }, [matches, currentMatch, setFilteredMatches]);

  const handlePageChange = (e, { activePage }) => {
    setPageNum(activePage);
  };

  return (
    <div>
      <Item.Group divided relaxed="very" size="big">
        {currentMatch && (
          <MatchesListItem
            match={currentMatch}
            game={games.find((g) => g.name === currentMatch.gameName)}
            onJoin={onJoinMatch}
            current
          />
        )}
        {paginate(filteredMatches, perPage, pageNum).map((match) => (
          <MatchesListItem
            key={match.matchID}
            match={match}
            game={games.find((g) => g.name === match.gameName)}
            onJoin={onJoinMatch}
            disabled={!!currentMatch}
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

const matchesListItemPropTypes = {
  match: MatchType.isRequired,
  game: GameType,
  onJoin: func.isRequired,
  current: bool,
  disabled: bool,
};

const MatchesListItem = React.memo(
  ({ match, match: { matchID, players, setupData }, game, onJoin, current, disabled }) => {
    const { t } = useTranslation("lobby");

    if (!game) return null;

    const maxPlayers = players.length;
    const currentPlayers = players.filter((p) => p.name);
    const isFull = currentPlayers.length === maxPlayers;
    const canJoin = !disabled && (!isFull || current);

    const handleClick = () => {
      if (canJoin) onJoin(match);
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
        color={canJoin ? "orange" : "grey"}
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

    const MatchLabels = ({ labelsStyle, detailed }) => (
      <>
        <Label as="span" style={labelsStyle} color={current ? "orange" : null}>
          #<Label.Detail>{matchID}</Label.Detail>
        </Label>
        {current && (
          <Label as="span" style={labelsStyle} color="orange">
            {t("list.game.your_game")}
          </Label>
        )}
        <MatchTypeBadge
          privateMatch={setupData && setupData.private}
          detailed={detailed}
          style={labelsStyle}
        />
      </>
    );

    const MatchMembers = ({ detailed }) => (
      <>
        {currentPlayers.map((p) => (
          <MatchesPlayerListItem player={p} key={p.id} detailed={detailed} />
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
        <Item.Image as={Media} greaterThanOrEqual="computer" avatar size="tiny" src={game.image} />
        <Item.Content>
          <Item.Header style={{ display: "block" }}>
            {game.name}
            <span as={Media} greaterThanOrEqual="computer">
              <MatchLabels detailed labelsStyle={{ marginLeft: "1rem" }} />
              <JoinGameButton floated="right" />
            </span>
            <span as={Media} lessThan="computer">
              <JoinGameButton style={{ marginLeft: "1rem" }} size="small" />
            </span>
          </Item.Header>
          <Item.Description as={Media} lessThan="computer">
            <MatchLabels />
          </Item.Description>
          <Item.Extra>
            <span as={Media} greaterThanOrEqual="computer">
              <MatchMembers detailed />
            </span>
            <span as={Media} lessThan="computer">
              <MatchMembers />
            </span>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
);

const matchesPlayerListItemPropTypes = {
  player: shape({ name: string.isRequired }),
  detailed: bool,
};

const MatchesPlayerListItem = ({ player: { name }, detailed }) => {
  const user = useUser();
  const profiles = useProfiles();
  const profile = profiles.get(name);

  const uid = user && user.uid;

  return (
    <Button
      icon
      labelPosition={detailed && "left"}
      compact
      size="tiny"
      color={uid === name ? "orange" : null}
    >
      <Icon name="user" color={uid === name ? null : "grey"} />
      {detailed && profile && profile.displayName}
    </Button>
  );
};

MatchesPlayerListItem.propTypes = matchesPlayerListItemPropTypes;
MatchesListItem.propTypes = matchesListItemPropTypes;
MatchesList.propTypes = matchesListPropTypes;

export default MatchesList;
