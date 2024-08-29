import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { TerminalOutput } from "@/components/ui/terminal";
import { Info } from "lucide-react";

const StringConcatenations = () => {
  const { toast } = useToast();
  const [showPing, setShowPing] = useState(true);
  const [showChatBubble, setShowChatBubble] = useState(false);

  useEffect(() => {
    const pingTimer = setTimeout(() => {
      setShowPing(false);
    }, 10000);

    const chatBubbleTimer = setTimeout(() => {
      setShowChatBubble(true);
    }, 500); // Delay of 0.5 second before showing the chat bubble

    return () => {
      clearTimeout(pingTimer);
      clearTimeout(chatBubbleTimer);
    };
  }, []);

  const code = `
let firstName: string = "Vikki";
let lastName: string = "Klikk";

// Using the + operator
let fullName: string = firstName + " " + lastName;

// Using template literals
let greeting: string = \`Hello, \${firstName} \${lastName}!\`;

// Concatenating with numbers
let age: number = 35;
let introduction: string = \`\${fullName} is \${age} years old.\`;
  `.trim();

  let firstName: string = "Vikki";
  let lastName: string = "Klikk";
  let fullName: string = firstName + " " + lastName;
  let greeting: string = `Hello, ${firstName} ${lastName}!`;
  let age: number = 35;
  let introduction: string = `${fullName} is ${age} years old.`;

  const concatenations = [
    { name: "fullName", operation: () => fullName },
    { name: "greeting", operation: () => greeting },
    { name: "introduction", operation: () => introduction },
  ];

  const showConcatenation = (
    name: string,
    operation: () => string,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const result = operation();
    toast({
      description: (
        <TerminalOutput command={`console.log(${name})`} output={result} />
      ),
      duration: 5000,
      className: "bg-gray-900 border-gray-800 text-white",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Here are some examples of string concatenations in TypeScript:</p>
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
        {concatenations.map(({ name, operation }, index) => (
          <div key={name} className="relative">
            <Button
              size="sm"
              onClick={(e) => showConcatenation(name, operation, e)}
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
              TypeScript provides type checking for string concatenations,
              ensuring that you&#39;re only concatenating compatible types. This
              helps prevent runtime errors and makes your code more robust.
              Template literals offer a more readable and flexible way to create
              complex strings with embedded expressions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StringConcatenations;
