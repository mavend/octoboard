import { useEffect } from "react";
import { isEqual } from "lodash";

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(callback, dependencies) {
  useEffect(callback, useDeepCompareMemoize(dependencies));
}
