import React, { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

const AccordionInstructionToast: React.FC = () => {
  const { toast } = useToast();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current) {
      const timer = setTimeout(() => {
        toast({
          title: "Explore TypeScript Fundamentals",
          description:
            "Open the accordions above to see different TypeScript assignments and examples.",
          duration: 6000, // 6 seconds
          className:
            "bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-300",
        });
        hasShownToast.current = true;
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return null;
};

export default AccordionInstructionToast;
