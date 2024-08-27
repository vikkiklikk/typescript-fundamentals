import React from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const Arithmetic = () => {
  const { toast } = useToast();
  const a = 10;
  const b = 5;

  const code = `
let a: number = 10;
let b: number = 5;

let addition: number = a + b;
let subtraction: number = a - b;
let multiplication: number = a * b;
let division: number = a / b;
let modulus: number = a % b;
  `.trim();

  const performOperation = (
    operation: string,
    result: number,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();
    toast({
      title: "Arithmetic Operation Result",
      description: `${operation}: ${result}`,
      duration: 8000,
    });
  };

  return (
    <div className="flex flex-col gap-6">
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
        <Button
          onClick={(e) => performOperation("Addition", a + b, e)}
          size="sm"
        >
          Addition
        </Button>
        <Button
          onClick={(e) => performOperation("Subtraction", a - b, e)}
          size="sm"
        >
          Subtraction
        </Button>
        <Button
          onClick={(e) => performOperation("Multiplication", a * b, e)}
          size="sm"
        >
          Multiplication
        </Button>
        <Button
          onClick={(e) => performOperation("Division", a / b, e)}
          size="sm"
        >
          Division
        </Button>
        <Button
          onClick={(e) => performOperation("Modulus", a % b, e)}
          size="sm"
        >
          Modulus
        </Button>
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
            TypeScript enhances arithmetic operations by providing type
            checking. This means you can&#39;t accidentally perform operations
            on incompatible types, like adding a number to a string. This type
            safety helps catch errors early in the development process, making
            your code more robust and predictable.
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

export default Arithmetic;
