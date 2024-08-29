import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { CustomToast } from "@/components/ui/custom-toast";
import { TerminalOutput } from "@/components/ui/terminal";
import { Info } from "lucide-react";

const ArithmeticOperations = () => {
  const { toast } = useToast();
  const [showPing, setShowPing] = useState(true);
  const [showChatBubble, setShowChatBubble] = useState(false);

  useEffect(() => {
    const pingTimer = setTimeout(() => {
      setShowPing(false);
    }, 10000);

    const chatBubbleTimer = setTimeout(() => {
      setShowChatBubble(true);
    }, 500); // Delay of 1 second before showing the chat bubble

    return () => {
      clearTimeout(pingTimer);
      clearTimeout(chatBubbleTimer);
    };
  }, []);

  const code = `
let a: number = 10;
let b: number = 5;

let addition: number = a + b;
let subtraction: number = a - b;
let multiplication: number = a * b;
let division: number = a / b;
let modulus: number = a % b;
  `.trim();

  const operations = [
    {
      name: "Addition",
      symbol: "+",
      operation: (a: number, b: number) => a + b,
    },
    {
      name: "Subtraction",
      symbol: "-",
      operation: (a: number, b: number) => a - b,
    },
    {
      name: "Multiplication",
      symbol: "*",
      operation: (a: number, b: number) => a * b,
    },
    {
      name: "Division",
      symbol: "/",
      operation: (a: number, b: number) => a / b,
    },
    {
      name: "Modulus",
      symbol: "%",
      operation: (a: number, b: number) => a % b,
    },
  ];

  const performOperation = (
    name: string,
    symbol: string,
    operation: (a: number, b: number) => number,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const a = 10;
    const b = 5;
    const result = operation(a, b);
    toast({
      description: (
        <TerminalOutput
          command={`console.log(${a} ${symbol} ${b})`}
          output={result.toString()}
        />
      ),
      duration: 5000,
      className: "bg-gray-900 border-gray-800 text-white",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Here are some examples of arithmetic operations in TypeScript:</p>
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
        {operations.map(({ name, symbol, operation }, index) => (
          <div key={name} className="relative">
            <Button
              size="sm"
              onClick={(e) => performOperation(name, symbol, operation, e)}
            >
              Show {name}
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
              TypeScript enhances arithmetic operations by providing type
              checking. This means you can&#39;t accidentally perform operations
              on incompatible types, like adding a number to a string. This type
              safety helps catch errors early in the development process, making
              your code more robust and predictable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArithmeticOperations;
