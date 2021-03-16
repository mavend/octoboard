import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Item, Pagination } from "semantic-ui-react";
import { MatchType, GameType } from "config/propTypes";
import { paginate } from "utils/paginate";
import MatchItem from "./MatchItem";

const matchesListPropTypes = {
  matches: PropTypes.arrayOf(MatchType).isRequired,
  games: PropTypes.arrayOf(GameType).isRequired,
  onJoinMatch: PropTypes.func,
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
          <MatchItem
            match={currentMatch}
            game={games.find((g) => g.name === currentMatch.gameName)}
            onJoin={onJoinMatch}
            current
          />
        )}
        {paginate(filteredMatches, perPage, pageNum).map((match) => (
          <MatchItem
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

MatchesList.propTypes = matchesListPropTypes;

export default MatchesList;
