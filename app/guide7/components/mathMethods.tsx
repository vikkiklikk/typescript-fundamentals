import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { TerminalOutput } from "@/components/ui/terminal";
import { Info } from "lucide-react";

const MathMethods = () => {
  const { toast } = useToast();
  const [showPing, setShowPing] = useState(true);
  const [showChatBubble, setShowChatBubble] = useState(false);

  useEffect(() => {
    const pingTimer = setTimeout(() => {
      setShowPing(false);
    }, 10000);

    const chatBubbleTimer = setTimeout(() => {
      setShowChatBubble(true);
    }, 500); // Delay of 0.5 seconds before showing the chat bubble

    return () => {
      clearTimeout(pingTimer);
      clearTimeout(chatBubbleTimer);
    };
  }, []);

  const code = `
// Math.round(): Rounds a number to the nearest integer
console.log(Math.round(4.7));    // Output: 5
console.log(Math.round(4.4));    // Output: 4

// Math.pow(): Returns the base to the exponent power
console.log(Math.pow(2, 3));     // Output: 8

// Math.sqrt(): Returns the square root of a number
console.log(Math.sqrt(16));      // Output: 4

// Math.random(): Returns a random number between 0 and 1
console.log(Math.random());      // Output: Random number between 0 and 1

// Math.max(): Returns the largest of zero or more numbers
console.log(Math.max(5, 10, 15));// Output: 15

// Math.min(): Returns the smallest of zero or more numbers
console.log(Math.min(5, 10, 15));// Output: 5
  `.trim();

  const mathOperations = [
    { name: "Round", operation: () => Math.round(4.7) },
    { name: "Power", operation: () => Math.pow(2, 3) },
    { name: "Square Root", operation: () => Math.sqrt(16) },
    { name: "Random", operation: () => Math.random() },
    { name: "Max", operation: () => Math.max(5, 10, 15) },
    { name: "Min", operation: () => Math.min(5, 10, 15) },
  ];

  const showResult = (
    name: string,
    operation: () => number,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const result = operation();
    toast({
      description: (
        <TerminalOutput
          command={`console.log(Math.${name.toLowerCase()}(...))`}
          output={result.toString()}
        />
      ),
      duration: 5000,
      className: "bg-gray-900 border-gray-800 text-white",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Here are some examples of Math methods in TypeScript:</p>
      <CodeBlock
        text={code}
        language="typescript"
        showLineNumbers={true}
        theme={atomOneDark}
        customStyle={{
          margin: "0px 0.75rem",
          borderRadius: "5px",
          boxShadow: "1px 4px 4px rgba(0,0,0,0.5)",
        }}
      />
      <div className="flex flex-wrap gap-2 justify-center">
        {mathOperations.map(({ name, operation }, index) => (
          <div key={name} className="relative">
            <Button size="sm" onClick={(e) => showResult(name, operation, e)}>
              {name}
            </Button>
            {index === 0 && showPing && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background dark:bg-foreground opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500 dark:bg-foreground"></span>
              </span>
            )}
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex items-start space-x-4 mt-4">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/108062355?v=4&size=64" />
          <AvatarFallback>VB</AvatarFallback>
        </Avatar>
        <div
          className={`flex flex-col space-y-2 w-3/5 transition-opacity duration-500 ease-in-out ${
            showChatBubble ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow">
            <div className="absolute left-1 top-0.6 -ml-2 w-3 h-4 bg-blue-100 dark:bg-blue-900 rotate-45 transform origin-center"></div>
            <div className="absolute right-1 -top-3 -mr-4">
              <Info />
            </div>
            <h4 className="text-sm font-semibold mb-2">@vikkiklikk</h4>
            <p className="text-sm">
              TypeScript inherits all the Math methods from JavaScript,
              providing type safety and better intellisense. The Math object
              offers a wide range of mathematical operations, from basic
              arithmetic to more complex calculations. These methods are
              particularly useful for numerical computations, random number
              generation, and mathematical transformations in your TypeScript
              applications. Remember that all Math functions return a number
              type in TypeScript, which helps in maintaining type consistency
              throughout your code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathMethods;
