import { intersectionBy, groupBy, keys, find, minBy, maxBy, orderBy, reduce, slice } from "lodash";

export function filterPlayedTiles(tiles) {
  return tiles.filter(({ x, y }) => x !== undefined && y !== undefined);
}

function boardStateOn(board, tiles, x, y) {
  const playedTile = find(tiles, (tile) => tile.x === x && tile.y === y);
  let tile = null;
  let bonus = null;
  // Nothing can be placed outside board boundaries
  if (y < 0 || x < 0 || x >= board[0].row.length || y >= board.length)
    return { tile: tile, bonus: bonus };

  if (playedTile) {
    tile = playedTile;
    bonus = board[y].row[x].bonus;
  } else if (board[y].row[x] && (board[y].row[x].letter || board[y].row[x].replacement))
    tile = board[y].row[x];
  return { tile: tile, bonus: bonus };
}

function tilesInRow(board, playedTiles, row) {
  const tiles = [];
  for (let x = 0; x < board[row].row.length; x++) {
    tiles.push(boardStateOn(board, playedTiles, x, row));
  }
  return tiles;
}

function tilesInColumn(board, playedTiles, column) {
  const tiles = [];
  for (let y = 0; y < board.length; y++) {
    tiles.push(boardStateOn(board, playedTiles, column, y));
  }
  return tiles;
}

function continuousWord(tiles, index) {
  const result = [tiles[index]];
  for (let i = index - 1; i >= 0; i--) {
    if (!tiles[i] || !tiles[i].tile) break;
    result.unshift(tiles[i]);
  }
  for (let i = index + 1; i < tiles.length; i++) {
    if (!tiles[i] || !tiles[i].tile) break;
    result.push(tiles[i]);
  }
  return result;
}

function tileScore(tile) {
  let multiply = 1;
  if (tile.bonus && tile.bonus.type === "letter") {
    multiply = tile.bonus.multiply;
  }
  return tile.tile.points * multiply;
}

function playedWordsHash(tiles, index) {
  const wordTiles = continuousWord(tiles, index);
  const wordMultiply = reduce(
    wordTiles,
    (multiply, tile) =>
      tile.bonus && tile.bonus.type === "word" ? multiply * tile.bonus.multiply : multiply,
    1
  );
  if (wordTiles.length > 1) {
    return {
      letters: wordTiles.map(({ tile }) => tile.letter || tile.replacement),
      points: reduce(wordTiles, (sum, tile) => sum + tileScore(tile), 0) * wordMultiply,
      wordBonuses: wordTiles
        .filter(({ bonus }) => bonus && bonus.type === "word")
        .map(({ bonus }) => bonus.multiply),
    };
  }
  return null;
}

export function newWords(board, playedTiles) {
  // This function assumes valid tiles placement (all tiles placed in a single row or column with no gaps between)
  const words = [];

  // Cleanup unused tiles
  playedTiles = filterPlayedTiles(playedTiles);

  const wordInRow = keys(groupBy(playedTiles, "y")).length === 1;
  const wordInColumn = keys(groupBy(playedTiles, "x")).length === 1;

  orderBy(playedTiles, ["y", "x"], ["asc", "asc"]).forEach(({ x, y }, idx) => {
    const rowTiles = tilesInRow(board, playedTiles, y);
    const columnTiles = tilesInColumn(board, playedTiles, x);
    if (idx === 0 || wordInRow) {
      const word = playedWordsHash(columnTiles, y);
      word && words.push(word);
    }
    if (idx === 0 || wordInColumn) {
      const word = playedWordsHash(rowTiles, x);
      word && words.push(word);
    }
  });

  return words;
}

function validateTilesOwnership(errors, ownedTiles, playedTiles) {
  if (intersectionBy(playedTiles, ownedTiles, "id").length !== playedTiles.length)
    errors.push("non_player_tiles");
}

function validateInitialWordPlacement(errors, initialWordPlayed, playedTiles, board) {
  if (
    !initialWordPlayed &&
    (playedTiles.length < 2 || !find(playedTiles, ({ x, y }) => board[y].row[x].start))
  ) {
    if (playedTiles.length < 2) errors.push("initial_word_too_short");
    if (!find(playedTiles, ({ x, y }) => board[y].row[x].start))
      errors.push("initial_word_not_on_start");
  }
}

