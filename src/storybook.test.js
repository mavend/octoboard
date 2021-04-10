import initStoryshots from "@storybook/addon-storyshots";
import { render } from "utils/test/render";

const reactTestingLibrarySerializer = {
  print: (val, serialize, indent) => serialize(val.container.firstChild),
  // eslint-disable-next-line no-prototype-builtins
  test: (val) => val && val.hasOwnProperty("container"),
};

initStoryshots({
  renderer: render,
  snapshotSerializers: [reactTestingLibrarySerializer],
  storyNameRegex: /^(?!.*?[Dd]ev ?[Oo]nly).*$/,
});
