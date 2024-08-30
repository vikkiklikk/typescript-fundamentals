"use client";

import { useEffect, useState } from "react";
import { useAnimate, stagger } from "framer-motion";

export const useStaggeredFadeIn = (
  staggerDuration = 0.1,
  initialDelay = 0.1
) => {
  const [scope, animate] = useAnimate();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      animate(
        "div",
        { opacity: [0, 1], x: [20, 0] },
        {
          duration: 0.2,
          delay: stagger(staggerDuration, { startDelay: initialDelay }),
        }
      );
      setHasAnimated(true);
    }
  }, [animate, hasAnimated, staggerDuration, initialDelay]);

  return scope;
};
