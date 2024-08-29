import React from "react";

interface TerminalOutputProps {
  command: string;
  output: string;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({
  command,
  output,
}) => {
  return (
    <div className="font-mono text-sm">
      <div className="flex items-center">
        <span className="text-green-400 mr-2">$</span>
        <span>{command}</span>
        <span className="ml-1 w-2 h-4 dark:bg-white bg-black inline-block animate-blink"></span>
      </div>
      <pre className="mt-2 p-2 dark:bg-gray-800  bg-gray-100 rounded">
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </pre>
    </div>
  );
};
