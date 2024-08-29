import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { TerminalOutput } from "@/components/ui/terminal";
import { Info } from "lucide-react";

const TruthyFalsy = () => {
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
function checkValue(value: any): string {
  if (value) {
    return "The value is truthy";
  } else {
    return "The value is falsy";
  }
}

// Example usage:
console.log(checkValue(true));        // truthy
console.log(checkValue(false));       // falsy
console.log(checkValue(1));           // truthy
console.log(checkValue(0));           // falsy
console.log(checkValue("hello"));     // truthy
console.log(checkValue(""));          // falsy
console.log(checkValue(null));        // falsy
console.log(checkValue(undefined));   // falsy
console.log(checkValue([]));          // truthy
console.log(checkValue({}));          // truthy
  `.trim();

  const examples = [
    { value: true, label: "true" },
    { value: false, label: "false" },
    { value: 1, label: "1" },
    { value: 0, label: "0" },
    { value: "hello", label: '"hello"' },
    { value: "", label: '""' },
    { value: null, label: "null" },
    { value: undefined, label: "undefined" },
    { value: [], label: "[]" },
    { value: {}, label: "{}" },
  ];

  const checkValue = (value: any): string => {
    if (value) {
      return "The value is truthy";
    } else {
      return "The value is falsy";
    }
  };

  const showResult = (value: any, label: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const result = checkValue(value);
    toast({
      description: (
        <TerminalOutput
          command={`console.log(checkValue(${label}))`}
          output={result}
        />
      ),
      duration: 5000,
      className: "bg-gray-900 border-gray-800 text-white",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>
        Here&#39;s an example of using if statements to check for truthy or
        falsy values in TypeScript:
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
        {examples.map(({ value, label }, index) => (
          <div key={label} className="relative">
            <Button size="sm" onClick={(e) => showResult(value, label, e)}>
              Check {label}
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
              In TypeScript, like in JavaScript, values are evaluated for their
              truthiness or falsiness in conditional statements. Truthy values
              are those that evaluate to true in a boolean context, while falsy
              values evaluate to false. This concept is crucial for control flow
              in your programs. TypeScript adds type checking to ensure
              you&#39;re using appropriate types in your conditions, helping
              prevent unintended behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruthyFalsy;
