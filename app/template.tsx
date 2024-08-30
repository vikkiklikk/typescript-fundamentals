"use client";

import { motion } from "framer-motion";
import { useStaggeredFadeIn } from "@/app/hooks/useStaggeredFadeIn";

export default function Template({ children }: { children: React.ReactNode }) {
  const scope = useStaggeredFadeIn();

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.25 }}
      className="overflow-hidden hide-scrollbar"
    >
      {children}
    </motion.div>
  );
}
