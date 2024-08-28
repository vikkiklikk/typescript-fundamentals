import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { TerminalOutput } from "@/components/ui/terminal";

const ArrayOperations = () => {
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
// Create an array with multiple values
const fruits: string[] = ["Apple", "Banana", "Cherry", "Mango", "Orange"];

// Output one of the items (e.g., the second item)
console.log(fruits[1]); // Output: Banana

// Output the number of items in the array
console.log(fruits.length); // Output: 5

// Accessing an item by index
const randomIndex = Math.floor(Math.random() * fruits.length);
console.log(fruits[randomIndex]);

// Using array methods
console.log(fruits.join(", "));
  `.trim();

  const fruits: string[] = ["Apple", "Banana", "Cherry", "Mango", "Orange"];

  const operations = [
    { name: "Show Full Array", operation: () => fruits },
    { name: "Show Second Item", operation: () => fruits[1] },
    { name: "Show Array Length", operation: () => fruits.length },
    {
      name: "Show Random Item",
      operation: () => fruits[Math.floor(Math.random() * fruits.length)],
    },
    { name: "Join Array", operation: () => fruits.join(", ") },
  ];

  const showResult = (
    name: string,
    operation: () => any,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const result = operation();
    toast({
      description: (
        <TerminalOutput
          command={`console.log(${name})`}
          output={JSON.stringify(result, null, 2)}
        />
      ),
      duration: 5000,
      className: "bg-gray-900 border-gray-800 text-white",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>
        Here&#39;s an example of creating and working with arrays in TypeScript:
      </p>
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
        {operations.map(({ name, operation }, index) => (
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
            <h4 className="text-sm font-semibold mb-2">@vikkiklikk</h4>
            <p className="text-sm">
              TypeScript provides type safety for arrays, allowing you to
              specify the type of elements an array can contain. This helps
              catch errors at compile-time if you try to add an item of the
              wrong type. The length property and index-based access work the
              same as in JavaScript, but with the added benefit of type
              checking. TypeScript also provides better intellisense for array
              methods, making it easier to work with arrays in your code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayOperations;
