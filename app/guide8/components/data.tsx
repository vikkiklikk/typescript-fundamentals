import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { TerminalOutput } from "@/components/ui/terminal";

interface Person {
  name: string;
  dateOfBirth: Date;
  children: number;
  country: string;
  knowsHowToProgram: boolean;
}

const peopleData: Person[] = [
  {
    name: "Hailey Matyukon",
    dateOfBirth: new Date("1991-01-17"),
    children: 5,
    country: "France",
    knowsHowToProgram: true,
  },
  {
    name: "Shane Napier",
    dateOfBirth: new Date("1997-10-25"),
    children: 1,
    country: "Netherlands",
    knowsHowToProgram: false,
  },
  {
    name: "Madelina Matschoss",
    dateOfBirth: new Date("2001-12-24"),
    children: 1,
    country: "China",
    knowsHowToProgram: true,
  },
  {
    name: "Ignazio Craydon",
    dateOfBirth: new Date("1980-05-07"),
    children: 3,
    country: "China",
    knowsHowToProgram: false,
  },
  {
    name: "Salem Osmant",
    dateOfBirth: new Date("1992-06-24"),
    children: 1,
    country: "Thailand",
    knowsHowToProgram: true,
  },
];

const PeopleData = () => {
  const { toast } = useToast();
  const [showPing, setShowPing] = useState(true);
  const [showChatBubble, setShowChatBubble] = useState(false);

  useEffect(() => {
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

  const code = `
interface Person {
  name: string;
  dateOfBirth: Date;
  children: number;
  country: string;
  knowsHowToProgram: boolean;
}

const peopleData: Person[] = [
  { name: "Hailey Matyukon", dateOfBirth: new Date("1991-01-17"), children: 5, country: "France", knowsHowToProgram: true },
  { name: "Shane Napier", dateOfBirth: new Date("1997-10-25"), children: 1, country: "Netherlands", knowsHowToProgram: false },
  { name: "Madelina Matschoss", dateOfBirth: new Date("2001-12-24"), children: 1, country: "China", knowsHowToProgram: true },
  { name: "Ignazio Craydon", dateOfBirth: new Date("1980-05-07"), children: 3, country: "China", knowsHowToProgram: false },
  { name: "Salem Osmant", dateOfBirth: new Date("1992-06-24"), children: 1, country: "Thailand", knowsHowToProgram: true },
];

// Is the first person older than the last person?
if (peopleData[0].dateOfBirth < peopleData[peopleData.length - 1].dateOfBirth) {
  console.log("The first person is older than the last person.");
} else {
  console.log("The first person is not older than the last person.");
}

// Does the 2nd person have the same amount of kids as the 3rd?
if (peopleData[1].children === peopleData[2].children) {
  console.log("The 2nd person has the same amount of kids as the 3rd.");
} else {
  console.log("The 2nd person does not have the same amount of kids as the 3rd.");
}

// Check if 1st and 4th persons know how to program
if (peopleData[0].knowsHowToProgram && peopleData[3].knowsHowToProgram) {
  console.log("Yay!");
} else {
  console.log("LMGTFY");
}

// Check 2nd person's nationality
switch (peopleData[1].country) {
  case "Iceland":
    console.log("Hæ");
    break;
  case "Spain":
    console.log("Hola");
    break;
  case "Korea":
    console.log("여보세요");
    break;
  default:
    console.log("Hello");
}

// Check if 2nd person's name is longer than 5 characters
console.log(peopleData[1].name.length > 5 ? "Name is longer than 5 characters" : "Name is 5 characters or shorter");
  `.trim();

  const operations = [
    {
      name: "Age Comparison",
      operation: () =>
        peopleData[0].dateOfBirth <
        peopleData[peopleData.length - 1].dateOfBirth
          ? "First is older than the last person."
          : "First is not older than the last.",
    },
    {
      name: "Children Comparison",
      operation: () =>
        peopleData[1].children === peopleData[2].children
          ? "The 2nd & 3rd have same amount of kids."
          : "The 2nd person does not as much kids.",
    },
    {
      name: "Programming Knowledge",
      operation: () =>
        peopleData[0].knowsHowToProgram && peopleData[3].knowsHowToProgram
          ? "Yay!"
          : "LMGTFY",
    },
    {
      name: "Nationality Greeting",
      operation: () => {
        switch (peopleData[1].country) {
          case "Iceland":
            return "Hæ";
          case "Spain":
            return "Hola";
          case "Korea":
            return "여보세요";
          default:
            return "Hello";
        }
      },
    },
    {
      name: "Name Length",
      operation: () =>
        peopleData[1].name.length > 5
          ? "Name is longer than 5 characters"
          : "Name is 5 characters or shorter",
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
        <TerminalOutput command={`console.log(${name})`} output={result} />
      ),
      duration: 5000,
      className: "bg-gray-900 border-gray-800 text-white",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>
        Here&#39;s an example of working with the People CSV data in TypeScript:
      </p>
      <CodeBlock
        text={code}
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
            <h4 className="text-sm font-semibold mb-2">@vikkiklikk</h4>
            <p className="text-sm">
              This example demonstrates how to work with complex data structures
              in TypeScript. We&#39;ve defined a Person interface to ensure type
              safety when working with our data. The code showcases various
              TypeScript features including interface definitions, array
              operations, conditional statements, switch statements, and ternary
              operators. These techniques help in writing more robust and
              error-free code when dealing with structured data like CSV
              imports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleData;
