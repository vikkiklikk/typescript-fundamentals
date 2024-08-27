import React from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Variables = () => {
  const code = `
// Number
let age: number = 25;

// String
let name: string = "John Doe";

// Boolean
let isStudent: boolean = true;

// Array
let hobbies: string[] = ["reading", "coding", "gaming"];

// Object
let person: { name: string, age: number } = { name: "Jane", age: 30 };

// Any
let dynamicValue: any = "This can be anything";

console.log(age, name, isStudent, hobbies, person, dynamicValue);
  `.trim();

  return (
    <div className="flex flex-col gap-6">
      <p>Here&#39;s an example of variable assignments in TypeScript:</p>
      <CodeBlock
        text={code}
        language="typescript"
        showLineNumbers={true}
        theme={atomOneDark}
        customStyle={{
          margin: "0px 0.75rem",
          borderRadius: "5px",
          boxShadow: "1px 3px 3px rgba(0,0,0,0.2)",
        }}
      />
      <div className="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/108062355?v=4&size=64" />
          <AvatarFallback>VB</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@vikkiklikk</h4>
          <p className="text-sm">
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
