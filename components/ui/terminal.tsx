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
        <span className="ml-1 w-2 h-4 bg-white inline-block animate-blink"></span>
      </div>
      <pre className="mt-2 p-2 bg-gray-800 rounded">
        <code>{output}</code>
      </pre>
    </div>
  );
};
