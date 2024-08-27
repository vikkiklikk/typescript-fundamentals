import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const Variables = () => {
  const { toast } = useToast();
  const [showPing, setShowPing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPing(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const code = `
// Number
let age: number = 35;

// String
let name: string = "Viktor Birgisson";

// Boolean
let isStudent: boolean = true;

// Array
let hobbies: string[] = ["football", "coding", "dota2"];

// Object
let person: { name: string, age: number } = { name: "Vikki Klikk", age: 35 };

// Any
let dynamicValue: any = "This can be anything";
  `.trim();

  const variables = {
    age: 35,
    name: "Viktor Birgisson",
    isStudent: true,
    hobbies: ["football", "coding", "dota2"],
    person: { name: "Vikki Klikk", age: 35 },
    dynamicValue: "This can be anything",
  };

  const showVariable = (name: string, value: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toast({
      title: `Variable: ${name}`,
      description: `Value: ${JSON.stringify(value)}`,
      duration: 8000,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Here&#39;s an example of variable assignments in TypeScript:</p>
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
        {Object.entries(variables).map(([name, value], index) => (
          <div key={name} className="relative">
            <Button size="sm" onClick={(e) => showVariable(name, value, e)}>
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
      <div className="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/108062355?v=4&size=64" />
          <AvatarFallback>VB</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@vikkiklikk</h4>
          <p className="text-sm w-3/5">
            The difference here between normal JavaScript and TypeScript is that
            we declare the type of our variables. In TypeScript, we explicitly
            specify the data type of each variable, which provides several
            benefits: By declaring types, TypeScript can catch type-related
            errors at compile-time, before the code runs. Type annotations serve
            as built-in documentation, making it easier for developers to
            understand what kind of data a variable should hold.
          </p>
          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">
              Viktor Birgisson
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variables;
