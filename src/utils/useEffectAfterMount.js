import { useEffect, useRef } from "react";

const useEffectAfterMount = (cb, dependencies) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return cb();
    }
    mounted.current = true;
  }, dependencies);
};

export default useEffectAfterMount;