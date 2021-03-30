import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Popup, Input, Icon } from "semantic-ui-react";

import styles from "./FilterBox.module.scss";
import { GameType } from "config/propTypes";
import { useTranslation } from "react-i18next";

const sameWidthModifier = {
  name: "sameWidth",
  enabled: true,
  fn({ state }) {
    state.styles.popper.width = `${state.rects.reference.width}px`;
    state.styles.popper.top = "10px";
  },
  phase: "beforeWrite",
  requires: ["computeStyles"],
};

const propTypes = {
  games: PropTypes.arrayOf(GameType).isRequired,
  filters: PropTypes.shape({
    query: PropTypes.string,
    games: PropTypes.arrayOf(GameType),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const FilterBox = ({ games, filters, onChange }) => {
  const { t } = useTranslation("lobby");
  const [open, setOpen] = useState(false);
  const searchRef = useRef();

  const selectedGames = filters.games;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleClose = (e) => {
    const searchInput = searchRef?.current?.inputRef?.current;
    if (!searchInput || e.target !== searchInput) {
      setOpen(false);
    }
  };

  const handleSelectAllGames = () => {
    onChange({ ...filters, games: [...games] });
  };

  const handleToggleGame = (game) => {
    let { games } = filters;
    if (selectedGames.includes(game)) {
      if (games.length === 1) {
        handleSelectAllGames();
        return;
      }
      games = games.filter((g) => g !== game);
    } else {
      games = [...games, game];
    }
    onChange({ ...filters, games });
  };

  const handleQueryChange = (_, { value }) => {
    onChange({ ...filters, query: value });
  };

  const input = (
    <form className={styles.filterBox} onSubmit={handleSubmit}>
      <Input
        ref={searchRef}
        placeholder={`${t("filter.search")}...`}
        onFocus={() => setTimeout(() => setOpen(true), 300)}
        value={filters.query}
        onChange={handleQueryChange}
        fluid
      />
      <div className={styles.filterStatus}>
        {selectedGames.length === games.length ? (
          <span className={styles.statusLabel}>{t("filter.all_games")}</span>
        ) : (
          <span className={styles.gamesStatus}>
            {selectedGames.map(({ name, image }) => (
              <img key={name} src={image} />
            ))}
          </span>
        )}
        <Icon name="search" color="grey" style={{ marginLeft: 4 }} />
      </div>
    </form>
  );

  const popupContent = (
    <div style={{ width: "100%", padding: 0 }}>
      <h3 className={styles.filterName}>
        {t("filter.games") + " "}
        {selectedGames.length < games.length && (
          <button className={styles.labelSmall} onClick={handleSelectAllGames}>
            {t("filter.select_all")}
          </button>
        )}
      </h3>
      <div className={styles.filterRow}>
        {games.map((game) => (
          <GameLabel
            key={game.name}
            game={game}
            active={selectedGames.includes(game)}
            onClick={() => handleToggleGame(game)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Popup
      trigger={input}
      content={popupContent}
      on="click"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={handleClose}
      basic
      offset={[0, -10]}
      position="bottom left"
      popperModifiers={[sameWidthModifier]}
      style={{ width: "100%", maxWidth: "none", marginTop: 0 }}
    />
  );
};
FilterBox.propTypes = propTypes;

const GameLabel = ({ game: { name, displayName, image }, ...props }) => (
  <LabelButton {...props}>
    <img src={image} alt={`${name} game icon`} className={styles.labelIcon} />
    {displayName || name}
  </LabelButton>
);
GameLabel.propTypes = {
  game: GameType,
};

const LabelButton = ({ active, children, ...props }) => (
  <button className={clsx(styles.label, { [styles.active]: active })} {...props}>
    {children}
  </button>
);
LabelButton.propTypes = {
  active: PropTypes.bool,
};

export default FilterBox;
