import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { TerminalOutput } from "@/components/ui/terminal";

const ObjectOperations = () => {
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
// Create an object
let person: { name: string; age: number } = {
  name: "Viktor",
  age: 35
};

// Add a property
person['job'] = "Developer";

// Remove a property
delete person.age;

// Output a specific property
console.log(person.name);

// Output the entire object
console.log(person);
  `.trim();

  const [person, setPerson] = useState<{ [key: string]: any }>({
    name: "Viktor",
    age: 35,
  });

  const operations = [
    { name: "Show Full Object", operation: () => person },
    { name: "Show Name", operation: () => person.name },
    {
      name: "Add Job",
      operation: () => {
        setPerson((prev) => ({ ...prev, job: "Developer" }));
        return "Property 'job' added";
      },
    },
    {
      name: "Remove Age",
      operation: () => {
        setPerson((prev) => {
          const { age, ...rest } = prev;
          return rest;
        });
        return "Property 'age' removed";
      },
    },
    {
      name: "Reset Object",
      operation: () => {
        setPerson({ name: "Viktor", age: 35 });
        return "Object reset to initial state";
      },
    },
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
        Here&#39;s an example of creating and manipulating objects in
        TypeScript:
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
              TypeScript enhances object handling by allowing you to define
              object shapes with interfaces or type aliases. This provides type
              checking and autocompletion when working with objects. While you
              can still add or remove properties dynamically, TypeScript
              encourages you to declare the structure of your objects upfront,
              leading to more predictable and maintainable code. The compiler
              can catch errors like typos in property names or accessing
              non-existent properties at compile-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectOperations;
