function paginate(array, perPage, pageNum) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNum - 1) * perPage, pageNum * perPage);
}

export { paginate };
