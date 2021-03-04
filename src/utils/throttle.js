import { throttle } from "lodash";

export function throttleAccumulate(func, wait, accFunc) {
  let accumulatedArgs = null;

  const throttled = throttle((...args) => {
    accumulatedArgs = null;
    func(...args);
  }, wait);

  const resultFunc = (...args) => {
    if (accumulatedArgs == null) {
      accumulatedArgs = args;
    } else {
      accumulatedArgs = accFunc(accumulatedArgs, args);
    }
    throttled(...accumulatedArgs);
  };
  resultFunc.flush = () => throttled.flush();
  return resultFunc;
}

window.throttleAccumulate = throttleAccumulate;
