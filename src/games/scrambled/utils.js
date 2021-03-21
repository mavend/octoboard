import { intersectionBy, groupBy, keys, find, minBy, maxBy, orderBy, reduce } from "lodash";

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

export function tilesPlacementErrors(G, ctx, playedTiles) {
  const errors = [];

  // Cleanup unused tiles
  playedTiles = filterPlayedTiles(playedTiles);

  // Some tiles don't belong to player (illegal move)
  if (
    intersectionBy(playedTiles, G.players[ctx.currentPlayer].letters, "id").length !==
    playedTiles.length
  )
    errors.push("non_player_tiles");

  // Initial word not placed over starting field or too shord
  if (
    !G.initialWordPlayed &&
    (playedTiles.length < 2 || !find(playedTiles, ({ x, y }) => G.board[y].row[x].start))
  ) {
    if (playedTiles.length < 2) errors.push("initial_word_too_short");
    if (!find(playedTiles, ({ x, y }) => G.board[y].row[x].start))
      errors.push("initial_word_not_on_start");
  }

  // Tiles placed neither in a single row not in a single column (illegal move)
  const wordInRow = keys(groupBy(playedTiles, "y")).length === 1;
  const wordInColumn = keys(groupBy(playedTiles, "x")).length === 1;
  if (!(wordInRow || wordInColumn)) errors.push("not_a_row_or_column");

  // Tiles being placed over existing tiles (illegal move)
  if (find(playedTiles, ({ x, y }) => G.board[y].row[x].letter))
    errors.push("replace_existing_tiles");

  // Tiles not connected to other tiles (illegal move)
  if (
    G.initialWordPlayed &&
    !find(playedTiles, ({ x, y }) => {
      return (
        boardStateOn(G.board, [], x, y - 1).tile ||
        boardStateOn(G.board, [], x, y + 1).tile ||
        boardStateOn(G.board, [], x - 1, y).tile ||
        boardStateOn(G.board, [], x + 1, y).tile
      );
    })
  )
    errors.push("tiles_not_connected");

  // Tiles not creating a continuous word (illegal move)
  if (wordInRow) {
    const y = playedTiles[0].y;
    for (let x = minBy(playedTiles, "x").x; x <= maxBy(playedTiles, "x").x; x++) {
      if (!boardStateOn(G.board, playedTiles, x, y).tile) {
        errors.push("word_has_gaps");
        break;
      }
    }
  }
  if (wordInColumn) {
    const x = playedTiles[0].x;
    for (let y = minBy(playedTiles, "y").y; y <= maxBy(playedTiles, "y").y; y++) {
      if (!boardStateOn(G.board, playedTiles, x, y).tile) {
        errors.push("word_has_gaps");
        break;
      }
    }
  }

  // Blank with no replacement specified (invalid move)
  if (find(playedTiles, ({ letter, replacement }) => !letter && !replacement))
    errors.push("empty_blank");

  return errors;
}