function validateWordOrientation(errors, playedTiles) {
  const wordInRow = keys(groupBy(playedTiles, "y")).length === 1;
  const wordInColumn = keys(groupBy(playedTiles, "x")).length === 1;
  if (!(wordInRow || wordInColumn)) errors.push("not_a_row_or_column");
}

function validateTilesPlacement(errors, board, playedTiles) {
  if (find(playedTiles, ({ x, y }) => board[y].row[x].letter))
    errors.push("replace_existing_tiles");
}

function validateTilesConnection(errors, initialWordPlayed, board, playedTiles) {
  if (
    initialWordPlayed &&
    !find(playedTiles, ({ x, y }) => {
      return (
        boardStateOn(board, [], x, y - 1).tile ||
        boardStateOn(board, [], x, y + 1).tile ||
        boardStateOn(board, [], x - 1, y).tile ||
        boardStateOn(board, [], x + 1, y).tile
      );
    })
  )
    errors.push("tiles_not_connected");
}

function validateTilesContinuity(errors, board, playedTiles) {
  const check = (coordinate, attr, method) => {
    const rangeStart = minBy(playedTiles, attr)[attr];
    const rangeEnd = maxBy(playedTiles, attr)[attr];
    const tiles = slice(method(board, playedTiles, coordinate), rangeStart, rangeEnd + 1);
    if (find(tiles, (tile) => !tile.tile)) errors.push("word_has_gaps");
  };

  check(playedTiles[0].y, "x", tilesInRow);
  check(playedTiles[0].x, "y", tilesInColumn);
}

function validateBlanksReplacements(errors, playedTiles) {
  if (find(playedTiles, ({ letter, replacement }) => !letter && !replacement))
    errors.push("empty_blank");
}

export function tilesPlacementErrors(G, currentPlayer, playedTiles) {
  const errors = [];

  // Cleanup unused tiles
  playedTiles = filterPlayedTiles(playedTiles);

  // Nothing was played yet
  if (playedTiles.length === 0) return errors;

  // Some tiles don't belong to player (illegal move)
  validateTilesOwnership(errors, G.players[currentPlayer].tiles, playedTiles);

  // Initial word not placed over starting field or too shord
  validateInitialWordPlacement(errors, G.initialWordPlayed, playedTiles, G.board);

  // Tiles placed neither in a single row not in a single column (illegal move)
  validateWordOrientation(errors, playedTiles);

  // Tiles being placed over existing tiles (illegal move)
  validateTilesPlacement(errors, G.board, playedTiles);

  // Tiles not connected to other tiles (illegal move)
  validateTilesConnection(errors, G.initialWordPlayed, G.board, playedTiles);

  // Tiles not creating a continuous word (illegal move)
  validateTilesContinuity(errors, G.board, playedTiles);

  // Blank with no replacement specified (invalid move)
  validateBlanksReplacements(errors, playedTiles);

  return errors;
}

export function canPlaceTile(G, playedTiles, x, y) {
  // Find starting tiles
  if (!G.initialWordPlayed && !playedTiles.find(({ x, y }) => G.board[y].row[x].start)) {
    return G.board[y].row.find((el) => el.start) || G.board.find(({ row }) => row[x].start);
  }

  const wordInRow = keys(groupBy(playedTiles, "y")).length === 1;
  // If a letter is selected it can't be placed on a permanently placed tile
  if (G.board[y].row[x].letter || G.board[y].row[x].replacement) return false;
  switch (playedTiles.length) {
    case 0:
      return true;
    case 1:
      // If there is one letter already placed, new tiles can only be placed in a row or in a column
      return !G.board[y].row[x].letter && (x === playedTiles[0].x || y === playedTiles[0].y);
    default:
      // If more than one letter is already there there is only one way
      return (
        !G.board[y].row[x].letter && (wordInRow ? y === playedTiles[0].y : x === playedTiles[0].x)
      );
  }
}
