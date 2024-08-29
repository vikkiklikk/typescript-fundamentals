import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { TerminalOutput } from "@/components/ui/terminal";
import { Info, Loader } from "lucide-react";

interface Person {
  id: number;
  name: string;
  email: string;
  date_of_birth: string;
  children: number;
  country: string;
  knows_how_to_program: boolean;
}

const LoopOperations = () => {
  const { toast } = useToast();
  const [showPing, setShowPing] = useState(true);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://my.api.mockaroo.com/people.json?key=74a64e00"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPeople(data);
        setIsLoading(false);
        console.log("Fetched data:", data);
      } catch (error) {
        setError("Failed to fetch data");
        setIsLoading(false);
      }
    };

    fetchData();

    const pingTimer = setTimeout(() => {
      setShowPing(false);
    }, 10000);

    const chatBubbleTimer = setTimeout(() => {
      setShowChatBubble(true);
    }, 500);

    return () => {
      clearTimeout(pingTimer);
      clearTimeout(chatBubbleTimer);
    };
  }, []);

  const calculateTotalChildren = (): string => {
    let total = 0;
    for (let i = 0; i < people.length; i++) {
      total += people[i].children;
    }
    return `Total children: ${total}`;
  };

  const formatPersonStrings = (): string => {
    let result: string = "";
    for (let i = 0; i < people.length; i++) {
      result += `${people[i].name}\n`;
    }
    return result;
  };

  const getAllProperties = (): string => {
    let result = "";
    for (let i = 0; i < people.length; i++) {
      const person = people[i];
      for (const key in person) {
        if (Object.prototype.hasOwnProperty.call(person, key)) {
          let value = person[key as keyof Person];
          if (key === "date_of_birth") {
            value = new Date(value as string).toLocaleDateString();
          } else if (key === "knows_how_to_program") {
            value = value ? "Yes" : "No";
          }
          result += `${key}: ${value}\n`;
        }
      }
      result += "---\n";
    }
    return result;
  };

  const operations = [
    {
      name: "Total Children",
      operation: calculateTotalChildren,
    },
    {
      name: "Format Person Strings",
      operation: formatPersonStrings,
    },
    {
      name: "All Properties",
      operation: getAllProperties,
    },
  ];

  const showResult = (
    name: string,
    operation: () => string,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const result = operation();
    toast({
      description: (
        <div className="max-h-[300px] overflow-y-auto">
          <TerminalOutput command={`console.log(${name})`} output={result} />
        </div>
      ),
      duration: 10000,
      className: "bg-gray-900 border-gray-800 text-white w-[400px]",
    });
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center motion-safe:animate-spin">
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const codeExample = `
interface Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  children: number;
  country: string;
  knows_how_to_program: boolean;
}

// Fetch data from API
const response = await fetch('https://my.api.mockaroo.com/people.json?key=74a64e00');
const people: Person[] = await response.json();

// Calculate total children
let totalChildren = 0;
for (let i = 0; i < people.length; i++) {
  totalChildren += people[i].children;
}
console.log(\`Total children: \${totalChildren}\`);

// Format person strings
for (let i = 0; i < people.length; i++) {
  console.log(people[i].name);
}

// Output all properties
for (let i = 0; i < people.length; i++) {
  const person = people[i];
  for (const key in person) {
    if (Object.prototype.hasOwnProperty.call(person, key)) {
      console.log(\`\${key}: \${person[key as keyof Person]}\`);
    }
  }
  console.log('---');
}
  `.trim();

  return (
    <div className="flex flex-col gap-4">
      <p>
        Here&#39;s an example of working with data fetched from an API in
        TypeScript:
      </p>
      <CodeBlock
        text={codeExample}
        language="typescript"
        showLineNumbers={true}
        theme={atomOneDark}
        customStyle={{
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
            <div className="absolute right-1 -top-3 -mr-4">
              <Info />
            </div>
            <h4 className="text-sm font-semibold mb-2">@vikkiklikk</h4>
            <p className="text-sm">
              This example demonstrates how to fetch data from an API and
              process it using TypeScript and for loops. We&#39;ve defined a
              Person interface to ensure type safety when working with the
              fetched data. The code showcases various TypeScript features
              including async/await for API calls and the use of for loops to
              iterate over arrays and object properties. These techniques help
              in writing more robust and efficient code when dealing with
              external data sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoopOperations;
