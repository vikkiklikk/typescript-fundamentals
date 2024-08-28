import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { TerminalOutput } from "@/components/ui/terminal";

const DateOperations = () => {
  const { toast } = useToast();
  const [showPing, setShowPing] = useState(true);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

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
// Get the current date and time
const now: Date = new Date();

// Output the full date and time
console.log(now.toString());

// Get specific parts of the date
console.log(now.getFullYear());    // Year
console.log(now.getMonth() + 1);   // Month (0-11, so add 1)
console.log(now.getDate());        // Day of the month
console.log(now.getHours());       // Hour
console.log(now.getMinutes());     // Minutes
console.log(now.getSeconds());     // Seconds

// Format the date
const formattedDate: string = \`\${now.getFullYear()}-\${String(now.getMonth() + 1).padStart(2, '0')}-\${String(now.getDate()).padStart(2, '0')}\`;
console.log(formattedDate);

// Format the time
const formattedTime: string = \`\${String(now.getHours()).padStart(2, '0')}:\${String(now.getMinutes()).padStart(2, '0')}:\${String(now.getSeconds()).padStart(2, '0')}\`;
console.log(formattedTime);
  `.trim();

  const dateOperations = [
    { name: "Full Date", operation: () => currentDate.toString() },
    { name: "Year", operation: () => currentDate.getFullYear() },
    { name: "Month", operation: () => currentDate.getMonth() + 1 },
    { name: "Day", operation: () => currentDate.getDate() },
    { name: "Hours", operation: () => currentDate.getHours() },
    { name: "Minutes", operation: () => currentDate.getMinutes() },
    { name: "Seconds", operation: () => currentDate.getSeconds() },
    {
      name: "Formatted Date",
      operation: () =>
        `${currentDate.getFullYear()}-${String(
          currentDate.getMonth() + 1
        ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`,
    },
    {
      name: "Formatted Time",
      operation: () =>
        `${String(currentDate.getHours()).padStart(2, "0")}:${String(
          currentDate.getMinutes()
        ).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(
          2,
          "0"
        )}`,
    },
  ];

  const showResult = (
    name: string,
    operation: () => string | number,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const result = operation();
    toast({
      description: (
        <TerminalOutput
          command={`console.log(${name})`}
          output={result.toString()}
        />
      ),
      duration: 5000,
      className: "bg-gray-900 border-gray-800 text-white",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Here&#39;s an example of using the Date object in TypeScript:</p>
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
        {dateOperations.map(({ name, operation }, index) => (
          <div key={name} className="relative">
            <Button size="sm" onClick={(e) => showResult(name, operation, e)}>
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
            <h4 className="text-sm font-semibold mb-2">@vikkiklikk</h4>
            <p className="text-sm">
              In TypeScript, the Date object works the same way as in
              JavaScript, but with added type safety. It provides methods to
              work with dates and times, allowing you to create, manipulate, and
              format dates easily. Remember that months are zero-indexed (0-11),
              so always add 1 when displaying the month. TypeScript&#39;s type
              system helps prevent common mistakes when working with dates, such
              as passing invalid types to Date methods or using non-existent
              properties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateOperations;
