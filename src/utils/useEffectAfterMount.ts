import { useEffect, useRef } from "react";

const useEffectAfterMount = (
  cb: () => void | (() => void),
  dependencies: React.DependencyList
): void => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return cb();
    }
    mounted.current = true;
  }, dependencies);
};

export default useEffectAfterMount;