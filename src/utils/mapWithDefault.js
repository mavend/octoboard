export default class MapWithDefault extends Map {
  get(key) {
    if (!this.has(key)) return this.default(key);
    return super.get(key);
  }

  constructor(entries, defaultFunction = () => null) {
    super(entries);
    this.default = defaultFunction;
  }
}
